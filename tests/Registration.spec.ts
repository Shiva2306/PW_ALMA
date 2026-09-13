
import {expect, test} from '@playwright/test'
import { HomePage } from '../pages/homepage'
import { RegistrationPage } from '../pages/registrationPage'
import '../hooks/CommonHooks'


test('Registration test @sanity @master', async({page})=>{


   //created an object of homepage to call its action method
    let hp= new HomePage(page)
    await hp.forRegistration()

    //create an object of Registration page and call the action method
    let rp= new RegistrationPage(page)
    await rp.registrationTask()

    // let validateerror=await rp.errorMessage()

    // expect.soft(validateerror).toBeTruthy()
   
    let validatesuccess=await rp.successMessage()
    expect(validatesuccess).toBeTruthy()



    await page.waitForTimeout(5000)





})