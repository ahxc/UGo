import {request} from "./request"
import regeneratorRuntime from "../lib/runtime/runtime"

function getToken(params) {
  return request({url:'/api/public/v1/users/wxlogin', data: params, method: "post"})
}

export {
  getToken,
}