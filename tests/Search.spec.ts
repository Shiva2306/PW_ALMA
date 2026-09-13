


import {expect, test} from '@playwright/test'
import { SearchPage } from '../pages/searchPage'
import '../hooks/CommonHooks'


test('Search test @sanity @regression', async({page})=>{

    //static variables can be accessed directly from the class

   let sp= new SearchPage(page)
   await sp.searchProduct()

  let vs= await sp.validateSearch()
  expect(vs).toBeTruthy()

   


})