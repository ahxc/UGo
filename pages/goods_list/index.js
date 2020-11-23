import {getGoodsList} from "../../request/goods_list"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: ["综合", "销量", "价格"],
    scrollTop: 0,
    queryParams: {
      query: "",
      cid: "",
      pagenum: 1,
      pagesize: 10,
    },
    goodsList: [],
    totalPage: 1,
  },

  async getGoodsList(params) {
    let g = await getGoodsList(params);
    let totalPage = Math.ceil(g.total/this.data.queryParams.pagesize)
    this.setData({/* 这里不用push防止goodsList两次赋值 */
      goodsList: [...this.data.goodsList, ...g.goods],/* push无法激活响应式 */
      totalPage
    });
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /* options传入页面的query参数 */
  onLoad: function (options) {
    this.data.queryParams.cid = options.cid;
    this.getGoodsList(this.data.queryParams);
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
    this.data.queryParams.pagenum = 1;
    this.setData({
      totalPage: 1,
      goodsList: []
    })
    this.getGoodsList(this.data.params)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /* 当页数的判断 */
    if(this.data.queryParams.pagenum<this.data.totalPage){
      this.data.queryParams.pagenum += 1;
      this.getGoodsList(this.data.queryParams);
    }
    else{
      wx.showToast({title: "已经到底了~"});
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})