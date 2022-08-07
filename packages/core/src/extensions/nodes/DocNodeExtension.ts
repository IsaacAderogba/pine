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

export interface DocNodeExtensionSpec extends ExtensionSpec {
  className: string;
}

export class DocNodeExtension extends Extension {
  name = ExtensionNodes.doc;
  spec: DocNodeExtensionSpec;

  get schema() {
    const doc: NodeSpec = {
      content: NodeSpecContents["block+"],
      group: NodeSpecGroups.doc,
    };

    return { nodes: { doc } };
  }

  constructor(spec: Partial<DocNodeExtensionSpec> = {}) {
    super();

    this.spec = { className: namespace(this.name), ...spec };
  }

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    return [
      ...super.initPlugins({ schema }),
      new Plugin({ props: { attributes: { class: this.spec.className } } }),
    ];
  };
}

export const docNodeExtension = createExtension(DocNodeExtension);
