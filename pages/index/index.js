/* 插件写法wx-page，wx-功能名 */
import {getSwiper, getCatItems, getFloor} from "../../request/index"

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    catList: [],
    floorList: [],
  },
  
  onLoad: function(options) {
    // 自带的urllib，域名合法性临时做法勾选不校验合法性
    // 长远则需要把域名加入开发平台中的白名单，加入和修改次数有限
    getSwiper()
    .then(result => {
      let swiperList = result;
      swiperList.forEach(e => {/* 后端的路径不搭 */
        e.navigator_url = e.navigator_url.replace("main", "index")
      });
      this.setData({
        swiperList
      });
      
    });
    getCatItems()
    .then(result => {
      this.setData({
        catList: result
      });
    });
    getFloor()
    .then(result => {
      this.setData({
        floorList: result
      });
    })
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  