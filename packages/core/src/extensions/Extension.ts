import { Plugin } from "@core/prosemirror/state";
import { Schema } from "@core/prosemirror/model";
import { ExtensionSchema } from "./ExtensionTypes";

export interface ExtensionSpec {
  addPlugins?: (props: { schema: Schema; extension: Extension }) => Plugin[];
}

export abstract class Extension<Context = unknown> {
  spec: ExtensionSpec = {};

  abstract name: string;
  abstract plugins: (params: { schema: Schema }) => Plugin[];

  get schema(): ExtensionSchema {
    return {};
  }

  context!: Context;
  bindContext(context: Context) {
    this.context = context;
  }
}

export const createExtension =
  <E extends new (...params: any[]) => InstanceType<E>>(Ext: E) =>
  (...params: ConstructorParameters<E>) =>
    new Ext(...params);
