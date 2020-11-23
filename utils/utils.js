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

export {
  storage, openSetting, getSetting, chooseAddress,
}
  