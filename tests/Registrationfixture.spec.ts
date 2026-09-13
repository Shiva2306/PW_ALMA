



import '../hooks/CommonHooks'
import { test, expect } from "../fixtures/Registrationfixture";



test('Registration fixture test @regression @master', async({homePage, registrationPage})=>{


   //created an object of homepage to call its action method
    await homePage.forRegistration()

    //create an object of Registration page and call the action method
    await registrationPage.registrationTask()

    // let validateerror=await rp.errorMessage()

    // expect.soft(validateerror).toBeTruthy()
   
    let validatesuccess=await registrationPage.successMessage()
    expect(validatesuccess).toBeTruthy()



    //await page.waitForTimeout(5000)





})