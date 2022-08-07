import { Plugin } from "@core/prosemirror/state";
import { Schema } from "@core/prosemirror/model";
import { ExtensionSchema } from "./ExtensionTypes";

export interface ExtensionSpec {
  addPlugins?: (props: { schema: Schema; extension: Extension }) => Plugin[];
}

export abstract class Extension<Context = unknown> {
  context!: Context;
  spec: ExtensionSpec = {};

  abstract name: string;
  get schema(): ExtensionSchema {
    return {};
  }

  initPlugins({ schema }: { schema: Schema }): Plugin[] {
    if (!this.spec.addPlugins) return [];
    return this.spec.addPlugins({ schema, extension: this });
  }

  bindContext(context: Context) {
    this.context = context;
  }
}

export const createExtension =
  <E extends new (...params: any[]) => InstanceType<E>>(Ext: E) =>
  (...params: ConstructorParameters<E>) =>
    new Ext(...params);
