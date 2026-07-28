export type Resource = {
  id: string;
  absolutePath: string;
  content: string;
};

export type ResourceProvider = {
  listResources(): Promise<Resource[]>;
  readResource(id: string): Promise<Resource>;
};

