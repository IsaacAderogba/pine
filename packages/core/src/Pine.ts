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

export type PineEvents = EventsApi<{
  docChanged: (data: { state: EditorState; transaction: Transaction }) => void;
  viewCreated: (data: { view: EditorView }) => void;
  destroyed: () => void;
}>;

export class Pine extends EventEmitter<PineEvents> {
  private extensions: Map<string, Extension> = new Map();
  private view?: EditorView;

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

  public createView(
    place: ConstructorParameters<typeof EditorView>[0],
    props: Omit<DirectEditorProps, "dispatchTransaction">
  ) {
    const view = new EditorView(place, {
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
    if (!this.view) throw new PineError("View must first be created.");
    const plugins = this.createPlugins({ schema: this.view.state.schema });
    const state = this.view.state.reconfigure({ plugins });
    this.view.updateState(state);
  }

  public destroy() {
    this.destroyListeners();

    this.view?.destroy();
    this.view = undefined;

    this.emit("destroyed");
  }
}

class PineError extends Error {}
