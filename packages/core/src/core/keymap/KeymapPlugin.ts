import { keydownHandler } from "@core/prosemirror/keymap";
import { Command, Plugin, PluginSpec } from "@core/prosemirror/state";

export type Keymap = { [key: string]: Command };
type KeymapState = undefined;

export class KeymapPlugin extends Plugin<KeymapState> {
  constructor(
    public keymap: Keymap,
    { props = {}, ...rest }: PluginSpec<KeymapState> = {}
  ) {
    super({
      props: { handleKeyDown: keydownHandler(keymap), ...props },
      ...rest,
    });
  }
}
