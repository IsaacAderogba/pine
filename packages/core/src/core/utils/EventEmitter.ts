type KeyOf<T> = Extract<keyof T, string>;

interface Events {
  [key: string]: (...args: any) => void;
}

export type EventsApi<T extends Events> = T;

export class EventEmitter<T extends Events> {
  private listeners: { [name: string]: Set<Function> } = {};

  public on<E extends KeyOf<T>>(event: E, cb: T[E]) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }

    this.listeners[event].add(cb);
    return () => {
      this.listeners[event]?.delete(cb);
    };
  }

  protected emit<E extends KeyOf<T>>(event: E, ...args: Parameters<T[E]>) {
    this.listeners[event]?.forEach(cb => cb.apply(this, args));
  }

  protected destroyListeners(): void {
    this.listeners = {};
  }
}
