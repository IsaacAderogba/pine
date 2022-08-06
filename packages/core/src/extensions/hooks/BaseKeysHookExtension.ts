import { baseKeymap } from "@core/prosemirror/commands";
import { KeymapPlugin } from "@core/keymap/KeymapPlugin";
import { createExtension, Extension, ExtensionSpec } from "@extensions/Extension";
import { ExtensionHooks } from "@extensions/ExtensionTypes";

export interface BaseKeysHookExtensionSpec extends ExtensionSpec {}
export class BaseKeysHookExtension extends Extension<BaseKeysHookExtensionSpec> {
  name = ExtensionHooks.baseKeys;

  constructor(public spec: BaseKeysHookExtensionSpec = {}) {
    super();
  }

  plugins: Extension["plugins"] = () => {
    return [new KeymapPlugin(baseKeymap)];
  };
}

export const baseKeysHookExtension = createExtension(BaseKeysHookExtension);
