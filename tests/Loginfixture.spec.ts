


import { test, expect } from "../fixtures/Loginfixture";
import "../hooks/CommonHooks";

test("Login fixture test @regression @master", async ({ homePage, loginPage }) => {

    // Navigate to Login page
    await homePage.forLogin();

    // Enter invalid credentials and click Login
    await loginPage.logintask(process.env.APPUSERNAME!, process.env.PASSWORD!);

     const successMessage=await loginPage.successvalidation()

     expect(successMessage).toBeFalsy()
});

