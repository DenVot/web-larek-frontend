import { Api } from './api';
import { Product } from '../../types';

export type PayMethods = "online" | "offline";

export interface OrderInfo {
	payment: PayMethods;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

interface ProductsResponse {
	items: Product[]
}

export class WebLarekClient {
	private api: Api;

	constructor(apiClient: Api) {
		this.api = apiClient;
	}

	fetchAllProducts(): Promise<Product[]> {
		return this.api.get('/product').then(response => {
			return (response as ProductsResponse).items;
		});
	}

	fetchProductById(id: string): Promise<Product> {
		return this.api.get(`/product/${id}`).then(response => response as Product);
	}

	createOrder(order: OrderInfo) {
		return this.api.post(`/order`, order);
	}
}
