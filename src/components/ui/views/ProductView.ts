import { View } from '../base/View.js';
import { Modal } from '../base/Modal';
import { IProduct } from '../../../types';

export class ProductModal extends Modal {
    private product: IProduct;

    constructor(containerId: string, product: IProduct) {
        super(containerId);
        this.product = product;
    }

    render(): void {
        /*TODO*/
    }
}

export class ProductView extends View {
    private products: IProduct[];

    constructor(containerId: string, products: IProduct[]) {
        super(containerId);
        this.products = products;
    }

    render(): void {
        /*TODO*/
    }

    private createProductCard(product: IProduct): string {
        /*TODO*/
        return null;
    }

    private showProductModal(product: IProduct): void {
        /*TODO*/
    }
}