import { MarkSpec, NodeSpec } from "prosemirror-model";

export enum ExtensionNodes {
  doc = "doc",
  paragraph = "paragraph",
  text = "text",
}

export enum ExtensionMarks {
  strong = "strong",
  em = "em",
}

export enum ExtensionHooks {
  base = "base",
}

export enum ExtensionConverters {
  markdown = "markdown",
}

export interface ExtensionSchemaSpec {
  nodes?: { [node: string]: NodeSpec };
  marks?: { [node: string]: MarkSpec };
}
