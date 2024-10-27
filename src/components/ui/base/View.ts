import { EventEmitter } from '../../base/events';

export abstract class View extends EventEmitter {
    protected container: HTMLElement;

    constructor(containerId: string) {
        super();
        /*TODO*/
    }

    abstract render(): void;
    
    protected createElement(template: string): HTMLElement {
        /*TODO*/

        return null;
    }
}