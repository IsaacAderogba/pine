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
  baseKeys = "baseKeys",
  history = "history",
}

export enum ExtensionConverters {
  markdown = "markdown",
}

export interface ExtensionSchema {
  nodes?: { [node: string]: NodeSpec };
  marks?: { [node: string]: MarkSpec };
}
