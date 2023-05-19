// https://api-js401.herokuapp.com/api/v1/products
// const axios  = require('axios');
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
  try{
    let result = await axios(config);
    console.log(result.data)
    return result.data
  }catch(e){
    console.error(e);
  }
}

export async function updateAndDelete(method, url, baseURL, model, id, data){
  const config = {
    url: url+model+id, 
    method: method,
    baseURL: baseURL,
    data: data
  }

  try{
    let result = await axios(config);
    console.log(result.data);
    return result.data
  }
  catch(e){
    console.error(e)
  }
}

// let data = {
//   "complete": false
// }

// https://api-js401.herokuapp.com/api/v1/todo/64333070abaac100142b0401

// updateAndDelete('put', '/api/v1', 'https://api-js401.herokuapp.com', '/todo', '/6466a2a350612000145474c1', data)
// updateAndDelete('delete', '/api/v1', 'https://api-js401.herokuapp.com', '/todo', '/6466ff1b50612000145476ef')


// let data = {
//   headers: {
//     username: 'Geat person12345',
//     password: 'testuser'
//   }
// }


// // https://api-js401.herokuapp.com/signup
// // post('/v1', 'https://api-js401.herokuapp.com/api', '/products', data)
// post('/signin', 'https://api-js401.herokuapp.com', data);
