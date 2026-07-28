import { documentFormatVersions } from "@/features/knowledge/domain/document";
import type {
  KnowledgeDocument,
  KnowledgeDocumentMetadata,
} from "@/features/knowledge/domain/document";
import type { DocumentFormat } from "@/features/knowledge/formats/document-format";
import type { Resource } from "@/features/knowledge/resources/resource-provider";
import { createSlugFromResourceId } from "@/features/knowledge/security/path-policy";

type FrontmatterResult = {
  metadata: Partial<KnowledgeDocumentMetadata>;
  body: string;
};

const metadataNumberFields = new Set(["order"]);

export class MarkdownV1DocumentFormat implements DocumentFormat {
  readonly id = documentFormatVersions[0];

  parse(resource: Resource): KnowledgeDocument {
    const { metadata, body } = parseFrontmatter(resource.content, resource.id);

    return {
      slug: createSlugFromResourceId(resource.id),
      resourceId: resource.id,
      format: this.id,
      metadata: metadata as KnowledgeDocumentMetadata,
      body,
    };
  }
}

function parseFrontmatter(content: string, resourceId: string): FrontmatterResult {
  const normalizedContent = content.replaceAll("\r\n", "\n");

  if (!normalizedContent.startsWith("---\n")) {
    return {
      metadata: {},
      body: normalizedContent.trim(),
    };
  }

  const endIndex = normalizedContent.indexOf("\n---\n", 4);

  if (endIndex === -1) {
    throw new Error(`Missing closing frontmatter marker in ${resourceId}`);
  }

  const frontmatter = normalizedContent.slice(4, endIndex);
  const body = normalizedContent.slice(endIndex + "\n---\n".length).trim();

  return {
    metadata: parseSimpleYaml(frontmatter),
    body,
  };
}

function parseSimpleYaml(value: string): Partial<KnowledgeDocumentMetadata> {
  return value.split("\n").reduce<Partial<KnowledgeDocumentMetadata>>(
    (metadata, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#")) {
        return metadata;
      }

      const separatorIndex = trimmedLine.indexOf(":");

      if (separatorIndex === -1) {
        throw new Error(`Invalid metadata line: ${line}`);
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
      const cleanValue = unwrapQuotedValue(rawValue);

      return {
        ...metadata,
        [key]: metadataNumberFields.has(key) ? Number(cleanValue) : cleanValue,
      };
    },
    {},
  );
}

function unwrapQuotedValue(value: string) {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

