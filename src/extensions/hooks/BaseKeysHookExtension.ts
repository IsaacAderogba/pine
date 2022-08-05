import { baseKeymap } from "@core/prosemirror/commands";
import { KeymapPlugin } from "@core/keymap/KeymapPlugin";
import { Extension } from "@extensions/Extension";
import { ExtensionHooks } from "@extensions/ExtensionTypes";

export class BaseKeysHookExtension extends Extension {
  name = ExtensionHooks.baseKeys;

  plugins: Extension["plugins"] = () => {
    return [new KeymapPlugin(baseKeymap)];
  };
}
