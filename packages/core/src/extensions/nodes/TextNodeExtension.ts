import { NodeSpecGroups } from "@core/model/nodes";
import { NodeSpec } from "@core/prosemirror/model";
import { createExtension, Extension, ExtensionSpec } from "@extensions/Extension";
import { ExtensionNodes } from "@extensions/ExtensionTypes";

export interface TextNodeExtensionSpec extends ExtensionSpec {}
export class TextNodeExtension extends Extension {
  name = ExtensionNodes.text;
  schema = { nodes: { text } };

  constructor(public spec: TextNodeExtensionSpec = {}) {
    super();
  }

  plugins: Extension["plugins"] = () => {
    return [];
  };
}

const text: NodeSpec = {
  inline: true,
  group: NodeSpecGroups.inline,
};

export const textNodeExtension = createExtension(TextNodeExtension);
