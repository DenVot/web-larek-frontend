import './scss/styles.scss';
import { Api } from './components/base/api';
import { WebLarekClient } from './components/base/web-larek-client';
import { ProductsView } from './components/ui/ProductsView';
import { CartView } from './components/ui/CartView';

const webLarekClient = new WebLarekClient(new Api(process.env.API_ORIGIN));
const productsView = new ProductsView("gallery");

new CartView("basket-but");

webLarekClient.fetchAllProducts().then(products => {
	for (const product of products) {
		productsView.appendProduct(product);
	}

	productsView.render();
})
