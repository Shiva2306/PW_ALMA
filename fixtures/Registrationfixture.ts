


import { test as base, expect } from "@playwright/test";

import {HomePage} from "../pages/homepage"
import { RegistrationPage } from "../pages/registrationPage";

type MyFixtures = {
    homePage: HomePage;
    registrationPage: RegistrationPage;
};

export const test = base.extend<MyFixtures>({

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    //use will return specific page to the test

    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    }

});

export { expect };
