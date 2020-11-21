import {request} from "./request"

export function getCategory() {
  return request({url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'})
}