Page({
  data: {
    cartList: [],
    totalPrice: '0.00',
    selectedCount: 0,
    isAllSelected: false
  },

  onLoad: function (options) {
    this.loadCartData();
  },

  onShow: function () {
    this.loadCartData();
  },

  // 加载购物车数据
  loadCartData: function() {
    const cartList = wx.getStorageSync('cartList') || [];
    this.setData({ cartList });
    this.calculateTotal();
  },

  // 保存购物车数据
  saveCartData: function() {
    wx.setStorageSync('cartList', this.data.cartList);
  },

  // 计算总价和选中数量
  calculateTotal: function() {
    const { cartList } = this.data;
    let totalPrice = 0;
    let selectedCount = 0;
    let selectedItems = 0;

    cartList.forEach(item => {
      if (item.selected) {
        totalPrice += parseFloat(item.price) * item.quantity;
        selectedCount += item.quantity;
        selectedItems++;
      }
    });

    const isAllSelected = cartList.length > 0 && selectedItems === cartList.length;

    this.setData({
      totalPrice: totalPrice.toFixed(2),
      selectedCount,
      isAllSelected
    });
  },

  // 切换商品选中状态
  toggleSelect: function(e) {
    const index = e.currentTarget.dataset.index;
    const cartList = [...this.data.cartList];
    cartList[index].selected = !cartList[index].selected;
    
    this.setData({ cartList });
    this.saveCartData();
    this.calculateTotal();
  },

  // 全选/取消全选
  toggleSelectAll: function() {
    const { cartList, isAllSelected } = this.data;
    const newSelectState = !isAllSelected;
    
    const updatedCartList = cartList.map(item => ({
      ...item,
      selected: newSelectState
    }));
    
    this.setData({ cartList: updatedCartList });
    this.saveCartData();
    this.calculateTotal();
  },

  // 减少数量
  decreaseQuantity: function(e) {
    const index = e.currentTarget.dataset.index;
    const cartList = [...this.data.cartList];
    
    if (cartList[index].quantity > 1) {
      cartList[index].quantity--;
      this.setData({ cartList });
      this.saveCartData();
      this.calculateTotal();
    }
  },

  // 增加数量
  increaseQuantity: function(e) {
    const index = e.currentTarget.dataset.index;
    const cartList = [...this.data.cartList];
    
    cartList[index].quantity++;
    this.setData({ cartList });
    this.saveCartData();
    this.calculateTotal();
  },

  // 跳转到商品详情
  goToDetail: function(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${productId}`
    });
  },

  // 跳转到首页
  goToIndex: function() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 去结算
  goToSettlement: function() {
    const { cartList, selectedCount } = this.data;
    
    if (selectedCount === 0) {
      wx.showToast({
        title: '请选择要结算的商品',
        icon: 'none'
      });
      return;
    }

    // 获取选中的商品
    const selectedItems = cartList.filter(item => item.selected);
    
    // 计算总价
    const totalAmount = selectedItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);

    // 保存结算商品信息到本地存储
    wx.setStorageSync('settlementItems', {
      items: selectedItems,
      totalAmount: totalAmount.toFixed(2),
      itemCount: selectedCount
    });

    // 这里可以跳转到结算页面，目前用弹窗模拟
    wx.showModal({
      title: '确认结算',
      content: `共${selectedCount}件商品，总计¥${totalAmount.toFixed(2)}`,
      confirmText: '确认支付',
      cancelText: '继续购物',
      success: (res) => {
        if (res.confirm) {
          // 模拟支付成功
          this.handlePaymentSuccess(selectedItems);
        }
      }
    });
  },

  // 处理支付成功
  handlePaymentSuccess: function(selectedItems) {
    wx.showToast({
      title: '支付成功！',
      icon: 'success'
    });

    // 从购物车中移除已购买的商品
    const remainingItems = this.data.cartList.filter(item => !item.selected);
    
    this.setData({ cartList: remainingItems });
    this.saveCartData();
    this.calculateTotal();
    
    console.log('购买成功的商品:', selectedItems);
  },

  // 页面分享
  onShareAppMessage: function() {
    return {
      title: '青春助农 - 我的购物车',
      path: '/pages/cart/cart'
    };
  }
});
