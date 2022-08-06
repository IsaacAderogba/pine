import {
  EditorState,
  EditorStateConfig,
  Transaction,
  Plugin,
} from "@core/prosemirror/state";
import { DirectEditorProps, EditorView } from "@core/prosemirror/view";
import { MarkSpec, NodeSpec, Schema } from "@core/prosemirror/model";

import { EventEmitter, EventsApi } from "@core/utils/EventEmitter";
import { Extension } from "@extensions/Extension";

export class Pine extends EventEmitter<PineEvents> {
  private extensions: Map<string, Extension> = new Map();
  public view?: EditorView;

  public registerExtension(extension: Extension) {
    this.extensions.set(extension.name, extension);
  }

  public unregisterExtension(extension: Extension) {
    this.extensions.delete(extension.name);
  }

  public createSchema() {
    let nodes: { [key: string]: NodeSpec } = {};
    this.extensions.forEach(({ schema }) => {
      nodes = { ...nodes, ...schema?.nodes };
    });

    let marks: { [key: string]: MarkSpec } = {};
    this.extensions.forEach(({ schema }) => {
      marks = { ...marks, ...schema?.marks };
    });

    return new Schema({ nodes, marks });
  }

  public createPlugins({ schema }: { schema: Schema }) {
    const plugins: Plugin[] = [];

    this.extensions.forEach(ext => {
      const staticPlugins = ext.plugins({ schema });
      plugins.push(...staticPlugins);

      if (ext.spec.addPlugins) {
        const dynamicPlugins = ext.spec.addPlugins({ schema, extension: ext });
        plugins.push(...dynamicPlugins);
      }
    });

    return plugins;
  }

  public createState(config: EditorStateConfig) {
    return EditorState.create(config);
  }

  public createView(mount: PineViewMount, props: PineViewProps) {
    const view = new EditorView(mount, {
      ...props,
      dispatchTransaction: transaction => {
        const state = view.state.apply(transaction);
        view.updateState(state);

        this.emit("docChanged", { state, transaction });
      },
    });

    this.view = view;
    this.emit("viewCreated", { view });
  }

  public reconfigureView() {
    if (!this.view) return;

    const plugins = this.createPlugins({ schema: this.view.state.schema });
    const state = this.view.state.reconfigure({ plugins });
    this.view.updateState(state);
  }

  public destroy() {
    if (this.view) this.view.destroy();
    this.view = undefined;

    this.emit("destroyed");
    this.destroyListeners();
  }
}

export type PineEvents = EventsApi<{
  docChanged: (data: { state: EditorState; transaction: Transaction }) => void;
  viewCreated: (data: { view: EditorView }) => void;
  destroyed: () => void;
}>;

export type PineViewMount = ConstructorParameters<typeof EditorView>[0];
export type PineViewProps = Omit<
  DirectEditorProps,
  "dispatchTransaction" | "plugins"
>;
