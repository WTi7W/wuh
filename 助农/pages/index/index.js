Page({
  data: {
    searchKeyword: '', // 搜索关键词
    
    // 轮播图数据 - 助农主题海报
    bannerList: [
      {
        id: 1,
        title: '科技助农·青年行动',
        image: 'https://imgs.699pic.com/images/507/716/787.jpg!detail.v1'
      },
      {
        id: 2,
        title: '绿色农产品直通车',
        image: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.h2nPA9857vAGWnZLiDCFggHaEf?rs=1&pid=ImgDetMain'
      },
      {
        id: 3,
        title: '青春助农·品质生活',
        image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.Dk-iPoXT6Z0cXZXCdIY_fgHaEK?rs=1&pid=ImgDetMain'
      },
      {
        id: 4,
        title: '农村电商·振兴乡村',
        image: 'https://ts1.tc.mm.bing.net/th/id/R-C.0da9681b5c70cd61583d78300f49c105?rik=bHx6hqM2DIlB2g&riu=http%3a%2f%2fwww.heshan.gov.cn%2fimg%2f0%2f609%2f609059%2f2405944.jpg&ehk=A3UZmrO5S6TTUM6RjZ3GF0K03N%2bPFfzvOhyJ%2fTbSVKI%3d&risl=&pid=ImgRaw&r=0'
      },
      {
        id: 5,
        title: '产地直供·新鲜到家',
        image: 'https://x0.ifengimg.com/res/2022/4F1FDC7BB8F54460E12DB335374E8F88FD66E7BC_size548_w600_h450.png'
      }
    ],
    
    // 分类导航数据 - 使用emoji图标
    categoryList: [
      {
        id: 1,
        name: '水果',
        icon: '🍎'
      },
      {
        id: 2,
        name: '茶叶',
        icon: '🍵'
      },
      {
        id: 3,
        name: '蔬菜',
        icon: '🥬'
      },
      {
        id: 4,
        name: '特产',
        icon: '🏆'
      }
    ],

    // 特色农产品列表
    productList: [
      {
        id: 1,
        name: '高山云雾茶',
        description: '海拔1200米高山茶园，香气清雅',
        price: '128.0',
        unit: '盒',
        category: '茶叶',
        tag: '高山茶',
        image: 'https://img.alicdn.com/i2/2211336018950/O1CN01V0zoB52Fz9X0hr5p0_!!2211336018950.jpg'
      },
      {
        id: 2,
        name: '阿克苏冰糖心苹果',
        description: '新疆阿克苏特产，糖心满满',
        price: '58.8',
        unit: '箱',
        category: '水果',
        tag: '地标产品',
        image: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.RGWNIw50qtirWMjqgSeoyQHaH5?rs=1&pid=ImgDetMain'
      },
      {
        id: 3,
        name: '碧螺春绿茶',
        description: '江苏太湖原产地，清香淡雅',
        price: '158.0',
        unit: '盒',
        category: '茶叶',
        tag: '名茶',
        image: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.Ea2aPZOFXx0TS9J7vlRhUwHaHa?rs=1&pid=ImgDetMain'
      },
      {
        id: 4,
        name: '海南金钻凤梨',
        description: '热带阳光培育，香甜多汁',
        price: '39.9',
        unit: '个',
        category: '水果',
        tag: '热带水果',
        image: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.wSFhnCETNulmO8_2_4zH8wHaHa?rs=1&pid=ImgDetMain'
      },
      {
        id: 5,
        name: '龙井明前茶',
        description: '杭州西湖龙井，明前头采',
        price: '288.0',
        unit: '盒',
        category: '茶叶',
        tag: '明前茶',
        image: 'https://img.alicdn.com/i4/118266366/O1CN01QCJsyH1wtgAabQbHH_!!118266366.jpg'
      },
      {
        id: 6,
        name: '烟台红富士苹果',
        description: '山东烟台特产，脆甜多汁',
        price: '48.0',
        unit: '箱',
        category: '水果',
        tag: '地理标志',
        image: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/122799/37/28818/191658/637db045Efffa70a6/9b954f201a051353.jpg'
      }
    ],
    
    // 过滤后的商品列表
    filteredProductList: []
  },

  onLoad: function (options) {
    console.log('首页加载完成');
    this.setData({
      filteredProductList: this.data.productList
    });
  },

  onShow: function () {
    // 页面显示时刷新数据
    this.loadProductList();
  },

  // 加载商品列表
  loadProductList: function() {
    console.log('加载商品列表');
    this.filterProducts();
  },

  // 搜索输入事件
  onSearchInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
    this.filterProducts();
  },

  // 搜索确认事件
  onSearchConfirm: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
    this.filterProducts();
    
    if (e.detail.value.trim()) {
      wx.showToast({
        title: `搜索"${e.detail.value}"`,
        icon: 'none'
      });
    }
  },

  // 清除搜索
  clearSearch: function() {
    this.setData({
      searchKeyword: ''
    });
    this.filterProducts();
  },

  // 分类点击事件
  onCategoryTap: function(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      searchKeyword: category
    });
    this.filterProducts();
  },

  // 过滤商品
  filterProducts: function() {
    const keyword = this.data.searchKeyword.toLowerCase();
    
    if (!keyword) {
      this.setData({
        filteredProductList: this.data.productList
      });
      return;
    }
    
    const filtered = this.data.productList.filter(product => {
      return product.name.toLowerCase().includes(keyword) ||
             product.description.toLowerCase().includes(keyword) ||
             product.category.toLowerCase().includes(keyword) ||
             product.tag.toLowerCase().includes(keyword);
    });
    
    this.setData({
      filteredProductList: filtered
    });
  },

  // 跳转到商品详情页
  goToDetail: function(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${productId}`,
      success: function() {
        console.log('跳转到商品详情页，商品ID:', productId);
      },
      fail: function(err) {
        console.error('跳转失败:', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'error'
        });
      }
    });
  },

  // 添加到购物车
  addToCart: function(e) {
    // 阻止事件冒泡，防止触发商品详情跳转
    e.stopPropagation();
    
    const productId = e.currentTarget.dataset.id;
    const product = this.data.productList.find(item => item.id === productId);
    
    if (!product) {
      wx.showToast({
        title: '商品不存在',
        icon: 'error'
      });
      return;
    }

    // 获取本地存储的购物车数据
    let cartList = wx.getStorageSync('cartList') || [];
    
    // 检查商品是否已在购物车中
    const existingItem = cartList.find(item => item.id === productId);
    
    if (existingItem) {
      // 如果商品已存在，数量加1
      existingItem.quantity += 1;
    } else {
      // 如果商品不存在，添加到购物车
      cartList.push({
        ...product,
        quantity: 1,
        selected: true
      });
    }
    
    // 保存到本地存储
    wx.setStorageSync('cartList', cartList);
    
    // 显示成功提示
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500
    });
    
    // 询问是否立即前往购物车
    setTimeout(() => {
      wx.showModal({
        title: '提示',
        content: '商品已加入购物车，是否立即查看？',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/cart/cart'
            });
          }
        }
      });
    }, 1500);
    
    console.log('商品已添加到购物车:', product.name);
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    console.log('下拉刷新');
    
    // 模拟刷新数据
    setTimeout(() => {
      this.loadProductList();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      });
    }, 1000);
  },

  // 分享
  onShareAppMessage: function() {
    return {
      title: '青春助农 - 特色农产品直供',
      path: '/pages/index/index',
      imageUrl: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.h2nPA9857vAGWnZLiDCFggHaEf?rs=1&pid=ImgDetMain'
    };
  }
});
