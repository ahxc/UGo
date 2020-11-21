export function request(params) {
  return new Promise((resolve, reject)=>{
    wx.request({
      ...params,// 这里wx urllib的参数和axios形式axios(params)有点区别，而且wx.request似乎没有baseurl的概念
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}