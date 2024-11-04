import { EventEmitter } from '../components/base/events';

export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface ICartItem {
	product: Product;
	quantity: number;
}

export class Cart extends EventEmitter {
	private items: ICartItem[] = [];

	addItem(product: Product): void {
		const cartItem: ICartItem = {
			product: product,
			quantity: 1
		};
		this.items.push(cartItem);
		this.emit('itemAdded', cartItem);
		this.emit('changed', this.items);
	}


	removeItem(index: number): void {
		if (index >= 0 && index < this.items.length) {
			const removed = this.items.splice(index, 1)[0];
			this.emit('itemRemoved', removed);
			this.emit('changed', this.items);
		}
	}

	getItems(): ICartItem[] {
		return [...this.items];
	}

	getTotal(): number {
		return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
	}

	clear(): void {
		this.items = [];
		this.emit('cleared');
		this.emit('changed', this.items);
	}
}
