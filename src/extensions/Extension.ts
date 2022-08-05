import { Schema } from "prosemirror-model";
import { Plugin, PluginSpec } from "prosemirror-state";
import { ExtensionSchemaSpec } from "./ExtensionTypes";

export type ExtensionConfig = {
  addPluginSpecs?: (props: {
    schema: Schema;
    extension: Extension;
  }) => PluginSpec<unknown>[];
};

export type ExtensionContext = any;

export abstract class Extension<
  Config extends ExtensionConfig = ExtensionConfig,
  Context extends ExtensionContext = ExtensionContext
> {
  public config: Config;
  public context!: Context;

  constructor(config: Config) {
    this.config = config;
  }

  abstract name: string;
  schemaSpec: ExtensionSchemaSpec = {};

  plugins = (): Plugin[] => [];

  bindContext(context: Context) {
    this.context = context;
  }
}
