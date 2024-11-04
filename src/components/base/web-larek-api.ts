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

export class WebLarekApi {
	private _api: Api;

	constructor(apiClient: Api) {
		this._api = apiClient;
	}

	fetchAllProducts(): Promise<Product[]> {
		return this._api.get('/product').then(response => {
			return response as Product[];
		});
	}

	fetchProductById(id: string): Promise<Product> {
		return this._api.get(`/product/${id}`).then(response => response as Product);
	}

	createOrder(order: OrderInfo) {
		return this._api.post(`/order`, order);
	}
}
