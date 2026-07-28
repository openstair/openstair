const rawHtmlPattern = /<\/?[a-z][\s\S]*>/i;

export function assertRenderableMarkdown(body: string, resourceId: string) {
  if (rawHtmlPattern.test(body)) {
    throw new Error(
      `${resourceId}: Raw HTML is not supported by Markdown Document Format v1.`,
    );
  }
}

