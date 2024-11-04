import { Cart, Product } from '../../types';
import { Modal } from './Modal';
import { View } from './View';
import { bem, cloneTemplate } from '../../utils/utils';

export class ProductModal extends Modal {
    private product: Product;
    private wrapper: HTMLElement;

    constructor(container: HTMLElement, wrapper: HTMLElement, product: Product) {
        super(container);
        this.product = product;
        this.wrapper = wrapper;
        console.log(this.product)
    }

    render(): void {
        this.wrapper.classList.add("modal_active");

        const categoryLabel = this.container.querySelector(".card__category");
        const titleLabel = this.container.querySelector(".card__title");
        const price = this.container.querySelector(".card__price");

        console.log(this.product);
        console.log(this.product.category);

        categoryLabel.textContent = this.product.category;

        console.log("Hello");

        switch (this.product.category) {
            case "софт-скилл":
                categoryLabel.classList.add("card__category_soft");
                break;
            case "другое":
                categoryLabel.classList.add("card__category_other");
                break;
            case "дополнительное":
                categoryLabel.classList.add("card__category_additional");
                break;
            case "кнопка":
                categoryLabel.classList.add("card__category_button");
                break;
            case "хард-скилл":
                categoryLabel.classList.add("card__category_hard");
                break;
        }

        titleLabel.textContent = this.product.title;
        price.textContent = this.product.price == null ? "Бесценно" : `${this.product.price} синапсов`;


        this.container.querySelector(".card__button").addEventListener("click", () => {
            Cart.instance.addItem(this.product);
            this.wrapper.classList.remove("modal_active");
        });
    }
}

class ProductCard extends View {
    private product: Product;

    constructor(productCardElement: HTMLElement, product: Product) {
        super(productCardElement);
        this.product = product;
    }

    render() {
        const categoryLabel = this.container.querySelector(".card__category");
        const titleLabel = this.container.querySelector(".card__title");
        const price = this.container.querySelector(".card__price");

        categoryLabel.textContent = this.product.category;

        switch (this.product.category) {
            case "софт-скилл":
                categoryLabel.classList.add("card__category_soft");
                break;
            case "другое":
                categoryLabel.classList.add("card__category_other");
                break;
            case "дополнительное":
                categoryLabel.classList.add("card__category_additional");
                break;
            case "кнопка":
                categoryLabel.classList.add("card__category_button");
                break;
            case "хард-скилл":
                categoryLabel.classList.add("card__category_hard");
                break;
        }

        titleLabel.textContent = this.product.title;
        price.textContent = this.product.price == null ? "Бесценно" : `${this.product.price} синапсов`;

        this.container.addEventListener("click", this.runDialog.bind(this), false);
    }

    get productContainer(): HTMLElement {
        return this.container;
    }

    private runDialog() {
        const modalContent: HTMLElement = cloneTemplate("#add-to-cart");
        const modal: HTMLElement = document.querySelector(".modal-add-to-cart");

        const addToCardDialogModal = new ProductModal(modalContent, modal, this.product);

        modal.innerHTML = '';
        modal.appendChild(modalContent);
        addToCardDialogModal.render();
    }
}

export class ProductsView extends View {
    private products: ProductCard[];

    constructor(containerId: string) {
        super(document.getElementById(containerId));
        this.products = [];
    }

    render() {
        this.container.innerHTML = '';

        for (const product of this.products) {
            product.render();
            this.container.appendChild(product.productContainer);
        }
    }

    public appendProduct(product: Product) {
        const productCard = cloneTemplate("#card-catalog");
        this.products.push(new ProductCard(productCard, product));
    }

    private showProductModal(product: Product): void {
        /*TODO*/
    }
}