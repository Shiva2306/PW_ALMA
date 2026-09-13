


import {test, expect} from '@playwright/test'

test('Delete request', async({request})=>{

    
   const Auth_token = {
        Authorization : 'Bearer be0b29c4a85932d115362fd89e3b0ce1fa77c3e81737f387fed162c0dbeac07f'
        //'Content-Type' : 'Application/json'
    }

    let response =await request.delete('https://gorest.co.in//public/v2/users/8603774',
        {
            headers : Auth_token,
        }
    )

    console.log(response.status());  //204
    console.log(response.statusText()); //No content

    //expect(response.status()).toBe(204)

})