import { MarkSpec, NodeSpec } from "@core/prosemirror/model";

export const ExtensionNodes = {
  doc: "doc",
  paragraph: "paragraph",
  text: "text",
} as const;

export const ExtensionMarks = {
  strong: "strong",
} as const;

export const ExtensionHooks = {
  baseKeys: "baseKeys",
  history: "history",
} as const;

export const ExtensionConverters = {
  dom: "dom",
} as const;

export interface ExtensionSchema {
  nodes?: { [node: string]: NodeSpec };
  marks?: { [node: string]: MarkSpec };
}
