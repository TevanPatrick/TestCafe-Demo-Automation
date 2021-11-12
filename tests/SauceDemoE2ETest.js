import { Selector } from "testcafe";
import LoginPage from '../page-objects/pages/LoginPage'
import InventoryPage from '../page-objects/pages/InventoryPage'
import CartPage from '../page-objects/pages/CartPage'


// prettier-ignore
fixture `testcafe demo`
    .page`https://www.saucedemo.com/`

    // Test Hooks
    .before(async t => {
        // Test setup goes here
        // await runDatabaseReset()
        // await seedTestData()
        
    })
    .beforeEach(async t => {
        // Runs before each test
        await t.setTestSpeed(1)
        await t.setPageLoadTimeout(5) // Helps load mutiple test pages as well
    })
    .after(async t => {
        // Cleaning test data
        // Logging and sending data to monitoring systems 
    })
    .afterEach(async t => {
        // Runs after each test
        //await t.setTestSpeed(1)
        //await t.setPageLoadTimeout(5) // Helps load mutiple test pages as well
    })

test('Login using valid user credentials', async t=> {

    await LoginPage.enterValidUsername('standard_user')
    await LoginPage.enterPassword('secret_sauce')
    await LoginPage.clickLoginButton()

    await t.expect(Selector('#menu_button_container').exists).ok()

})

test('Login using invalid user credentials', async t=> {

    await LoginPage.enterValidUsername('locked_out_user')
    await LoginPage.enterPassword('secret_sauce')
    await LoginPage.clickLoginButton()
    
    const error = Selector('#login_button_container').innerText
    await t.expect(error).contains('Epic sadface: Sorry, this user has been locked out.')

})

test('Add item to cart', async t=> {

    await LoginPage.enterValidUsername('standard_user')
    await LoginPage.enterPassword('secret_sauce')
    await LoginPage.clickLoginButton()

    await InventoryPage.addItemToCart()
    await InventoryPage.viewCartButton()

    const cart_product_descrip = Selector('.inventory_item_name').innerText
    const cart_product_qty = Selector('.cart_quantity').innerText
    const cart_product_price = Selector('.inventory_item_price').innerText

    await t.expect(cart_product_descrip).contains('Sauce Labs Bike Light')
    await t.expect(cart_product_qty).contains('1')
    await t.expect(cart_product_price).contains('$9.99')

})

test('Remove item from cart', async t=> {

    await LoginPage.enterValidUsername('standard_user')
    await LoginPage.enterPassword('secret_sauce')
    await LoginPage.clickLoginButton()

    await InventoryPage.addItemToCart()
    await InventoryPage.viewCartButton()

    await CartPage.RemoveItem()

    const inventory_item = Selector('.cart_list').innerText
    await t.expect(inventory_item).notContains('cart_product_descrip')

})


