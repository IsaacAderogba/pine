import { Node } from "@core/prosemirror/model";
import { EditorView, NodeView } from "@core/prosemirror/view";
import { namespace } from "@core/utils/namespace";
import { Extension } from "@extensions/Extension";

export interface ElementViewProps<Context = unknown> {
  extension: Extension<Context>;
  node: Node;
  view: EditorView;
  hooks: {
    create: (elementView: ElementView) => HTMLElement;
    update?: (elementView: ElementView) => void;
    destroy?: (elementView: ElementView) => void;
  };
}

export class ElementView<T extends ElementViewProps = ElementViewProps>
  implements NodeView
{
  readonly dom: HTMLDivElement = document.createElement("div");
  contentDOM: HTMLElement | undefined = undefined;
  props: T;

  constructor(props: T) {
    this.props = props;

    this.dom.classList.add(namespace(`${this.props.node.type.name}-dom`));
    this.dom.appendChild(this.props.hooks.create(this));

    this.update();
  }

  update(node = this.props.node) {
    if (node.type !== this.props.node.type) return false;
    this.props.node = node;

    if (this.props.hooks.update) this.props.hooks.update(this);
    return true;
  }

  ignoreMutation(mutation: MutationRecord): boolean {
    if (!this.contentDOM) return true;
    return !this.contentDOM.contains(mutation.target);
  }

  destroy() {
    this.dom.remove();
    if (this.props.hooks.destroy) this.props.hooks.destroy(this);
  }
}
