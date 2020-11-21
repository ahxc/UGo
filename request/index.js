import {request} from "./request"

export function getSwiper() {
  return request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
}

export function getCatItems() {
  return request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
}

export function getFloor() {
  return request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
}