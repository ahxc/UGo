import {request} from "./request"
import regeneratorRuntime from "../lib/runtime/runtime"

function getGoodsDetail(params) {
  return request({url:'/api/public/v1/goods/detail', data:params})
}

export {
  getGoodsDetail,
}