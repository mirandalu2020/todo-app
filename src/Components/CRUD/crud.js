// https://api-js401.herokuapp.com/api/v1/products
import { Buffer } from "buffer";
import axios from 'axios';
window.Buffer = window.Buffer || Buffer;


export async function get(url, baseURL, model, id='') {
  const config = {
    url: url+model+id,
    method: 'get', 
    baseURL: baseURL,
  }

  let result = await axios(config);
  console.log(result.data)
  return result.data
}

export async function post(url, baseURL, data, model='') {

  /*===================================================================================
  //data must contain a "header" attribute if the user is trying to signin
    let data = {
      headers: {
        username: 'Geat person12345',
        password: 'testuser'
      }
}=======================================================================================
  */
 let token = '';
 if(data.headers){
   token = Buffer.from(`${data.headers.username}:${data.headers.password}`, 'utf8').toString('base64')
 }
  const config = {
    url: url+model,
    method: 'post', 
    baseURL: baseURL,
    data: data,
    headers: { Authorization: `Basic ${token}`}
  }

  let result = await axios(config);
  console.log(result.data)
  return result.data
}

// let data = {
//   headers: {
//     username: 'Geat person12345',
//     password: 'testuser'
//   }
// }


// // https://api-js401.herokuapp.com/signup
// // post('/v1', 'https://api-js401.herokuapp.com/api', '/products', data)
// post('/signin', 'https://api-js401.herokuapp.com', data);
