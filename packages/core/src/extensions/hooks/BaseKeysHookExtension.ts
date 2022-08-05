import { baseKeymap } from "@core/prosemirror/commands";
import { KeymapPlugin } from "@core/keymap/KeymapPlugin";
import { Extension } from "@extensions/Extension";
import { ExtensionHooks } from "@extensions/ExtensionTypes";

export type BaseKeysHookExtensionProps = undefined;
export class BaseKeysHookExtension extends Extension<BaseKeysHookExtensionProps> {
  name = ExtensionHooks.baseKeys;

  plugins: Extension["plugins"] = () => {
    return [new KeymapPlugin(baseKeymap)];
  };
}

export const baseKeysHookExtension = (
  ...params: ConstructorParameters<typeof BaseKeysHookExtension>
) => new BaseKeysHookExtension(...params);