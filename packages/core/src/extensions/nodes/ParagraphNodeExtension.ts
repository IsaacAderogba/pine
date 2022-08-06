import { NodeSpecContents, NodeSpecGroups } from "@core/model/nodes";
import { NodeSpec } from "@core/prosemirror/model";
import { createExtension, Extension, ExtensionSpec } from "@extensions/Extension";
import { ExtensionNodes } from "@extensions/ExtensionTypes";

export interface ParagraphNodeExtensionSpec extends ExtensionSpec {}
export class ParagraphNodeExtension extends Extension {
  name = ExtensionNodes.paragraph;
  schema = { nodes: { paragraph } };

  constructor(public spec: ParagraphNodeExtensionSpec = {}) {
    super();
  }

  plugins: Extension["plugins"] = () => {
    return [];
  };
}

const paragraph: NodeSpec = {
  content: NodeSpecContents["inline*"],
  group: NodeSpecGroups.block,
  parseDOM: [{ tag: "p" }],
  toDOM: () => ["p", 0],
};

export const paragraphNodeExtension = createExtension(ParagraphNodeExtension);
