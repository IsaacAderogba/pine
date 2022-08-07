import { KeymapPlugin } from "@core/keymap/KeymapPlugin";
import { history, redo, undo } from "@core/prosemirror/history";
import { isMac } from "@core/utils/browser";
import {
  createExtension,
  Extension,
  ExtensionSpec,
} from "@extensions/Extension";
import { ExtensionHooks } from "@extensions/ExtensionTypes";

export interface HistoryHookExtensionSpec extends ExtensionSpec {}
export class HistoryHookExtension extends Extension {
  name = ExtensionHooks.history;

  constructor(public spec: HistoryHookExtensionSpec = {}) {
    super();
  }

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    return [
      ...super.initPlugins({ schema }),
      history(),
      new KeymapPlugin({
        "Mod-z": undo,
        [isMac ? "Shift-Mod-z" : "Mod-y"]: redo,
      }),
    ];
  };
}

export const historyHookExtension = createExtension(HistoryHookExtension);
