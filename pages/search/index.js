import {getSearch} from "../../request/search"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    btnHidden: true,
    inpValue: "",
  },
  timer: -1,

  async getSearch(query){
    let goods = await getSearch(query);
    this.setData({
      goods,
    })
  },

  btnCancel(){
    this.setData({
      inpValue: "",
      btnHidden: true,
      goods: [],
    });
    clearTimeout(this.timer)
  },

  handleInput(e){
    let {value} = e.detail;
    if(!value.trim()){
      this.setData({
        btnHidden: true,
        goods: [],
      });
      clearTimeout(this.timer);/* 防止异步删除文本框后还是会有goods */
      return;/* 空值不合法不实时发送请求 */
    }
    this.setData({
      btnHidden: false,
    })
    /* 防抖 */
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getSearch({query: value})
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})