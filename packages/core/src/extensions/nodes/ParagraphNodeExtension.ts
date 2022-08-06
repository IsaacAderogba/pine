import { NodeSpecContents, NodeSpecGroups } from "@core/model/nodes";
import { NodeSpec } from "@core/prosemirror/model";
import { namespace } from "@core/utils/namespace";
import {
  createExtension,
  Extension,
  ExtensionSpec,
} from "@extensions/Extension";
import { ExtensionNodes } from "@extensions/ExtensionTypes";

export interface ParagraphNodeExtensionSpec extends ExtensionSpec {}
export class ParagraphNodeExtension extends Extension {
  name = ExtensionNodes.paragraph;

  get schema() {
    const paragraph: NodeSpec = {
      content: NodeSpecContents["inline*"],
      group: NodeSpecGroups.block,
      parseDOM: [{ tag: "p" }],
      toDOM: () => ["p", { class: namespace(this.name) }, 0],
    };

    return { nodes: { paragraph } };
  }

  constructor(public spec: ParagraphNodeExtensionSpec = {}) {
    super();
  }

  plugins: Extension["plugins"] = () => {
    return [];
  };
}

export const paragraphNodeExtension = createExtension(ParagraphNodeExtension);
