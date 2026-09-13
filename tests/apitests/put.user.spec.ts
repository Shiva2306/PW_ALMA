

import {test, expect} from '@playwright/test'

test('put request', async({request})=>{

   const Auth_token = {
        Authorization : 'Bearer be0b29c4a85932d115362fd89e3b0ce1fa77c3e81737f387fed162c0dbeac07f'
        //'Content-Type' : 'Application/json'
    }

    const userData = {
        name: 'Raj',
        email: `uday_${Date.now()}@gmail.com`,
        gender: 'male',
        status : 'inactive'
     }


    let response =await request.put('https://gorest.co.in//public/v2/users/8603774', {
         headers: Auth_token,
         data : userData
    })


    let jsonbody= await response.json()
    console.log(jsonbody);

    console.log(response.status()); //200
    console.log(response.statusText()); //ok

    expect(response.status()).toBe(200)

})