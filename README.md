# Pine, an extensible and headless text-editor framework

[Pine](https://github.com/IsaacAderogba/pine) is a JavaScript framework for building rich-text editors. It's based on the [Prosemirror](https://prosemirror.net/) toolkit, and emphasizes composability and customizability.

Pine’s libraries include the following:

| Library                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| `@iaworkspace/pine-core`  | Framework-agnostic API for building text editors. |
| `@iaworkspace/pine-react` | React-bindings for the core library.              |

> Pine, like many of my projects, has been primarily built for my use cases. If you wish to extend the base functionality, you're encouraged to fork the package.

## Guides

#### Installation

Pine can be installed either as a standalone core library or as a core library with framework bindings.

*Javascript*

If you are using plain javascript, you can install the library with your preferred package manager.

```shell
npm install @iaworkspace/pine-core
```

Install pine core using npm.

You can then import the `Pine` class and your desired extensions.

```typescript
import {
  Pine,
  docNodeExtension,
  paragraphNodeExtension,
  textNodeExtension,
  baseKeysHookExtension,
  historyHookExtension,
} from "@iaworkspace/pine-core";
```

Import the minimum set of extensions for a functioning editor.

Create an instance called `pine` and register your imported extensions.

```typescript
const pine = new Pine();

pine.registerExtension(docNodeExtension());
pine.registerExtension(paragraphNodeExtension());
pine.registerExtension(textNodeExtension());
pine.registerExtension(baseKeysHookExtension());
pine.registerExtension(historyHookExtension());
```

Register extensions on the pine instance.

Initalizing the editor then involves creating the schema, plugins, and state. These get passed to the `renderView` method, along with the HTML element the editor should be mounted to.

```typescript
const schema = pine.createSchema();
const plugins = pine.createPlugins({ schema });
const state = pine.createState({ schema, plugins });
pine.renderView(document.querySelector("#app"), { state });
```

Render the pine instance, passing the target html element and the current editor state.

*React*

For an improved developer experience, you can install react bindings along with the core library.

```shell
npm install @iaworkspace/pine-core @iaworkspace/pine-react
```

Install pine core and react using npm.

Import the necessary modules from `react`, `react-dom`, `@pine/react`, and `@pine/core`.

```typescript
import React from "react";
import { createRoot } from "react-dom/client";
import { PineEditor, usePine } from "@iaworkspace/pine-react";
import {
  docNodeExtension,
  paragraphNodeExtension,
  textNodeExtension,
  baseKeysHookExtension,
  historyHookExtension,
} from "@iaworkspace/pine-core";
```

Import the minimum set of extensions for a functioning editor.

Create and render your `App` component, which itself then renders the `PineEditor`.

```typescript
const App = () => {
  const { pine, state } = usePine({
    extensions: [
      docNodeExtension(),
      paragraphNodeExtension(),
      textNodeExtension(),
      baseKeysHookExtension(),
      historyHookExtension(),
    ],
  });

  return <PineEditor pine={pine} state={state} />;
};

createRoot(document.querySelector("#app")).render(<App />);
```

Setup and render your application.

## Docs

#### Pine

Pine is an extensible text-editor framework that prioritizes modularity and performance. To that effect, it has been built using the Prosemirror toolkit and takes inspiration from block-based editors such as Notion.

#### Easily extendable

Pine adopts an extension system, similar to other prosemirror-based frameworks such as [TipTap](https://tiptap.dev/).

> As an aside, TipTap is great and is commited to building an editor that satisfies a multitude of use cases (I can't promise the same for Pine).

Extensions are self-contained and bundle up different units of functionality you can add to your editor. Pine supports four types of extensions:

| Type      | Description                                                                                   | Example                  |
| --------- | --------------------------------------------------------------------------------------------- | ------------------------ |
| Node      | Node extensions add blocks and textblocks to your documents.                                  | `ParagraphNodeExtension` |
| Mark      | Mark extensions add inline formatting and decorations to your documents.                      | `StrongMarkExtension`    |
| Hook      | Hook extensions provide functionality that isn’t user visible.                                | `HistoryHookExtension`   |
| Converter | Converter extensions support serializing and parsing documents to and from different formats. | `DomConverterExtension.` |

#### Dynamic schema construction

In Pine, every document must confine to a target schema that specifies the allowable states of a document. If you’re familiar with Prosemirror, you might define schemas in the following away:

```typescript
const trivialSchema = new Schema({
  nodes: {
    doc: {content: "paragraph+"},
    paragraph: {content: "text*"},
    text: {inline: true},
    /* ... and so on */
  }
})
```

Pine instead embraces dynamic schema construction. Instead of defining the schema up front, you’re encouraged to actualize your schema **only** after you have registered your desired extensions:

```typescript
pine.registerExtension(docNodeExtension());
pine.registerExtension(paragraphNodeExtension());
pine.registerExtension(textNodeExtension());

// ... some time later

const schema = pine.createSchema();
```

#### Headless user interface

Pine is “headless editor", which just means that you get full control over all aspects of the design.

Each user interface extension comes with an overridable class name. This means that you can either target Pine’s predefined class names (such as `pine-doc`) or implement your own (such as `my-paragraph`).

```typescript
pine.registerExtension(docNodeExtension()); // pine-doc
pine.registerExtension(paragraphNodeExtension({ className: "my-paragraph" }));
```

Pine also allows you to customize the element itself. If you don’t want a `paragraph` element for your paragraphs, you can create an `ElementView` to control the rendering logic.

```typescript
new ElementView({
  ...,
  hooks: {
    create: el => {
      el.contentDOM = document.createElement("my-element");
      el.contentDOM.style.color = "red";
      return el.contentDOM;
    },
  },
});
```

#### Node Extensions

Pine currently supports the following node extensions:

- `DocNodeExtension`.
- `ParagraphNodeExtension`.
- `TextNodeExtension`.

You can create your own node extensions by extending the `Extension` class, defining your `NodeSpec`, and then initializing custom plugins.

```typescript
class MyNodeExtension extends Extension {
  name = "myNode";

  get schema() {
    const myNode: NodeSpec = {
      content: NodeSpecContents["inline*"],
      group: NodeSpecGroups.block,
      parseDOM: [{ tag: "p" }],
      toDOM: () => ["p", 0],
    };

    return { nodes: { [this.name]: myNode } };
  }

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    return [
      ...super.initPlugins({ schema }),
      // ...your plugins
    ];
  };
}

const myNodeExtension = createExtension(MyNodeExtension);

// ...

pine.registerExtension(myNodeExtension());
```

#### Mark Extensions

Pine currently supports the following mark extensions:

- `StrongMarkExtension`.

You can create your own mark extensions by extending the `Extension` class, defining your `MarkSpec`, and then initializing custom plugins.

```typescript
class MyMarkExtension extends Extension {
  name = "myMark";

  get schema() {
    const myMark: MarkSpec = {
      group: MarkSpecGroups.annotative,
      parseDOM: [{ tag: "i" }],
      toDOM: () => ["i", 0],
    };

    return { marks: { [this.name]: myMark } };
  }

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    return [
      ...super.initPlugins({ schema }),
      // ...your plugins
    ];
  };
}

const myMarkExtension = createExtension(MyMarkExtension);

// ...

pine.registerExtension(myMarkExtension());
```

#### Hook Extensions

Pine currently supports the following hook extensions:

- `BaseKeysHookExtension`.
- `HistoryHookExtension`.

You can create your own hook extensions by extending the `Extension` class and then initializing custom plugins.

```typescript
class MyHookExtension extends Extension {
  name = "myHook";

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    return [
      ...super.initPlugins({ schema }),
      // ...your plugins
    ];
  };
}

const myHookExtension = createExtension(MyHookExtension);

// ...

pine.registerExtension(myHookExtension());
```

#### Converter Extensions

Pine currently supports the following converter extensions:

- `DomConverterExtension`.

You can create your own converter extensions by extending the `Extension` class, creating your own parse and serialize method, and initializing custom plugins.

```typescript
class MyConverterExtension extends Extension {
  name = "myConverter";

  initPlugins: Extension["initPlugins"] = ({ schema }) => {
    this.createConverters(schema);
    return [
      ...super.initPlugins({ schema }),
      // ...your plugins
    ];
  };

  createConverters(schema: Schema) {
    // initialize this.parse and this.serialize using
  }
}

const myConverterExtension = createExtension(MyConverterExtension);

// ...

pine.registerExtension(myConverterExtension());
```

