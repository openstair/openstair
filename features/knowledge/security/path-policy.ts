import path from "node:path";

const validSlugSegmentPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function toPosixPath(value: string) {
  return value.split(path.sep).join("/");
}

export function assertInsideRoot(rootPath: string, targetPath: string) {
  const relativePath = path.relative(rootPath, targetPath);

  if (
    relativePath === "" ||
    (!relativePath.startsWith("..") && !path.isAbsolute(relativePath))
  ) {
    return;
  }

  throw new Error(`Resource path escapes the configured root: ${targetPath}`);
}

export function assertSafeResourceId(resourceId: string) {
  if (
    resourceId.includes("\0") ||
    resourceId.includes("\\") ||
    resourceId.startsWith("/") ||
    resourceId.split("/").some((segment) => segment === "..")
  ) {
    throw new Error(`Unsafe resource id: ${resourceId}`);
  }
}

export function createSlugFromResourceId(resourceId: string) {
  assertSafeResourceId(resourceId);

  if (!resourceId.endsWith(".md")) {
    throw new Error(`Unsupported resource extension: ${resourceId}`);
  }

  const withoutExtension = resourceId.slice(0, -".md".length);
  const slug = withoutExtension === "index" ? "" : withoutExtension;

  validateSlug(slug);

  return slug;
}

export function validateSlug(slug: string) {
  if (slug === "") {
    return;
  }

  const segments = slug.split("/");
  const invalidSegment = segments.find(
    (segment) => !validSlugSegmentPattern.test(segment),
  );

  if (invalidSegment) {
    throw new Error(
      `Invalid slug segment "${invalidSegment}" in slug "${slug}". Use lowercase letters, numbers, and hyphens.`,
    );
  }
}

