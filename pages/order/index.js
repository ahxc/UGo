import {getOrders} from "../../request/order"
import {storage} from "../../utils/utils"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: ["全部订单", "待付款", "代发货", "退款"],
    orders: [
      {
        "order_id": 428,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": new Date(1564731518*1000).toLocaleString(),
        "update_time": 1564731518,
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      }
    ],
  },

  async getOrders(type){
    let res = await getOrders(type);
    return res.orders
  },

  handleTab(i){
    // console.log(i.detail);// 子组件的数据流存在detail中
    let index = i.detail+1;
    if(index<=3){
      let orders = this.getOrders({type: index})
      this.setData({
        orders,
      })
    }
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
    const token = storage.fetch("token");
    if(!token){/* 没有token先拉取授权页面 */
      wx.navigateTo({
        url: '/pages/auth/index',
        success: (result) => {
        },
      });
      return;
    }
    /* 浏览的页面列表，最后索引即当前页面 */
    /* let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];// 当前显示的页面
    let orders = this.getOrders(currentPage.options);// 获取传过来的{type: 1}
    this.setData({
      orders,
    }) */
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