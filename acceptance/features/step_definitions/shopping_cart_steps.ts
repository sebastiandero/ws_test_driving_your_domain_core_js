import {
    Given,
    TableDefinition,
    Then,
    When
} from 'cucumber'
import {Product} from "../../../src/domain/Product"
import {ShoppingCart} from "../../../src/domain/ShoppingCart"
import expect from 'expect';

function rowToProduct(columns: string[]) {
    return Product.createWith(columns[0], columns[1], columns[2], columns[3])
}

function getProductsFromTable(table: TableDefinition) {
    return table.rows().map(rowToProduct)
}


Given(/^the following available products:$/, function (table: TableDefinition) {
    this.product = getProductsFromTable(table)
})
Given(/^the empty shopping cart$/, function () {
    this.shoppingCart = ShoppingCart.createEmpty()
})
Given(/^the shopping cart contains the following items:$/, function (table: TableDefinition) {
    this.shoppingCart = ShoppingCart.createWithProducts(getProductsFromTable(table))
})
When(/^I add the following item:$/, function (table: TableDefinition) {
    this.shoppingCart.addProducts(getProductsFromTable(table))
})
When(/^I remove the following item:$/, function (table: TableDefinition) {
    this.shoppingCart.removeProduct(getProductsFromTable(table)[0])
})
When(/^I proceed to check out$/, function () {
    this.shoppingCart.proceedToCheckout();
})
Then(/^the shopping cart is empty$/, function () {
    expect(this.shoppingCart.products.length).toBe(0)
})
Then(/^the shopping cart contains (\d+) item$/, function (count: number) {
    expect(this.shoppingCart.itemCount).toBe(count)
})
Then(/^the first item is "([^"]*)"$/, function (itemName: string) {
    expect(this.shoppingCart.firstItem.name).toBe(itemName)
})
Then(/^the following order with a total amount due of ([^"]*) is created:$/, function (price: string, table: TableDefinition) {
    expect(this.shoppingCart.totalAmount + " EUR").toBe(price)
})
