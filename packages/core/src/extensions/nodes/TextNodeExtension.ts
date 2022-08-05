import { NodeSpecGroups } from "@core/model/nodes";
import { NodeSpec } from "@core/prosemirror/model";
import { Extension } from "@extensions/Extension";
import { ExtensionNodes } from "@extensions/ExtensionTypes";

export type TextNodeExtensionProps = undefined;
export class TextNodeExtension extends Extension<TextNodeExtensionProps> {
  name = ExtensionNodes.text;

  schemaSpec = { nodes: { text } };

  plugins: Extension["plugins"] = () => {
    return [];
  };
}

const text: NodeSpec = {
  inline: true,
  group: NodeSpecGroups.inline,
};

export const textNodeExtension = (
  ...params: ConstructorParameters<typeof TextNodeExtension>
) => new TextNodeExtension(...params);