import { NodeSpec } from "@core/prosemirror/model";
import { Plugin } from "@core/prosemirror/state";
import { Extension } from "@extensions/Extension";
import {
  ExtensionNodes,
  ExtensionGroups,
  ExtensionContents,
} from "@extensions/ExtensionTypes";

export class DocNodeExtension extends Extension {
  name = ExtensionNodes.doc;

  schemaSpec = { nodes: { doc } };

  plugins: Extension["plugins"] = () => {
    return [new Plugin({ props: { attributes: { class: "pine-doc" } } })];
  };
}

const doc: NodeSpec = {
  content: ExtensionContents["block+"],
  group: ExtensionGroups.doc,
};