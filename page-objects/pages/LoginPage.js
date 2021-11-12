import {Selector, t} from 'testcafe'

class LoginPage {

    constructor()
    {
        this.username = Selector('#user-name')
        this.password = Selector('#password')
        this.loginButton = Selector('#login-button')
    }

    async enterValidUsername(name)
    {
        await t.typeText(this.username, name) 
        return name
    }

    async enterPassword(inputPassword)
    {
        await t.typeText(this.password, inputPassword)
        return inputPassword
    }

    async clickLoginButton()
    {
        await t.click(this.loginButton)
    }
}
export default new LoginPage()