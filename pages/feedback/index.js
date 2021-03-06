import {showToast} from "../../utils/utils"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: ["体验问题", "商家投诉", "意见和建议"],
    textVal: "",
    chooseImgList: [],
    UpLoadImgs: [],
  },

  handleTextInput(e){
    this.setData({
      textVal: e.detail.value
    })
  },

  handleFormSubmit(){
    const {textVal, chooseImgList} = this.data;
    if(!textVal.trim()){
      showToast({title: "意见不能为空！", icon: "none", mask: true})
      return;
    }

    /* 显示正在上传动画 */
    wx.showLoading({
      title: "信息上传中...",
      mask: true,
    });

    if(chooseImgList.length != 0){
      chooseImgList.forEach((v, i) => {
        wx.uploadFile({
          url: '',/* 上传路径，注意这里是单个文件 */
          filePath: v,/* 上传文件的路径 */
          name: "file",/* 上传文件的名称 */
          formData: {},/* 顺带的文本信息 */
          success: (result) => {
            let url = JSON.parse(result.data).url;
            this.data.UpLoadImgs.push(url);
            if(i==chooseImgList.length-1){/* 索引到达了最后一张图片 */
              wx.hideLoading();/* 关闭加载中动画 */
              this.setData({/* 重置页面 */
                textval: "",
                chooseImgList: [],
              })
              wx.navigateBack({
                delta: 1
              });
            }
          },
          fail: () => {},
          complete: () => {}
        });
      })
    }
    else{/* 图片list为0只上传了文本 */
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
    }
  },

  handleTab(i){
    // console.log(i.detail);// 子组件的数据流存在detail中
    let index = i.detail+1;
    if(index<=3){
      console.log(index)
    }
  },

  handleImg(e){
    const {index} = e.currentTarget.dataset;
    let chooseImgList = this.data.chooseImgList;
    chooseImgList.splice(index, 1);/* 从list中删除图片 */
    this.setData({
      chooseImgList,
    })
  },

  handleChooseImg(){
    wx.chooseImage({
      count: 9,/* 最多选择多少张 */
      sizeType: ['original', 'compressed'],/* 格式，原图，压缩 */
      sourceType: ['album', 'camera'],/* 图片来源相册，相机 */
      success: (res) => {
        this.setData({
          chooseImgList: [...this.data.chooseImgList, ...res.tempFilePaths],/* 多次添加则展开合并 */
        })
      },
    });
      
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