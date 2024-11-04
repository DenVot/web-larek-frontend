import { Modal } from './Modal';
import { Cart, ICartItem } from '../../types';
import { View } from './View';
import { cloneTemplate } from '../../utils/utils';
import { OrderInfo, PayMethods, WebLarekClient } from '../base/web-larek-client';
import { Api } from '../base/api';

class CartModalView extends Modal{
    private static inst: CartModalView;
    private active = false;

    private constructor(container: HTMLElement) {
        super(container);
        Cart.instance.on("cart-updated", this.render.bind(this));
    }

    render() {
        this.container.innerHTML = '';
        const cartTemp = cloneTemplate("#basket");

        this.container.appendChild(cartTemp);

        let index = 1;
        let sum = 0;
        for (const item of Cart.instance.getItems()) {
            const positionTemp = cloneTemplate("#card-basket");
            const idxLabel = positionTemp.querySelector(".basket__item-index");
            const titleLabel = positionTemp.querySelector(".card__title");
            const priceLabel = positionTemp.querySelector(".card__price");
            const deleteButton = positionTemp.querySelector(".basket__item-delete");

            idxLabel.textContent = index.toString();
            titleLabel.textContent = item.product.title;
            priceLabel.textContent = `${item.product.price == null ? 0 : item.product.price} синапсов`;

            deleteButton.addEventListener("click", () => {
                Cart.instance.removeItem(item);
            });

            index++;
            sum += item.product.price == null ? 0 : item.product.price;
            cartTemp.appendChild(positionTemp);
        }

        cartTemp.querySelector(".basket__button").addEventListener("click", () => {
            Cart.instance.off("cart-updated", this.render.bind(this));
            this.active = false;
            this.container.classList.remove("modal_active");
            DeliveryModalView.instance.show({
                address: null,
                email: null,
                items: Cart.instance.getItems().map(x => x.product.id),
                payment: null,
                phone: null,
                total: sum
            })
        });

        cartTemp.querySelector(".basket .basket__price").textContent = sum.toString();

        this.container.append(cartTemp);

        if (this.active) {
            this.container.classList.add("modal_active");
        }
    }

    show() {
        this.active = true;
        this.render();
    }

    hide() {
        this.active = false;
        this.render();
    }

    static get instance(): CartModalView {
        if (this.inst == null) {
            this.inst = new CartModalView(document.getElementById("modal-cart"));
        }

        return this.inst;
    }
}

class DeliveryModalView extends Modal {
    private static inst: DeliveryModalView;
    private active = false;
    private orderInfo: OrderInfo;

    private constructor(container: HTMLElement) {
        super(container);

        container.querySelectorAll(".order__buttons button")
          .forEach(x => x.addEventListener("click", (e) => {
                container.querySelectorAll(".order__buttons button")
                  .forEach(but => but.classList.remove("button_alt-active"));
                const target = e.target as HTMLElement;

                target.classList.add("button_alt-active");
                this.orderInfo.payment = target.textContent == "Онлайн" ? "online" : "offline";
                this.render();
            }
        ));

        container.querySelector(".order__field .form__input").addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement;
            this.orderInfo.address = target.value;
            this.render();
        });

        container.querySelector("#modal-delivery .modal__actions button").addEventListener("click", (e) => {
            e.preventDefault();
            const target = e.target as HTMLButtonElement;

            if (!target.disabled) {
                this.container.classList.remove("modal_active");
                this.active = false;

                ContactsModalView.instance.show(this.orderInfo);
            }
        });

        container.querySelector("#modal-delivery .modal__close").addEventListener("click", () => {
            this.active = false;
            this.render();
        });
    }

    render() {
        if (this.active) {
            this.container.classList.add("modal_active");
        } else {
            this.container.classList.remove("modal_active");
        }

        const button = this.container.querySelector(".modal__actions button") as HTMLButtonElement;
        button.disabled = this.orderInfo.payment == null || this.orderInfo.address == null || this.orderInfo.address.trim().length == 0;
    }

    show(orderInfo: OrderInfo): void {
        this.active = true;
        this.orderInfo = orderInfo;
        this.render();
    }

    static get instance(): DeliveryModalView {
        if (this.inst == null) {
            this.inst = new DeliveryModalView(document.getElementById("modal-delivery"));
        }

        return this.inst;
    }
}

class ContactsModalView extends Modal {
    private static inst: ContactsModalView;
    private active = false;
    private orderInfo: OrderInfo;

    private constructor(container: HTMLElement) {
        super(container);
        container.querySelector(".form__input_email").addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement;
            this.orderInfo.email = target.value;
            this.render();
        });

        container.querySelector(".form__input_phone").addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement;
            this.orderInfo.phone = target.value;
            this.render();
        });

        container.querySelector("#modal-contacts .modal__actions button").addEventListener("click", (e) => {
            e.preventDefault();
            const webLarekClient = new WebLarekClient(new Api(process.env.API_ORIGIN));

            webLarekClient.createOrder(this.orderInfo).then(() => {
                this.active = false;
                this.render();
                Cart.instance.clear();
                SuccessModalView.instance.show(this.orderInfo);
            });
        });

        container.querySelector("#modal-contacts .modal__close").addEventListener("click", () => {
            this.active = false;
            this.render();
        });
    }

    render() {
        if (this.active) {
            this.container.classList.add("modal_active");
        } else {
            this.container.classList.remove("modal_active");
        }

        const button = this.container.querySelector(".modal__actions button") as HTMLButtonElement;
        button.disabled = this.orderInfo.email == null || this.orderInfo.phone == null || this.orderInfo.email.trim().length == 0 || this.orderInfo.phone.trim().length == 0;
    }

    show(orderInfo: OrderInfo): void {
        this.active = true;
        this.orderInfo = orderInfo;
        this.render();
    }

    static get instance(): ContactsModalView {
        if (this.inst == null) {
            this.inst = new ContactsModalView(document.getElementById("modal-contacts"));
        }

        return this.inst;
    }
}

class SuccessModalView extends Modal {
    private static inst: SuccessModalView;
    private active = false;
    private orderInfo: OrderInfo;

    private constructor(container: HTMLElement) {
        super(container);

        container.querySelector(".order-success__close").addEventListener("click", () => {
           this.active = false;
           this.render();
        });

        container.querySelector("#modal-success .modal__close").addEventListener("click", () => {
            this.active = false;
            this.render();
        });
    }

    render() {
        if (this.active) {
            this.container.classList.add("modal_active");
        } else {
            this.container.classList.remove("modal_active");
        }

        document.querySelector(".film__description").textContent = `Списано ${this.orderInfo.total} синапсов`;
    }

    show(orderInfo: OrderInfo): void {
        this.active = true;
        this.orderInfo = orderInfo;
        this.render();
    }

    static get instance(): SuccessModalView {
        if (this.inst == null) {
            this.inst = new SuccessModalView(document.getElementById("modal-success"));
        }

        return this.inst;
    }
}

export class CartView extends View {
    private itemsCount = 0;

    constructor(containerId: string) {
        super(document.getElementById(containerId));

        this.container.addEventListener('click', (event: MouseEvent) => {
            CartModalView.instance.show();
        })

        Cart.instance.on("cart-updated", (items: ICartItem[]) => {
            this.itemsCount = items.length;
            this.render();
        })
    }

    render(): void {
        const counter = document.querySelector(".header__basket-counter");
        counter.textContent = this.itemsCount.toString();
    }
}
