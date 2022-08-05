import { NodeSpec } from "@core/prosemirror/model";
import { Extension } from "@extensions/Extension";
import { ExtensionGroups, ExtensionNodes } from "@extensions/ExtensionTypes";

export class TextNodeExtension extends Extension {
  name = ExtensionNodes.text;

  schemaSpec = { nodes: { text } };

  plugins: Extension["plugins"] = () => {
    return [];
  };
}

const text: NodeSpec = {
  inline: true,
  group: ExtensionGroups.inline,
};
