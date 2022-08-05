import { KeymapPlugin } from "@core/keymap/KeymapPlugin";
import { history, redo, undo } from "@core/prosemirror/history";
import { isMac } from "@core/utils/browser";
import { Extension } from "@extensions/Extension";
import { ExtensionHooks } from "@extensions/ExtensionTypes";

export type HistoryHookExtensionProps = undefined;
export class HistoryHookExtension extends Extension<HistoryHookExtensionProps> {
  name = ExtensionHooks.history;

  plugins: Extension["plugins"] = () => {
    return [
      history(),
      new KeymapPlugin({
        "Mod-z": undo,
        [isMac ? "Shift-Mod-z" : "Mod-y"]: redo,
      }),
    ];
  };
}

export const historyHookExtension = (
  ...params: ConstructorParameters<typeof HistoryHookExtension>
) => new HistoryHookExtension(...params);