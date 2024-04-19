import axios from "axios";
import * as Config from "./../constants/Config";
export default function productCallApi(endpoint, method, body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/products/${endpoint}`,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
export function accountsCallApi(endpoint, method, body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/accounts/${endpoint}`,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
export function imageDeleteCallApi(body, endpoint) {
  return axios({
    method: "post",
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
export function billCallApi(endpoint, method, body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/bills/${endpoint}`,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
export function brandCallApi(endpoint, method, body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/brands/${endpoint}`,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}

// export function userCallApi(endpoint, method, body) {
//   return axios({
//     method: method,
//     url: `${Config.API_URL}/accounts/${endpoint}`,
//     data: body,
//   }).catch((error) => {
//     console.log(error);
//   });
// }
