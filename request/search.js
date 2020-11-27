import {request} from "./request"
import regeneratorRuntime from "../lib/runtime/runtime"

function getSearch(params) {
  return request({url:'/api/public/v1/goods/qsearch', data: params, method: "get"})
}

export{
  getSearch,
}