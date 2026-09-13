


import {test, expect} from '@playwright/test'

test('post request', async({request})=>{

   const Auth_token = {
        Authorization : 'Bearer be0b29c4a85932d115362fd89e3b0ce1fa77c3e81737f387fed162c0dbeac07f'
        //'Content-Type' : 'Application/json'
    }

    const userData = {
        name: 'uday',
        email: `uday_${Date.now()}@gmail.com`,
        gender: 'male',
        status : 'active'
     }


    let response =await request.post('https://gorest.co.in//public/v2/users', {
         headers: Auth_token,
         data : userData
    })


    let jsonbody= await response.json()
    console.log(jsonbody);

    console.log(response.status()); //201
    console.log(response.statusText()); //created

    expect(response.status()).toBe(201)

})