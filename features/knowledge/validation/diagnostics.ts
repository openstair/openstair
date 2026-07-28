export type ValidationDiagnostic = {
  resourceId: string;
  message: string;
};

export class KnowledgeValidationError extends Error {
  constructor(readonly diagnostics: ValidationDiagnostic[]) {
    super(formatDiagnostics(diagnostics));
    this.name = "KnowledgeValidationError";
  }
}

export function formatDiagnostics(diagnostics: ValidationDiagnostic[]) {
  return diagnostics
    .map((diagnostic) => `${diagnostic.resourceId}: ${diagnostic.message}`)
    .join("\n");
}

