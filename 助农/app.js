App({
  // 全局数据
  globalData: {
    userInfo: null,
    isLogin: false,
    systemInfo: null,
    cartCount: 0,
    favoriteList: []
  },

  // 小程序启动时执行
  onLaunch: function (options) {
    console.log('小程序启动', options);
    
    // 获取系统信息
    this.getSystemInfo();
    
    // 检查更新
    this.checkForUpdate();
    
    // 初始化购物车数量
    this.updateCartCount();
    
    // 检查登录状态
    this.checkLoginStatus();
  },

  // 小程序显示时执行
  onShow: function (options) {
    console.log('小程序显示', options);
    // 更新购物车数量
    this.updateCartCount();
  },

  // 小程序隐藏时执行
  onHide: function () {
    console.log('小程序隐藏');
  },

  // 小程序发生脚本错误或API调用报错时触发
  onError: function (msg) {
    console.error('小程序错误：', msg);
    // 可以在这里上报错误信息
  },

  // 获取系统信息
  getSystemInfo: function() {
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res;
        console.log('系统信息：', res);
      },
      fail: function(err) {
        console.error('获取系统信息失败：', err);
      }
    });
  },

  // 检查小程序更新
  checkForUpdate: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      
      updateManager.onCheckForUpdate(function (res) {
        console.log('检查更新结果：', res.hasUpdate);
      });

      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });

      updateManager.onUpdateFailed(function () {
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      });
    }
  },

  // 更新购物车数量
  updateCartCount: function() {
    const cartList = wx.getStorageSync('cartList') || [];
    const cartCount = cartList.reduce((total, item) => total + item.quantity, 0);
    this.globalData.cartCount = cartCount;
    return cartCount;
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      this.globalData.isLogin = true;
    }
  },

  // 用户登录
  login: function(userInfo) {
    this.globalData.userInfo = userInfo;
    this.globalData.isLogin = true;
    wx.setStorageSync('userInfo', userInfo);
    console.log('用户登录成功：', userInfo);
  },

  // 用户退出登录
  logout: function() {
    this.globalData.userInfo = null;
    this.globalData.isLogin = false;
    wx.removeStorageSync('userInfo');
    wx.showToast({
      title: '已退出登录',
      icon: 'success'
    });
  },

  // 添加到收藏
  addToFavorite: function(product) {
    let favoriteList = wx.getStorageSync('favoriteList') || [];
    const isExist = favoriteList.some(item => item.id === product.id);
    
    if (!isExist) {
      favoriteList.push(product);
      wx.setStorageSync('favoriteList', favoriteList);
      this.globalData.favoriteList = favoriteList;
      return true;
    }
    return false;
  },

  // 从收藏中移除
  removeFromFavorite: function(productId) {
    let favoriteList = wx.getStorageSync('favoriteList') || [];
    favoriteList = favoriteList.filter(item => item.id !== productId);
    wx.setStorageSync('favoriteList', favoriteList);
    this.globalData.favoriteList = favoriteList;
  },

  // 检查是否已收藏
  isFavorite: function(productId) {
    const favoriteList = wx.getStorageSync('favoriteList') || [];
    return favoriteList.some(item => item.id === productId);
  },

  // 获取网络状态
  getNetworkType: function() {
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success: function(res) {
          resolve(res.networkType);
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },

  // 显示网络错误提示
  showNetworkError: function() {
    wx.showToast({
      title: '网络连接异常',
      icon: 'none',
      duration: 2000
    });
  },

  // 工具函数：格式化价格
  formatPrice: function(price) {
    return parseFloat(price).toFixed(2);
  },

  // 工具函数：格式化时间
  formatTime: function(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');
  },

  formatNumber: function(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }
});
