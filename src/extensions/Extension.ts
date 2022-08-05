import { Plugin } from "@core/prosemirror/state";
import { Schema } from "@core/prosemirror/model";
import { ExtensionSchemaSpec } from "./ExtensionTypes";

export type ExtensionConfig = {
  addPlugins: (props: { schema: Schema; extension: Extension }) => Plugin[];
};

export abstract class Extension<Props = any, Context = any> {
  props: Props;
  context?: Context;

  config: ExtensionConfig;
  schemaSpec: ExtensionSchemaSpec = {};
  constructor(props: Props, config: Partial<ExtensionConfig> = {}) {
    this.props = props;
    this.config = { addPlugins: () => [], ...config };
  }

  abstract name: string;
  abstract plugins: (params: { schema: Schema }) => Plugin[];

  bindContext(context: Context) {
    this.context = context;
  }
}
