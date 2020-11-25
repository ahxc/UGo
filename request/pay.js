import {request} from "./request"
import regeneratorRuntime from "../lib/runtime/runtime"

function getOrders(params) {
  return request({url:'/api/public/v1/my/orders/create', data: params, method: "post"})
}

function getPay(params) {
  return request({url:'/api/public/v1/my/orders/req_unifiedorder', data: params, method: "post"})
}

function getCheckOrder(params, header) {
  return request({url: "/api/public/v1/my/orders/chkOrder", data: params, method: "post"})
}

export {
  getOrders, getPay, getCheckOrder,
}