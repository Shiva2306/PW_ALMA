

import { Locator, Page } from '@playwright/test';

export class LoginPage2 {

    private email: Locator;
    private password: Locator;
    private loginbutton: Locator;
    private loginerror: Locator;
    private loginsuccess: Locator;

    public constructor(page: Page) {

        this.email = page.locator('#input-email');
        this.password = page.locator('#input-password');
        this.loginbutton = page.locator('//input[@type="submit"]');
        this.loginerror = page.locator('div.alert');
        this.loginsuccess=page.locator('#content').getByRole('heading', { name: 'My Account' })
    }

    public async logintask(email: string, password: string): Promise<void> {

        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginbutton.click();
    }

    public async errorvalidation(): Promise<boolean> {

        return await this.loginerror.isVisible();
    }

    public async successvalidation(): Promise<boolean> {

        return await this.loginsuccess.isVisible();
    }
}
