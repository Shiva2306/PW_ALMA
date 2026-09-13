
import {Locator, Page} from '@playwright/test'
import { RandomData } from '../utils/dataProvider';



//Local variables - variables are restricted to a particular method
//Class variables - variables are used throughout the class

export class RegistrationPage
{
    private firstname :Locator;
    private lastname : Locator;
    private email : Locator;
    private tele : Locator;
    private pass1 : Locator;
    private pass2 : Locator;
    private radio : Locator;
    private cb : Locator;
    private ct : Locator;
    private error : Locator;
    private success:Locator;




    public constructor(page:Page)
    {
     this.firstname = page.getByRole('textbox', {name:'First Name'})
     this.lastname=page.getByRole('textbox', {name:'Last Name'})
     this.email=page.getByRole('textbox', {name:'E-Mail'})
     this.tele=page.getByRole('textbox', {name:'Telephone'})
     this.pass1=page.getByLabel('Password', {exact: true})
     this.pass2=page.getByLabel('Password Confirm', {exact: true})
     this.radio=page.getByRole('radio', {name:'No'})
     this.cb= page.locator('//input[@type="checkbox"]')
     this.ct=page.getByRole('button', {name: 'Continue'})
     this.error=page.locator('div.alert')
     this.success=page.getByRole('heading', {name: 'Your Account Has Been Created!'})


    }

    public async registrationTask() :  Promise<void>
    {
       await this.firstname.fill(RandomData.getFirstName())
       await this.lastname.fill(RandomData.getLastName())
       await this.email.fill(RandomData.getEmail())
       await this.tele.fill(RandomData.getTelephone())
        const pass= RandomData.getpassword()

       await this.pass1.fill(pass) //abc123
       await this.pass2.fill(pass) //abc123
       await this.radio.click()
       await this.cb.click()
       await this.ct.click()



    }

    public async errorMessage() : Promise<boolean>
    {
      return await this.error.isVisible()  
    }

    public async successMessage() :  Promise<boolean>
    {
      return await this.success.isVisible()
    }
}