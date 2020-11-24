class GoodsInfoC{
  constructor(obj){
    this.goods_id = obj.goods_id;
    this.goods_name = obj.goods_name;
    this.goods_price = obj.goods_price;
    this.goods_small_logo = obj.goods_small_logo;
    this.goods_num = 1;
    this.goods_checked = true;
  }
}

export {
  GoodsInfoC,
}