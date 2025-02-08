import { productLocators } from "../input/locators";
import{expect}from '@playwright/test'

export class Product{
     /** *@param {import('@playwright/test').page}page */
     constructor(page){
        this.page=page
        this.logo=this.page.locator(productLocators.logo)
        this.menuButton=this.page.locator(productLocators.menuButton)
        this.filterButton=this.page.locator(productLocators.filterButton)
        this.addCartIcon=this.page.locator(productLocators.addCartIcon)
        this.addToCart=this.page.locator(productLocators.addToCart).first()
        this.itemPrice=this.page.locator(productLocators.itemPrice)
        this.inventoryList=this.page.locator(productLocators.inventoryList)
        this.dropdown=this.page.locator(productLocators.filterDropdown)
        this.productName=this.page.locator(productLocators.productName)
        this.shoppingBadge=this.page.locator(productLocators.shoppingBadge)
        this.removeButton=this.page.locator(productLocators.removeButton)
        this.continueShopping=this.page.locator(productLocators.continueShopping)
        this.checkoutBtn=this.page.locator(productLocators.checkout)
        this.firstName=this.page.locator(productLocators.firstName)
        this.lastName=this.page.locator(productLocators.lastName)
        this.postalCode=this.page.locator(productLocators.postalCode)
        this.continueBtn=this.page.locator(productLocators.continueBtn)
        this.cancelBtn=this.page.locator(productLocators.cancelBtn)
        this.logout=this.page.locator(productLocators.logout)
      }

     async verifyProductPage(){
        await expect(this.logo).toBeVisible({timeout:10000})
        await expect(this.menuButton).toBeVisible({timeout:10000})
        await expect(this.filterButton).toBeVisible({timeout:10000})
        await expect(this.addCartIcon).toBeVisible({timeout:10000})
        await expect(this.addToCart).toBeVisible({timeout:10000})
        await expect(this.inventoryList).toBeVisible({timeout:10000})
     }

     async filterProduct(){
      await this.filterButton.click()
      await this.page.keyboard.press('Enter')
      await this.addToCart.click() 
      await expect(this.removeButton).toBeVisible()
      await expect(this.shoppingBadge).toHaveText('1')
     }

     async removeAndProduct(){
      await this.removeButton.click()
      await this.addToCart.click() 
      await this.addCartIcon.click()
     }

     async checkoutProduct(){
      await expect(this.continueShopping).toBeVisible()
      await expect(this.checkoutBtn).toBeVisible()
      await this.checkoutBtn.click()
     }

     async checkoutInfo(firstname,lastname,postalcode){
      await expect(this.firstName).toBeVisible()
      await expect(this.lastName).toBeVisible()
      await expect(this.postalCode).toBeVisible()
      await this.firstName.fill(firstname)
      await this.lastName.fill(lastname)
      await this.postalCode.fill(postalcode)
      await expect(this.continueBtn).toBeVisible()
      await expect(this.cancelBtn).toBeVisible()
      await this.continueBtn.click()
     }

     async logout(){
      await this.menuButton.click()
      await this.logout.click()
      await this.page.waitForTimeout(10000)
     }
}