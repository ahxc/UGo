const storage = {
  fetch: function(k) {
    return wx.getStorageSync(k);
  },
  save: function(k, v) {
    wx.setStorageSync(k, v);
  }
}

export {
  storage,
}
  