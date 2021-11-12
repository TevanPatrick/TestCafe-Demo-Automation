import {Selector, t} from 'testcafe'

class InventoryPage {

    constructor()
    {
        this.add_item_button = Selector('#add-to-cart-sauce-labs-bike-light')
        this.shopping_cart_link = Selector('.shopping_cart_link')
    }

    async addItemToCart()
    {
        await t.click(this.add_item_button)
    }

    async viewCartButton()
    {
        await t.click(this.shopping_cart_link)
    }


}
export default new InventoryPage()