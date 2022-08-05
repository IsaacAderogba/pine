import { Plugin } from "@core/prosemirror/state";
import { Extension } from "@extensions/Extension";
import { ExtensionNodes } from "@extensions/ExtensionTypes";

export class DocExtension extends Extension {
  name = ExtensionNodes.doc;

  schemaSpec = { nodes: { doc: { content: "block+", group: "doc" } } };

  plugins: Extension["plugins"] = () => {
    return [new Plugin({ props: { attributes: { class: "pine-doc" } } })];
  };
}
