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
     }

     async verifyProductPage(){
        await expect(this.logo).toBeVisible({timeout:10000})
        await expect(this.menuButton).toBeVisible({timeout:10000})
        await expect(this.filterButton).toBeVisible({timeout:10000})
        await expect(this.addCartIcon).toBeVisible({timeout:10000})
        await expect(this.addToCart).toBeVisible({timeout:10000})
        await expect(this.inventoryList).toBeVisible({timeout:10000})
     }
}