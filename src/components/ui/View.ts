import { EventEmitter } from '../base/events';

export abstract class View extends EventEmitter {
    protected container: HTMLElement;

    protected constructor(container: HTMLElement) {
        super();
        this.container = container;
    }

    abstract render(): void;
}