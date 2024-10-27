import { EventEmitter } from '../components/base/events';

export interface IProduct {
	id: number;
	name: string;
	category: string;
	price: number;
	image: string;
	description: string;
}

export interface ICartItem {
	product: IProduct;
	quantity: number;
}

export class Product implements IProduct {
	constructor(
		public id: number,
		public name: string,
		public category: string,
		public price: number,
		public image: string,
		public description: string
	) {}

	static fromData(data: IProduct): Product {
		return new Product(
			data.id,
			data.name,
			data.category,
			data.price,
			data.image,
			data.description
		);
	}
}

export class Cart extends EventEmitter {
	private items: ICartItem[] = [];

	addItem(product: IProduct): void {
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
