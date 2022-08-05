import { EditorState, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import { EventEmitter, EventsApi } from "@core/utils/EventEmitter";

export type PineEvents = EventsApi<{
  docChanged: (data: { state: EditorState; transaction: Transaction }) => void;
  viewCreated: (data: { view: EditorView }) => void;
  destroyed: () => void;
}>;

export class Pine extends EventEmitter<PineEvents> {}
