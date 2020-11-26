Component({
  /**
   * 组件的属性列表
   */
  /* 类型要正确，不能用[]符号 */
  properties: {
    tabsList: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    cIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleIndex(e) {
      let cIndex = e.currentTarget.dataset.operation;
      this.triggerEvent("tabEvent", cIndex)
      this.setData({
        cIndex,
      });
    },
  }
})
