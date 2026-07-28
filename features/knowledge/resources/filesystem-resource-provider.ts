import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import {
  assertInsideRoot,
  assertSafeResourceId,
  toPosixPath,
} from "@/features/knowledge/security/path-policy";
import type {
  Resource,
  ResourceProvider,
} from "@/features/knowledge/resources/resource-provider";

export class FilesystemResourceProvider implements ResourceProvider {
  private readonly rootPath: string;

  constructor(rootPath = path.join(process.cwd(), "docs")) {
    this.rootPath = path.resolve(rootPath);
  }

  async listResources(): Promise<Resource[]> {
    const resourceIds = await this.listMarkdownResourceIds(this.rootPath);

    return Promise.all(resourceIds.map((id) => this.readResource(id)));
  }

  async readResource(id: string): Promise<Resource> {
    assertSafeResourceId(id);

    const absolutePath = path.resolve(this.rootPath, id);
    assertInsideRoot(this.rootPath, absolutePath);

    const content = await fs.readFile(absolutePath, "utf8");

    return {
      id,
      absolutePath,
      content,
    };
  }

  private async listMarkdownResourceIds(directoryPath: string): Promise<string[]> {
    assertInsideRoot(this.rootPath, directoryPath);

    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    const nestedResourceIds = await Promise.all(
      entries.map(async (entry) => {
        const absolutePath = path.join(directoryPath, entry.name);

        if (entry.isDirectory()) {
          return this.listMarkdownResourceIds(absolutePath);
        }

        if (!entry.isFile() || !entry.name.endsWith(".md")) {
          return [];
        }

        const relativePath = path.relative(this.rootPath, absolutePath);

        return [toPosixPath(relativePath)];
      }),
    );

    return nestedResourceIds.flat().sort();
  }
}

