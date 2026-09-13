


import { HomePage } from '../pages/homepage';
import { test, expect } from '@playwright/test';
import { Dataprovider1 } from '../utils/ReadData';
import { LoginPage2 } from '../pages/loginPage2';
import '../hooks/CommonHooks'



// Load JSON test data
const jsonPath = "testData/loginData.json";

const testData = Dataprovider1.getTestDataFromJson(jsonPath);

// Data-driven testing
for (const data of testData) {

    test(
        `Login Test with JSON Data: ${data.testName} @datadriven1 @master`,
        async ({ page }) => {


            // Create HomePage object
            const hp = new HomePage(page);

            // Navigate to Login page
            await hp.forLogin();

            // Create LoginPage object
            const lp = new LoginPage2(page);

            // Perform login using JSON data
            await lp.logintask(
                data.email,
                data.password
            );

            // Wait for page/network activity
            await page.waitForLoadState('networkidle');

            // Validate login result
            if (data.expected.toLowerCase() === 'success') {

                const successMessage=await lp.successvalidation()

               expect(successMessage).toBeTruthy()


            } else {

                const errorMessage = await lp.errorvalidation();

                expect(errorMessage).toBeTruthy();
            }
        }
    );
}

