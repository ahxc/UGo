const baseUrl = 'https://api-hmugo-web.itheima.net';

/* 1.记录单个页面异步请求的总次数 */
var r = 0;
function request(params) {
  /* 每一次次异步请求显示加载界面 */
  wx.showLoading({
    title: "加载中...",
  });
  r+=1;/* 2.每一个请求都使r+1 */
    
  return new Promise((resolve, reject)=>{
    wx.request({
      ...params,// 这里wx urllib的参数和axios形式axios(params)有点区别，而且wx.request似乎没有baseurl的概念
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
        if(r===0){/* 所有请求完毕，关闭请求中动画 */
          wx.hideLoading();
        }
      }
    });
  })
}

export {
  request
}