
//inbuilt fixtures - page, browser, request

//custom fixture - Framework, applied on page objects - {homepage, loginPage}


//fixtures 

//1) inbuilt fixture - page, browser, request, expect 
//2) custom fixture - loginPage, homePage, regPage

//custom fixture - will actually help me to avoid repetition of codes


import { test as base, expect } from "@playwright/test";

import {HomePage} from "../pages/homepage"
import {LoginPage} from "../pages/loginPage"

type MyFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    //use will return specific page to the test

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }

});

export { expect };
