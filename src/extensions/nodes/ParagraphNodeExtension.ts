import { NodeSpec } from "@core/prosemirror/model";
import { Extension } from "@extensions/Extension";
import {
  ExtensionContents,
  ExtensionGroups,
  ExtensionNodes,
} from "@extensions/ExtensionTypes";

export class ParagraphNodeExtension extends Extension {
  name = ExtensionNodes.paragraph;

  schemaSpec = { nodes: { paragraph } };

  plugins: Extension["plugins"] = () => {
    return [];
  };
}

const paragraph: NodeSpec = {
  content: ExtensionContents["inline*"],
  group: ExtensionGroups.block,
  parseDOM: [{ tag: "p" }],
  toDOM: () => ["p", 0],
};
