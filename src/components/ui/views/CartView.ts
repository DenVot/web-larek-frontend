import { Modal } from '../base/Modal.js';
import { ICartItem } from '../../../types';

export class RemoveItemEventData {
    private readonly idx: number

    constructor(index: number) {
        this.idx = index;
    }

    public get index(): number {
        return this.idx;
    }
}

export class NotificationEventData {
    private readonly data: string

    constructor(data: string) {
        this.data = data;
    }

    public get notificationText(): string {
        return this.data;
    }
}

export class CartView extends Modal {
    private items: ICartItem[] = [];
    private currentPhase = 1;

    constructor(containerId: string) {
        super(containerId);
    }

    setItems(items: ICartItem[]): void {
        this.items = items;
        this.renderItems();
    }

    render(): void {
        /*TODO*/
    }

    private renderItems(): void {
        /*TODO*/
    }

    private setupEventListeners(): void {
        /*TODO*/
    }

    private showPhase(phase: number): void {
        /*TODO*/
    }

    private resetForm(): void {
        /*TODO*/
    }

    private validateEmail(email: string): boolean {
        /*TODO*/
        return false;
    }

    private validatePhone(phone: string): boolean {
        /*TODO*/
        return false;
    }
}