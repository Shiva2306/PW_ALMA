

//homePage 
//Every page will have 3 components 
//1) locators, action methods, constructor

//constructor - It is used initialize objects
//Constructor is a special methods

//Local variables - variables are restricted to a particular method
//Class variables - variables are used throughout the class

//private - varibles/methods will have access only within the class

//We go for Page object model design pattern to avoid code duplication and to avoid challenges faced when locator gets changed

import {Locator, Page} from '@playwright/test'

export class HomePage
{
    //variables are at a class level
    private myAccount : Locator;
    private register: Locator;
    private login:Locator;

   public constructor(page:Page)
   {
   this.myAccount=page.locator('//span[text()="My Account"]')
   this.register=page.locator('//a[text()="Register"]')
   this.login=page.locator('//a[text()="Login"]')

   }

   //Action methods
   public async forRegistration() :  Promise<void>
   {
      this.myAccount.click()
      this.register.click()
   }

   public async forLogin() :  Promise<void>
   {
      this.myAccount.click()
      this.login.click()
   }

   
}