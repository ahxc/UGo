import { storage } from "../utils/utils";

const baseUrl = 'https://api-hmugo-web.itheima.net';

/* 1.记录单个页面异步请求的总次数，异步中有一个关闭动画那加载中的所有动画
都会消失 */
var r = 0;
function request(params) {
  /* 每一次次异步请求显示加载界面 */
  wx.showLoading({
    title: "加载中...",
  });
  r+=1;/* 2.每一个请求都使r+1 */

  const header = {...params.header}/* 1获取参数中的请求头 */
  if(params.url.includes("/my/")){/* 2如果是私有路径请求，获取缓存中的token */
    header["Authorization"] = storage.fetch("token");
  }
    
  return new Promise((resolve, reject)=>{
    wx.request({
      ...params,// 这里wx urllib的参数和axios形式axios(params)有点区别，而且wx.request似乎没有baseurl的概念
      header: header,/* 3加入参数中 */
      url: baseUrl+params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: ()=>{
        /* 3.每次请求结束，使r-1 */
        r-=1;
        if(r===0){/* 所有请求都结束，再关闭请求中动画 */
          wx.hideLoading();
        }
      }
    });
  })
}

export {
  request
}