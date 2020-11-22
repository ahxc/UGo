import {request} from "./request"

function getSwiper() {
  return request({url:'/api/public/v1/home/swiperdata'})
}

function getCatItems() {
  return request({url:'/api/public/v1/home/catitems'})
}

function getFloor() {
  return request({url:'/api/public/v1/home/floordata'})
}

export {
  getSwiper, getCatItems, getFloor
}