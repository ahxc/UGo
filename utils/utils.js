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

function timestampToDetail(timestamp) {
  let r_date = new Date(timestamp * 1000);
  let ry = r_date.getFullYear();
  let rm = r_date.getMonth()+1;
  let rd = r_date.getDate();
  let rh = r_date.getHours();
  let rmi = r_date.getMinutes();
  let rsec = r_date.getSeconds();

  if (rm<10) {rm = '0'+rm}
  if (rd<10) {rd = '0'+rd}
  if (rh<10) {rh = '0'+rh}
  if (rmi<10) {rmi = '0'+rmi}
  if (rsec<10) {rsec = '0'+rsec}

  return ry+"-"+rm+"-"+rd+" "+rh+":"+rmi+":"+rsec
}

export {
  storage, openSetting, getSetting, chooseAddress, showModal, showToast,
  login, requestPayment
}