import { KeymapPlugin } from "@core/keymap/KeymapPlugin";
import { history, redo, undo } from "@core/prosemirror/history";
import { Extension } from "@extensions/Extension";
import { ExtensionHooks } from "@extensions/ExtensionTypes";

export class HistoryHookExtension extends Extension {
  name = ExtensionHooks.history;

  plugins: Extension["plugins"] = () => {
    return [history(), new KeymapPlugin({ "Mod-z": undo, "Mod-y": redo })];
  };
}
