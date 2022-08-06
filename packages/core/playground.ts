import {
  baseKeysHookExtension,
  docNodeExtension,
  historyHookExtension,
  paragraphNodeExtension,
  Pine,
  textNodeExtension,
  Plugin,
  ElementView,
} from "./src";

const pine = new Pine();

pine.registerExtension(docNodeExtension({ className: "pm-doc" }));
pine.registerExtension(
  paragraphNodeExtension({
    addPlugins: ({ extension }) => {
      return [
        new Plugin({
          props: {
            nodeViews: {
              [extension.name]: (node, view) =>
                new ElementView({
                  node,
                  view,
                  extension,
                  hooks: {
                    create: el => {
                      el.contentDOM = document.createElement("p");
                      el.contentDOM.style.color = "red";
                      return el.contentDOM;
                    },
                  },
                }),
            },
          },
        }),
      ];
    },
  })
);
pine.registerExtension(textNodeExtension());

pine.registerExtension(baseKeysHookExtension());
pine.registerExtension(historyHookExtension());

const schema = pine.createSchema();
const plugins = pine.createPlugins({ schema });
const state = pine.createState({ schema, plugins });

const element = document.querySelector("#playground");
pine.renderView(element, { state });
