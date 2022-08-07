import { baseKeymap } from "@core/prosemirror/commands";
import { KeymapPlugin } from "@core/keymap/KeymapPlugin";
import {
  createExtension,
  Extension,
  ExtensionSpec,
} from "@extensions/Extension";
import { ExtensionHooks } from "@extensions/ExtensionTypes";

export interface BaseKeysHookExtensionSpec extends ExtensionSpec {}
export class BaseKeysHookExtension extends Extension<BaseKeysHookExtensionSpec> {
  name = ExtensionHooks.baseKeys;

  constructor(public spec: BaseKeysHookExtensionSpec = {}) {
    super();
  }

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    return [...super.initPlugins({ schema }), new KeymapPlugin(baseKeymap)];
  };
}

export const baseKeysHookExtension = createExtension(BaseKeysHookExtension);
