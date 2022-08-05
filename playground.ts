import {
  BaseKeysHookExtension,
  DocNodeExtension,
  HistoryHookExtension,
  ParagraphNodeExtension,
  Pine,
  TextNodeExtension,
} from "pine";

const pine = new Pine();

pine.registerExtension(new DocNodeExtension());
pine.registerExtension(new ParagraphNodeExtension());
pine.registerExtension(new TextNodeExtension());

pine.registerExtension(new BaseKeysHookExtension());
pine.registerExtension(new HistoryHookExtension());

const schema = pine.createSchema();
const plugins = pine.createPlugins({ schema });
const state = pine.createState({ schema, plugins });

const element = document.querySelector("#playground");
pine.renderView(element, { state });
