import {Product} from "./Product"

export class ShoppingCart {
    private constructor(private _products: Product[]) {
    }

    public static createEmpty() {
        return new ShoppingCart([])
    }

    public static createWithProducts(products: Product[]) {
        return new ShoppingCart([...products])
    }

    get products() {
        return this._products.slice();
    }

    get itemCount() {
        return this._products.length
    }

    get firstItem() {
        return this._products[0]
    }

    get totalAmount() {
        return `${this._products.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)} EUR`
    }

    proceedToCheckout() {
        //noop?
    }

    addProducts(products: Product[]) {
        this._products.push(...products)
    }

    removeProduct(product: Product) {
        this._products = this._products.filter(value => JSON.stringify(value) !== JSON.stringify(product));
    }
}
