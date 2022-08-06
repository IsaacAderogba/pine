import React from "react";
import { createRoot } from "react-dom/client";
import {
  baseKeysHookExtension,
  docNodeExtension,
  historyHookExtension,
  paragraphNodeExtension,
  textNodeExtension,
} from "@pine/core";
import { PineEditor, usePine } from "./src";

const App = () => {
  const { pine, state } = usePine({
    extensions: [
      docNodeExtension(),
      paragraphNodeExtension(),
      textNodeExtension(),
      baseKeysHookExtension(),
      historyHookExtension(),
    ],
    on: {
      docChanged: () => console.log("docChanged"),
      viewCreated: () => console.log("viewCreated"),
      destroyed: () => console.log("destroyed"),
    },
  });

  return <PineEditor pine={pine} state={state} />;
};

let container: HTMLElement | null = null;
if (!container) {
  container = document.getElementById("playground") as HTMLElement;
  createRoot(container).render(<App />);
}
