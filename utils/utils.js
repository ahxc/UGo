const storage = {
  fetch: function(k) {
    return wx.getStorageSync(k);
  },
  save: function(k, v) {
    wx.setStorageSync(k, v);
  }
}

function getSetting() {
  return new Promise((resolve, reject)=>{
    wx.getSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      },
    });
  })
}

function showToast(params){
  return new Promise((resolve, reject) => {
    wx.showToast({
      ...params,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
      
  })
}

function chooseAddress() {
  return new Promise((resolve, reject)=>{
    wx.chooseAddress({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}

function openSetting() {
  return new Promise((resolve, reject)=>{
    wx.openSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) =>{
        reject(err);
      }
    });
  })
}

function showModal() {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: '从购物车中删除这件商品？',
      success: (res) => {
        resolve(res.confirm);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    });
      
  })
}

function requestPayment(params) {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...params,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
      
      
  })
}

export {
  storage, openSetting, getSetting, chooseAddress, showModal, showToast,
  login, requestPayment
}