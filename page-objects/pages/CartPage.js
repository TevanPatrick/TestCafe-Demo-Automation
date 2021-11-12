import { Selector, t} from "testcafe";

class CartPage {

    constructor()
    {
        this.remove_item = Selector('#remove-sauce-labs-bike-light')
    }

    async RemoveItem ()
    {
        await t.click(this.remove_item)
    }

}
export default new CartPage()