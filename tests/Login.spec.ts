


import {expect, test} from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { LoginPage } from '../pages/loginPage';
import '../hooks/CommonHooks'


test('Login test @priority @master', async({page})=>{

    //static variables can be accessed directky from the class

   //create an object of homepage to call its action method
    let hp= new HomePage(page)
    await hp.forLogin()

    //create an object of Registration page and call the action method
    let rp= new LoginPage(page)
    await rp.logintask(process.env.APPUSERNAME!, process.env.PASSWORD!)

     const successMessage=await rp.successvalidation()

     expect(successMessage).toBeTruthy()
   
    await page.waitForTimeout(5000)


})