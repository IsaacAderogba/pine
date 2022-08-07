import { MarkSpecGroups } from "@core/model/marks";
import { MarkSpec } from "@core/prosemirror/model";
import { namespace } from "@core/utils/namespace";
import {
  createExtension,
  Extension,
  ExtensionSpec,
} from "@extensions/Extension";
import { ExtensionMarks } from "@extensions/ExtensionTypes";

export interface StrongMarkExtensionSpec extends ExtensionSpec {
  className: string;
}

export class StrongMarkExtension extends Extension {
  name = ExtensionMarks.strong;
  spec: StrongMarkExtensionSpec;

  get schema() {
    const strong: MarkSpec = {
      group: MarkSpecGroups.decorative,
      parseDOM: [{ tag: "b" }, { tag: "strong" }, { style: "font-style=bold" }],
      toDOM: () => ["strong", { class: this.spec.className }, 0],
    };

    return { marks: { strong } };
  }

  constructor(spec: Partial<StrongMarkExtensionSpec> = {}) {
    super();

    this.spec = { className: namespace(this.name), ...spec };
  }

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    return super.initPlugins({ schema });
  };
}

export const strongMarkExtension = createExtension(StrongMarkExtension);
