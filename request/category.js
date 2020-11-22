import {request} from "./request"
import regeneratorRuntime from "../lib/runtime/runtime"

function getCategory() {
  return request({url:'/api/public/v1/categories'})
}

export {
  getCategory,
}