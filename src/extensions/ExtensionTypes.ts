import { MarkSpec, NodeSpec } from "@core/prosemirror/model";

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

export enum ExtensionContents {
  "block+" = "block+",
  "inline*" = "inline*",
}

export enum ExtensionGroups {
  doc = "doc",
  block = "block",
  inline = "inline",
}

export interface ExtensionSchemaSpec {
  nodes?: { [node: string]: NodeSpec };
  marks?: { [node: string]: MarkSpec };
}
