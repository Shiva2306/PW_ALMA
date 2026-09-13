
import {test, expect} from '@playwright/test'

test('Get request', async({request})=>{

    let response =await request.get('https://gorest.co.in//public/v2/users/')

    let jsonbody= await response.json()
    console.log(jsonbody);

    console.log(response.status()); //200
    console.log(response.statusText()); //ok

   // expect(response.status()).toBe(200)

})