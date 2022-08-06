import React, {
  useEffect,
  useContext,
  createContext,
  useRef,
  useReducer,
  DependencyList,
  useMemo,
  useCallback,
  useState,
} from "react";
import { Extension, Pine, PineEvents, PineViewProps } from "@pine/core";
import { Portals, usePortals } from "./usePortals";

export interface PineContext {
  pine: Pine;
  portals: Portals;
}

const Context = createContext<PineContext | undefined>(undefined);

export interface PineEditorProps extends PineViewProps {
  children?: React.ReactNode;
  pine: Pine;
}

export const PineEditor: React.FC<PineEditorProps> = ({
  children,
  pine,
  ...props
}) => {
  const [_, renderEditor] = useReducer(x => x + 1, 0);
  const editorViewRef = useRef<HTMLDivElement>(null);
  const [portals, portalsContext] = usePortals();

  useEffect(() => {
    if (!editorViewRef.current) return;

    pine.createView(
      { mount: editorViewRef.current },
      { handleClick: () => renderEditor(), ...props }
    );

    pine.on("docChanged", () => renderEditor());

    return () => portalsContext.clear();
  }, [pine]);

  return (
    <Context.Provider value={{ pine, portals: portalsContext }}>
      <div ref={editorViewRef} />
      {portals}
      {children}
    </Context.Provider>
  );
};

export const usePineEditor = () => {
  const context = useContext(Context);
  if (!context) throw new Error("usePineEditor must be used within PineEditor");
  return context;
};

type PineOptions = { on?: Partial<PineEvents>; extensions: Extension[] };

export const usePine = (props: PineOptions, deps: DependencyList = []) => {
  const createEditor = useCallback(() => {
    const { on = {}, extensions = [] } = props;

    const pine = new Pine();
    const schema = pine.createSchema();
    const plugins = pine.createPlugins({ schema });
    const state = pine.createState({ schema, plugins });

    extensions.forEach(ext => pine.registerExtension(ext));
    Object.entries(on).map(([e, cb]) => pine.on(e as keyof PineEvents, cb));

    return { pine, state };
  }, [props]);

  const [editor, setEditor] = useState(createEditor);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      const editor = createEditor();
      setEditor(editor);
      return () => editor.pine.destroy();
    } else {
      hasMounted.current = true;
    }
  }, [deps]);

  return editor;
};
