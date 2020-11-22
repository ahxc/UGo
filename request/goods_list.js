import {request} from "./request"
import regeneratorRuntime from "../lib/runtime/runtime"


function getGoodsList(params) {
  return request({url:'/api/public/v1/goods/search', data:params})
}

export {
  getGoodsList,
}