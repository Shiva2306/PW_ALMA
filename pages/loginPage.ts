
import {Locator, Page} from '@playwright/test'
import { TestConfig } from '../test.config';

//Local variables are limited only to a specific method
//Class variables are used throughout the class(can be used in any method in a class)

//this keyword points towards an object(make the variable a class variable)

//private - only accessed within a class

export class LoginPage
{
   private email : Locator;
   private password: Locator;
   private loginbutton : Locator;
   private loginerror: Locator;
   private loginsuccess: Locator;

   //constructor is used to initialize(provide value) class variables
   //first local variable will be initialized, then we pass value to the class variable
   public constructor(page:Page)
    {
       this.email=page.locator('#input-email')
       this.password=page.locator('#input-password')
       this.loginbutton=page.locator('//input[@type="submit"]')
       this.loginerror=page.locator('div.alert')
       this.loginsuccess=page.locator('#content').getByRole('heading', { name: 'My Account' })

    }

    public async logintask(app: string, pass: string) : Promise<void>
    {
    await this.email.fill(app)
    await this.password.fill(pass)
    await this.loginbutton.click()
    }

    public async errorvalidation() :  Promise<boolean>
    {
     return await this.loginerror.isVisible()  
    }

     public async successvalidation(): Promise<boolean> {

        return await this.loginsuccess.isVisible();
    }
}  

    