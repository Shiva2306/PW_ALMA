

import { Locator, Page } from '@playwright/test';
import { TestConfig } from '../test.config';

export class SearchPage {

    private searchtext: Locator;
    private searchbutton: Locator;
    private validatemessage:Locator;
    
   public constructor(page: Page)
    {
        this.searchtext=page.getByRole('textbox', {name:'Search'})
        this.searchbutton=page.locator('//button[@type="button"]//i[@class="fa fa-search"]')
        this.validatemessage=page.getByRole('heading', {name:'Search - macbook'})
    }


  public async searchProduct(): Promise<void> {

       await this.searchtext.fill(TestConfig.productName)
       await this.searchbutton.click()
    }

    public async validateSearch(): Promise<boolean> {

    return await this.validatemessage.isVisible();

    } 
   
}
