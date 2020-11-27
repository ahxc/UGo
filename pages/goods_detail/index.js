import {getGoodsDetail} from "../../request/goods_detail"
import {storage, showToast} from "../../utils/utils"
import {GoodsInfoC} from "../../utils/constractor"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: Object,
    isCollect: false,
  },

  async getGoodsDetail(params) {
    let goods = await getGoodsDetail(params);
    /* introduce内的富文本包含webP格式的图片，部分苹果手机不识别，
    最好先联系后台让其修改，临时用正则 */
    goods.goods_introduce.replace(/\.webp/g, '.jpg');
    let collect = storage.fetch("collect") || [];
    let isCollect = false;
    if(collect.length===0){/* 为空防止读属性出错 */
      isCollect = false
    }
    else{
      isCollect = collect.some(v => v.goods_id===this.data.goods.goods_id);
    }
    this.setData({
      goods,
      isCollect,
    });
  },

  handleCollect(){
    /* 获取缓存中的收藏数组 */
    let collect = storage.fetch("collect") || [];
    if(collect.length===0){
      collect.push(this.data.goods);
      this.setData({
        isCollect: true,
      })
      storage.save("collect", collect);
      return;
    }
    let index = collect.findIndex(v => v.goods_id===this.data.goods.goods_id);
    if(index!==-1){
      collect.splice(index, 1);
      this.setData({
        isCollect: false,
      })
    }
    else{
      collect.push(this.data.goods);
      this.setData({
        isCollect: true,
      })
    }
    storage.save("collect", collect);
  },

  handlePreview(e){
    let index = e.currentTarget.dataset.operation
    /* 全屏图片预览并可进行分享和保存：1.先构造要预览的图片数组 */
    let urls = this.data.goods.pics.map(v=>v.pics_mid);
    /* 2.加入预览函数，点击则调用整个预览列表，设置索引，从点击的位置开始预览 */
    wx.previewImage({
      current: urls[index],
      urls
    });
  },

  handleAddCart() {
    let cart = storage.fetch("cart") || [];
    let index = cart.findIndex(
      v=>{return v.goods_id===this.data.goods.goods_id}
    );
    if(index===-1){/* 不存在于购物车 */
      let g = new GoodsInfoC(this.data.goods);
      g.goods_checked = true;
      cart.push(g);
    }
    else{
      cart[index].goods_num+=1;
    }
    storage.save("cart", cart);
    wx.showToast({
      title: '已加入购物车~',
      icon: 'success',
      duration: 1500,/* 防抖间隔 */
      mask: true,/* 防抖，1.5秒后才能再次show */
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getGoodsDetail(options)
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
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];    
    let options = currentPage.options;
    const {goods_id} = options;
    this.getGoodsDetail({goods_id});
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