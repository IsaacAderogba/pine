import { NodeSpecContents, NodeSpecGroups } from "@core/model/nodes";
import { NodeSpec } from "@core/prosemirror/model";
import { Plugin } from "@core/prosemirror/state";
import { Extension } from "@extensions/Extension";
import { ExtensionNodes } from "@extensions/ExtensionTypes";

export type DocNodeExtensionProps = undefined;
export class DocNodeExtension extends Extension<DocNodeExtensionProps> {
  name = ExtensionNodes.doc;

  schemaSpec = { nodes: { doc } };

  plugins: Extension["plugins"] = () => {
    return [new Plugin({ props: { attributes: { class: "pine-doc" } } })];
  };
}

const doc: NodeSpec = {
  content: NodeSpecContents["block+"],
  group: NodeSpecGroups.doc,
};

export const docNodeExtension = (
  ...params: ConstructorParameters<typeof DocNodeExtension>
) => new DocNodeExtension(...params);
