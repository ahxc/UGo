import {request} from "./request"
import regeneratorRuntime from "../lib/runtime/runtime"

function getOrders(params) {
  return request({url:'/api/public/v1/my/orders/all', data: params, method: "get"})
}

export {
  getOrders,
}