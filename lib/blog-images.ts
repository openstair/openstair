export const approvedExternalBlogImageHosts = [
  "upload.wikimedia.org",
] as const;

export type BlogImageSourceKind = "local" | "external";

const approvedExternalBlogImageHostSet = new Set<string>(
  approvedExternalBlogImageHosts,
);

export function getBlogImageSourceKind(value: string): BlogImageSourceKind | undefined {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return "local";
  }

  const parsedUrl = parseAbsoluteUrl(value);

  if (
    parsedUrl &&
    parsedUrl.protocol === "https:" &&
    approvedExternalBlogImageHostSet.has(parsedUrl.hostname)
  ) {
    return "external";
  }

  return undefined;
}

export function getBlogImageValidationDiagnostic(
  value: string,
  fieldName: string,
): string | undefined {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return undefined;
  }

  if (value.startsWith("//")) {
    return `Invalid field: ${fieldName} must be a local public path or an approved absolute HTTPS image URL; protocol-relative URLs are not allowed`;
  }

  const parsedUrl = parseAbsoluteUrl(value);

  if (!parsedUrl) {
    return `Invalid field: ${fieldName} must be a local public path starting with "/" or an approved absolute HTTPS image URL`;
  }

  if (parsedUrl.protocol !== "https:") {
    return `Invalid field: ${fieldName} external URL must use HTTPS`;
  }

  if (!approvedExternalBlogImageHostSet.has(parsedUrl.hostname)) {
    return `Invalid field: ${fieldName} external URL host "${parsedUrl.hostname}" is not approved`;
  }

  return undefined;
}

export function toAbsoluteBlogImageUrl(image: string, baseUrl: string): string {
  return getBlogImageSourceKind(image) === "external"
    ? image
    : new URL(image, baseUrl).toString();
}

function parseAbsoluteUrl(value: string): URL | undefined {
  try {
    const parsedUrl = new URL(value);

    return parsedUrl.origin === "null" ? undefined : parsedUrl;
  } catch {
    return undefined;
  }
}
