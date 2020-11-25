import {openSetting, getSetting, chooseAddress, storage, showModal, showToast} from "../../utils/utils"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: {},
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
  },

  async handleAddress() {
    let r1 = await getSetting();
    let scopeAddress = r1.authSetting["scope.address"];/* 注意此处调用方式 */
    if(scopeAddress===false){
      /* scopeAddress为false，用户拒绝过授权，先诱导用户打开授权页面 */
      await openSetting();
    }
    let a = await chooseAddress();
    a.complete = a.provinceName+a.cityName+a.countyName+a.detailInfo
    this.setData({
      address: a,
    });
    storage.save("address", a);/* 将选择的地址存入缓存 */
  },

  handlePick(){
    let {cart} = this.data;
    this.data.allChecked = !this.data.allChecked;/* 这里checkbox没有双向绑定效果，得手动修改 */
    cart.forEach(v=>{v.goods_checked=this.data.allChecked});
    this.setData({
      cart,
    })
    storage.save("cart", cart);
  },

  handleChecked(e){
    let {cart} = this.data;
    let goods_id = e.currentTarget.dataset.operation;
    let i = cart.findIndex(v=>{return v.goods_id===goods_id});
    cart[i].goods_checked = !cart[i].goods_checked;
    storage.save("cart", cart);
  },

  async handlePay() {
    let {address, totalNum} = this.data;
    if(!totalNum){
      await showToast({title: "还没有选择任何商品", icon: "none"});
      return;/* 推出整个函数 */
    }
    if(!address.userName){
      await showToast({title: "还没有选择收货地址", icon: "none"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  },

  async handleItemNum(e){
    let {cart} = this.data;
    let goods_id = e.currentTarget.dataset.operation[0];
    let c = e.currentTarget.dataset.operation[1];
    let i = cart.findIndex(v=>{return v.goods_id===goods_id});
    if(cart[i].goods_num<=1 && c<0){
      let s = await showModal();/* 等待promise的确认结果 */
      if(s){
        cart.splice(i, 1);
      }
    }
    else{
      cart[i].goods_num+=c;
    }
    this.setData({
      cart
    })
    storage.save("cart", cart)
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
    let address = storage.fetch("address");
    let cart = storage.fetch("cart") || [];
    let allChecked = false;//cart.every(i=>i.goods_checked) && cart.length>0;/* 注意，every空数组直接返回true */
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.goods_checked){
        totalPrice+=v.goods_price*v.goods_num;
        totalNum+=v.goods_num;
      }
      else{
        allChecked=false;
      }
    })
    this.setData({
      address,
      cart,
      allChecked,
      totalPrice,
      totalNum,
    });
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