import "setimmediate";
import React, {
  Fragment,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { nanoid } from "nanoid";

type PortalSet = Map<HTMLElement, { key: string; component: React.ReactNode }>;
type RenderPortal = (
  component: React.ReactNode | null,
  node: HTMLElement | null
) => void;

export interface Portals {
  render: RenderPortal;
}

export const usePortals = () => {
  const [portals, setPortals] = useState<PortalSet>(new Map());

  const queue = useRef<((set: PortalSet) => void)[]>([]);
  const queueTimeout = useRef<ReturnType<typeof setImmediate> | null>(null);

  const render = useCallback<RenderPortal>((component, dom) => {
    if (queueTimeout.current !== null) clearImmediate(queueTimeout.current);

    queue.current.push(nextPortals => {
      if (dom) {
        if (component) {
          const key = nextPortals.get(dom)?.key ?? nanoid();

          nextPortals.set(dom, { key, component });
        } else {
          nextPortals.delete(dom);
        }
      }
    });

    queueTimeout.current = setImmediate(() => {
      const portalQueue = queue.current;
      queue.current = [];

      setPortals(prevPortals => {
        const nextPortals = new Map(prevPortals);

        for (const cb of portalQueue) {
          cb(nextPortals);
        }

        return nextPortals;
      });
    });
  }, []);

  const clear = useCallback(() => setPortals(new Map()), []);

  useLayoutEffect(() => {
    return () => {
      if (queueTimeout.current !== null) clearImmediate(queueTimeout.current);
    };
  }, []);

  const renderedPortals = Array.from(portals.entries()).map(
    ([dom, { key, component }]) => (
      <Fragment key={key}>{createPortal(component, dom, key)}</Fragment>
    )
  );

  return [renderedPortals, { render, clear }] as const;
};
