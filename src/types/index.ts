import { EventEmitter } from '../components/base/events';

export type ProductCategory = "софт-скилл" | "другое" | "дополнительное" | "кнопка" | "хард-скилл";

export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: ProductCategory;
	price: number;
}

export interface ICartItem {
	product: Product;
	quantity: number;
}

export class Cart extends EventEmitter {
	private static cart: Cart;

	private items: ICartItem[] = [];

	private constructor() {
		super();
	}

	addItem(product: Product): void {
		const cartItem: ICartItem = {
			product: product,
			quantity: 1
		};
		this.items.push(cartItem);
		this.emit('cart-updated', this.items);
	}

	removeItem(cartItem: ICartItem): void {
		this.items = this.items.filter(item => item !== cartItem);
		this.emit('cart-updated', this.items);
	}

	getItems(): ICartItem[] {
		return [...this.items];
	}

	clear() {
		this.items = [];
		this.emit('cart-updated', this.items);
	}

	static get instance(): Cart {
		if (this.cart == null) {
			this.cart = new Cart();
		}

		return this.cart;
	}
}
