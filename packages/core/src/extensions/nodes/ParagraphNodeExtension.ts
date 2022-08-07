import { NodeSpecContents, NodeSpecGroups } from "@core/model/nodes";
import { NodeSpec } from "@core/prosemirror/model";
import { namespace } from "@core/utils/namespace";
import {
  createExtension,
  Extension,
  ExtensionSpec,
} from "@extensions/Extension";
import { ExtensionNodes } from "@extensions/ExtensionTypes";

export interface ParagraphNodeExtensionSpec extends ExtensionSpec {
  className: string;
}

export class ParagraphNodeExtension extends Extension {
  name = ExtensionNodes.paragraph;
  spec: ParagraphNodeExtensionSpec;

  get schema() {
    const paragraph: NodeSpec = {
      content: NodeSpecContents["inline*"],
      group: NodeSpecGroups.block,
      parseDOM: [{ tag: "p" }],
      toDOM: () => ["p", { class: this.spec.className }, 0],
    };

    return { nodes: { paragraph } };
  }

  constructor(spec: Partial<ParagraphNodeExtensionSpec> = {}) {
    super();

    this.spec = { className: namespace(this.name), ...spec };
  }

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    return super.initPlugins({ schema });
  };
}

export const paragraphNodeExtension = createExtension(ParagraphNodeExtension);
