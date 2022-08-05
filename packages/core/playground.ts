import {
  baseKeysHookExtension,
  docNodeExtension,
  historyHookExtension,
  paragraphNodeExtension,
  Pine,
  textNodeExtension,
} from "./src";

const pine = new Pine();

pine.registerExtension(docNodeExtension());
pine.registerExtension(paragraphNodeExtension());
pine.registerExtension(textNodeExtension());

pine.registerExtension(baseKeysHookExtension());
pine.registerExtension(historyHookExtension());

const schema = pine.createSchema();
const plugins = pine.createPlugins({ schema });
const state = pine.createState({ schema, plugins });

const element = document.querySelector("#playground");
pine.renderView(element, { state });
