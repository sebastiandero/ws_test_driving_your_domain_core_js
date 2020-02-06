import {ShoppingCart} from "./domain/ShoppingCart"
import {Product} from "./domain/Product"

describe('Shopping Cart:', () => {
    it('should not fail', () => {
        expect(true).toBe(true)
    })

    describe('remove from cart', () => {
        it('should remove a product from cart', () => {
            const cart = ShoppingCart.createEmpty()
            let product = Product.withName('123')
            cart.addProducts([
                Product.withName('The best name'),
                Product.withName('abc'),
                product,
            ])

            cart.removeProduct(Product.withName('123'));

            expect(cart.products).not.toContain(product);
        })
    });

    describe('itemCount', () => {
        it('should return the correct count', () => {
            const cart = ShoppingCart.createWithProducts([Product.withName('123')])
            expect(cart.itemCount).toBe(1);
        })
    });

    describe('firstItem', () => {
        it('should return the first item', () => {
            const cart = ShoppingCart.createWithProducts([Product.withName('123'), Product.withName('abc')])
            expect(cart.firstItem.name).toBe('123');
        })
    });
    describe('totalAmount', () => {
        it('should return sum of all numbers', () => {
            const cart = ShoppingCart.createWithProducts([Product.withNameAndPrice('123', '123.5 EUR'), Product.withNameAndPrice('abc', '123 EUR')])
            expect(cart.totalAmount).toBe(123.5 + 123);
        })
    });
})
