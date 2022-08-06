import { NodeSpecContents, NodeSpecGroups } from "@core/model/nodes";
import { NodeSpec } from "@core/prosemirror/model";
import { Plugin } from "@core/prosemirror/state";
import { namespace } from "@core/utils/namespace";
import {
  createExtension,
  Extension,
  ExtensionSpec,
} from "@extensions/Extension";
import { ExtensionNodes } from "@extensions/ExtensionTypes";

export interface DocNodeExtensionSpec extends ExtensionSpec {}
export class DocNodeExtension extends Extension {
  name = ExtensionNodes.doc;

  get schema() {
    const doc: NodeSpec = {
      content: NodeSpecContents["block+"],
      group: NodeSpecGroups.doc,
    };

    return { nodes: { doc } };
  }

  constructor(public spec: DocNodeExtensionSpec = {}) {
    super();
  }

  plugins: Extension["plugins"] = () => {
    return [
      new Plugin({ props: { attributes: { class: namespace(this.name) } } }),
    ];
  };
}

export const docNodeExtension = createExtension(DocNodeExtension);
