import { View } from './View';

export abstract class Modal extends View {
    protected overlay: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        /*TODO*/
    }
}