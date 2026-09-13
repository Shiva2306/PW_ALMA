# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: apitests\put.user.spec.ts >> put request
- Location: tests\apitests\put.user.spec.ts:5:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | 
  2  | 
  3  | import {test, expect} from '@playwright/test'
  4  | 
  5  | test('put request', async({request})=>{
  6  | 
  7  |    const Auth_token = {
  8  |         Authorization : 'Bearer be0b29c4a85932d115362fd89e3b0ce1fa77c3e81737f387fed162c0dbeac07f'
  9  |         //'Content-Type' : 'Application/json'
  10 |     }
  11 | 
  12 |     const userData = {
  13 |         name: 'Raj',
  14 |         email: `uday_${Date.now()}@gmail.com`,
  15 |         gender: 'male',
  16 |         status : 'inactive'
  17 |      }
  18 | 
  19 | 
  20 |     let response =await request.put('https://gorest.co.in//public/v2/users/8603774', {
  21 |          headers: Auth_token,
  22 |          data : userData
  23 |     })
  24 | 
  25 | 
  26 |     let jsonbody= await response.json()
  27 |     console.log(jsonbody);
  28 | 
  29 |     console.log(response.status()); //200
  30 |     console.log(response.statusText()); //ok
  31 | 
> 32 |     expect(response.status()).toBe(200)
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  33 | 
  34 | })
```