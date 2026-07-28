export type KnowledgePlugin = {
  id: string;
  name: string;
};

export type PluginRegistry = {
  listPlugins(): Promise<KnowledgePlugin[]>;
};

