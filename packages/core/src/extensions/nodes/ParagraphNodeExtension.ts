import { NodeSpecContents, NodeSpecGroups } from "@core/model/nodes";
import { NodeSpec } from "@core/prosemirror/model";
import { Extension } from "@extensions/Extension";
import { ExtensionNodes } from "@extensions/ExtensionTypes";

export type ParagraphNodeExtensionProps = undefined;
export class ParagraphNodeExtension extends Extension<ParagraphNodeExtensionProps> {
  name = ExtensionNodes.paragraph;

  schemaSpec = { nodes: { paragraph } };

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

export const paragraphNodeExtension = (
  ...params: ConstructorParameters<typeof ParagraphNodeExtension>
) => new ParagraphNodeExtension(...params);