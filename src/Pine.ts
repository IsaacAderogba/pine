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
  extensions: Map<string, Extension> = new Map();
  view?: EditorView;

  public registerExtension(extension: Extension) {
    this.extensions.set(extension.name, extension);
  }

  public unregisterExtension(extension: Extension) {
    this.extensions.delete(extension.name);
  }

  public createSchema() {
    let nodes: { [key: string]: NodeSpec } = {};
    this.extensions.forEach(({ schemaSpec }) => {
      nodes = { ...nodes, ...schemaSpec?.nodes };
    });

    let marks: { [key: string]: MarkSpec } = {};
    this.extensions.forEach(({ schemaSpec }) => {
      marks = { ...marks, ...schemaSpec?.marks };
    });

    return new Schema({ nodes, marks });
  }

  public createPlugins({ schema }: { schema: Schema }) {
    const plugins: Plugin[] = [];

    this.extensions.forEach(ext => {
      const staticPlugins = ext.plugins({ schema });
      const dynamicPlugins = ext.config.addPlugins({ schema, extension: ext });

      plugins.push(...staticPlugins, ...dynamicPlugins);
    });

    return plugins;
  }

  public createState(config: EditorStateConfig) {
    return EditorState.create(config);
  }

  public renderView(
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
    // todo
  }

  public destroy() {
    this.destroyListeners();

    this.view?.destroy();
    this.view = undefined;

    this.emit("destroyed");
  }
}
