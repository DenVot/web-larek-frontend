import { View } from './View.js';

export abstract class Modal extends View {
    protected overlay: HTMLElement;

    constructor(containerId: string) {
        super(containerId);
        /*TODO*/
    }

    show(): void {
        /*TODO*/
    }

    close(): void {
        /*TODO*/
    }

    destroy(): void {
        /*TODO*/
    }
}