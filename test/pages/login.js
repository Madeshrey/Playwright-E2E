import{expect}from '@playwright/test'
import {page} from '@playwright/test'
import { loginLocators,dataLocators } from '../input/locators/index'

export class Login{
    /** *@param {import('@playwright/test').page} page */
constructor(page){
    this.page=page
    this.username=page.locator(loginLocators.username)
    this.password=page.locator(loginLocators.password)
    this.loginButton=page.locator(loginLocators.loginButton)
    this.errorButton=page.locator(loginLocators.errorCloseBtn)
    this.errorSnackBar=page.locator(loginLocators.errorSnackBar)
}
async launchURL(){
    await this.page.goto('https://www.saucedemo.com/' )
}

async verifySignIn(){
     await expect(this.username).toBeVisible({timeout:10000})
     await expect(this.password).toBeVisible({timeout:10000})
     await expect(this.loginButton).toBeVisible({timeout:10000})
     await expect(this.loginButton).toBeEnabled()
    }
    
async verifyUsername(password){
    await this.username.fill('abcd')
    await this.password.fill(password)
    await this.loginButton.click()
    await expect(this.errorSnackBar).toContainText("Username and password do not match any user in this service")
    await this.errorButton.click()
    }

async signInMethod(username,password) {
    await this.username.clear()
    await this.password.clear()
    await this.username.fill(username)
    await this.password.fill(password)
    await this.loginButton.click()
}
}
