import {
  createExtension,
  Extension,
  ExtensionSpec,
} from "@extensions/Extension";
import { ExtensionConverters } from "@extensions/ExtensionTypes";
import {
  DOMParser,
  DOMSerializer,
  Fragment,
  Node,
  Schema,
} from "@core/prosemirror/model";
import { PineError } from "@core/utils/error";

export interface DomConverterExtensionSpec extends ExtensionSpec {}

export class DomConverterExtension extends Extension<DomConverterExtensionSpec> {
  name = ExtensionConverters.dom;
  private parser!: DOMParser;
  private serializer!: DOMSerializer;

  constructor(public spec: DomConverterExtensionSpec = {}) {
    super();
  }

  parse(...args: Parameters<DOMParser["parse"]>) {
    if (!this.parser) {
      throw new PineError("Parser plugin not yet initialized.");
    }
    return this.parser.parse(...args);
  }

  serialize(content: Node | Fragment) {
    if (!this.serializer) {
      throw new PineError("Serializer plugin not yet initialized.");
    }

    if (content instanceof Fragment) {
      return this.serializer.serializeFragment(content);
    } else {
      return this.serializer.serializeNode(content);
    }
  }

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    this.createConverters(schema);
    return super.initPlugins({ schema });
  };

  private createConverters(schema: Schema) {
    this.parser = DOMParser.fromSchema(schema);
    this.serializer = DOMSerializer.fromSchema(schema);
  }
}

export const domConverterExtension = createExtension(DomConverterExtension);
