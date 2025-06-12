Page({
  data: {
    productId: null,
    quantity: 1,
    selectedSpec: 1,
    cartCount: 0,
    isFavorite: false,
    showVideoModal: false,
    soldCount: 186,
    
    // 商品详情数据
    productDetail: {},
    
    // 商品图片
    productImages: [],
    
    // 规格列表
    specList: [
      { id: 1, name: '精装礼盒', price: '128.0' },
      { id: 2, name: '简装袋装', price: '88.0' },
      { id: 3, name: '散装称重', price: '68.0' }
    ],
    
    // 详情图片
    detailImages: [
      'https://ts1.tc.mm.bing.net/th/id/R-C.8c5dec84b4ff0b1f51560acee78fe71a?rik=%2bqFYh3yq3BSyqg&riu=http%3a%2f%2fphoto.fansimg.com%2fattachment%2fuploads2022%2f04%2f19%2f085034wv9kxbb9k88vxh8k.jpg&ehk=H56u4hEmfuEaeVqGMaYGTUNyTrOS%2f3Wl6%2fUY4rdqw2w%3d&risl=&pid=ImgRaw&r=0',
      'https://img.alicdn.com/i4/494791753/O1CN01fuUlhs1Oov1NaLHhS_!!494791753.jpg',
      'https://cbu01.alicdn.com/img/ibank/2019/369/615/12588516963_526110458.jpg'
    ],
    
    // 乡村振兴故事数据
    storyInfo: {
      title: '从贫困户到致富带头人的蜕变',
      coverImage: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.psVKGJyk49r7CqWrsdmPqQHaE8?rs=1&pid=ImgDetMain',
      videoUrl: 'https://www.w3school.com.cn/i/movie.mp4', // 示例视频链接
      farmerName: '李明华',
      farmerTitle: '茶叶合作社理事长',
      farmerAvatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.wJxiMJPlKnfjEgJadZqkZAHaE8?rs=1&pid=ImgDetMain',
      experience: 15,
      content: '李明华是当地的茶叶种植专家，从2008年开始带领村民发展高山茶产业。通过引进新技术、改良茶叶品种，不仅自己脱贫致富，还带动了全村200多户农民增收。他创办的茶叶合作社年产值超过500万元，产品远销全国各地。"要让家乡的好茶叶走向更广阔的市场，让更多农民通过茶叶产业过上好日子。"这是李明华的朴实愿望，也是他一直在努力实现的目标。',
      achievements: [
        { number: '200+', label: '带动农户' },
        { number: '500万', label: '年产值' },
        { number: '15年', label: '种茶经验' }
      ]
    }
  },

  onLoad: function(options) {
    const productId = options.id;
    if (productId) {
      this.setData({ productId: parseInt(productId) });
      this.loadProductDetail();
    }
    this.updateCartCount();
  },

  onShow: function() {
    this.updateCartCount();
  },

  // 加载商品详情
  loadProductDetail: function() {
    // 模拟从首页传递的商品数据或通过ID获取
    const productList = [
      {
        id: 1,
        name: '高山云雾茶',
        description: '海拔1200米高山茶园，香气清雅，口感醇厚',
        price: '128.0',
        unit: '盒',
        category: '茶叶',
        tag: '高山茶',
        image: 'https://img.alicdn.com/i2/2211336018950/O1CN01V0zoB52Fz9X0hr5p0_!!2211336018950.jpg',
        origin: '福建武夷山',
        harvestTime: '2024年春季',
        shelfLife: '24个月',
        storage: '阴凉干燥处保存'
      },
      {
        id: 2,
        name: '阿克苏冰糖心苹果',
        description: '新疆阿克苏特产，糖心满满，香甜可口',
        price: '58.8',
        unit: '箱',
        category: '水果',
        tag: '地标产品',
        image: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.RGWNIw50qtirWMjqgSeoyQHaH5?rs=1&pid=ImgDetMain',
        origin: '新疆阿克苏',
        harvestTime: '2024年10月',
        shelfLife: '6个月',
        storage: '冷藏保存'
      },
      {
        id: 3,
        name: '碧螺春绿茶',
        description: '江苏太湖原产地，清香淡雅',
        price: '158.0',
        unit: '盒',
        category: '茶叶',
        tag: '名茶',
        image: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.Ea2aPZOFXx0TS9J7vlRhUwHaHa?rs=1&pid=ImgDetMain',
        origin: '江苏苏州太湖',
        harvestTime: '2024年早春',
        shelfLife: '18个月',
        storage: '密封干燥保存'
      },
      {
        id: 4,
        name: '海南金钻凤梨',
        description: '热带阳光培育，香甜多汁',
        price: '39.9',
        unit: '个',
        category: '水果',
        tag: '热带水果',
        image: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.wSFhnCETNulmO8_2_4zH8wHaHa?rs=1&pid=ImgDetMain',
        origin: '海南三亚',
        harvestTime: '2024年全年',
        shelfLife: '15天',
        storage: '常温保存'
      },
      {
        id: 5,
        name: '龙井明前茶',
        description: '杭州西湖龙井，明前头采',
        price: '288.0',
        unit: '盒',
        category: '茶叶',
        tag: '明前茶',
        image: 'https://img.alicdn.com/i4/118266366/O1CN01QCJsyH1wtgAabQbHH_!!118266366.jpg',
        origin: '浙江杭州西湖',
        harvestTime: '2024年清明前',
        shelfLife: '24个月',
        storage: '冷藏密封保存'
      },
      {
        id: 6,
        name: '烟台红富士苹果',
        description: '山东烟台特产，脆甜多汁',
        price: '48.0',
        unit: '箱',
        category: '水果',
        tag: '地理标志',
        image: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/122799/37/28818/191658/637db045Efffa70a6/9b954f201a051353.jpg',
        origin: '山东烟台',
        harvestTime: '2024年10月',
        shelfLife: '4个月',
        storage: '冷藏保存'
      }
    ];

    const product = productList.find(item => item.id === this.data.productId);
    
    if (product) {
      // 生成商品轮播图（可以包含多张图片）
      const productImages = [
        product.image,
        'https://tse4-mm.cn.bing.net/th/id/OIP-C.5miSFVa0urugGET-EHx_5AHaE2?rs=1&pid=ImgDetMain',
        'https://ts1.tc.mm.bing.net/th/id/R-C.a08abef2d4b302d8f14d8169908e0dc1?rik=JnLv8A%2fvlFvqTQ&riu=http%3a%2f%2fwww.zjqy.gov.cn%2fpicture%2f-1%2f221018084337872828.jpg&ehk=x40uevmu8VeDzipDGrhavsn84OAK7Mw9Xd%2bro0%2bTjKA%3d&risl=&pid=ImgRaw&r=0'
      ];

      this.setData({
        productDetail: product,
        productImages: productImages
      });

      // 根据不同商品调整故事内容
      this.adjustStoryByProduct(product);
    }
  },

  // 根据商品调整故事内容
  adjustStoryByProduct: function(product) {
    let storyInfo = { ...this.data.storyInfo };
    
    if (product.category === '茶叶') {
      storyInfo = {
        title: '从贫困户到致富带头人的蜕变',
        coverImage: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.psVKGJyk49r7CqWrsdmPqQHaE8?rs=1&pid=ImgDetMain',
        videoUrl: 'https://www.w3school.com.cn/i/movie.mp4',
        farmerName: '李明华',
        farmerTitle: '茶叶合作社理事长',
        farmerAvatar: 'https://img95.699pic.com/photo/60073/3293.jpg_wh860.jpg',
        experience: 15,
        content: '李明华是当地的茶叶种植专家，从2008年开始带领村民发展高山茶产业。通过引入新技术、改良茶叶品种，不仅自己脱贫致富，还带动了全村200多户农民增收。他创办的茶叶合作社年产值超过500万元，产品远销全国各地。"要让家乡的好茶叶走向更广阔的市场，让更多农民通过茶叶产业过上好日子。"',
        achievements: [
          { number: '200+', label: '带动农户' },
          { number: '500万', label: '年产值' },
          { number: '15年', label: '种茶经验' }
        ]
      };
    } else if (product.category === '水果') {
      storyInfo = {
        title: '果园里的致富梦想',
        coverImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.xQVKwTIIbldcOEI_N1TtbQAAAA?rs=1&pid=ImgDetMain',
        videoUrl: 'https://www.w3school.com.cn/i/movie.mp4',
        farmerName: '张丽萍',
        farmerTitle: '果蔬种植专业合作社社长',
        farmerAvatar: 'https://ts1.tc.mm.bing.net/th/id/R-C.55538fe14142a588f5b6879710aef61a?rik=xnduSemB3zKJDg&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd2021511s%2f200%2fw2048h1352%2f20210511%2fa7b5-kpuunne3145258.jpg&ehk=%2bB0X2%2fePHEVkUS826Y2Mq7FFZD06q7IHx95EB50xoJo%3d&risl=&pid=ImgRaw&r=0',
        experience: 12,
        content: '张丽萍从一个普通的农村妇女，成长为当地有名的果蔬种植专家。她不仅自己种植了50亩优质果园，还成立了专业合作社，带领150多户村民共同致富。通过标准化种植、品牌化运营，她的水果远销北上广深等一线城市。"让城里人吃到最新鲜的水果，让农民过上更好的生活。"',
        achievements: [
          { number: '150+', label: '合作农户' },
          { number: '50亩', label: '种植规模' },
          { number: '12年', label: '种植经验' }
        ]
      };
    }
    
    this.setData({ storyInfo });
  },

  // 更新购物车数量
  updateCartCount: function() {
    const cartList = wx.getStorageSync('cartList') || [];
    const cartCount = cartList.reduce((total, item) => total + item.quantity, 0);
    this.setData({ cartCount });
  },

  // 规格选择
  selectSpec: function(e) {
    const specId = e.currentTarget.dataset.id;
    this.setData({ selectedSpec: specId });
    
    // 更新价格
    const selectedSpecInfo = this.data.specList.find(spec => spec.id === specId);
    if (selectedSpecInfo) {
      const updatedProduct = { ...this.data.productDetail, price: selectedSpecInfo.price };
      this.setData({ productDetail: updatedProduct });
    }
  },

  // 数量减少
  decreaseQuantity: function() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 });
    }
  },

  // 数量增加
  increaseQuantity: function() {
    this.setData({ quantity: this.data.quantity + 1 });
  },

  // 数量输入
  inputQuantity: function(e) {
    const value = parseInt(e.detail.value) || 1;
    this.setData({ quantity: Math.max(1, value) });
  },

  // 播放故事视频
  playStoryVideo: function() {
    this.setData({ showVideoModal: true });
  },

  // 关闭视频弹窗
  closeVideoModal: function() {
    this.setData({ showVideoModal: false });
  },

  // 阻止事件冒泡
  preventClose: function() {
    // 空函数，阻止点击视频容器时关闭弹窗
  },

  // 查看更多故事
  viewMoreStories: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 前往购物车
  goToCart: function() {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },

  // 切换收藏状态
  toggleFavorite: function() {
    const isFavorite = !this.data.isFavorite;
    this.setData({ isFavorite });
    
    wx.showToast({
      title: isFavorite ? '已收藏' : '已取消收藏',
      icon: 'success'
    });
  },

  // 加入购物车
  addToCart: function() {
    const { productDetail, quantity, selectedSpec, specList } = this.data;
    
    // 获取选中的规格信息
    const selectedSpecInfo = specList.find(spec => spec.id === selectedSpec);
    
    // 构建购物车商品数据
    const cartItem = {
      ...productDetail,
      quantity: quantity,
      selected: true,
      specId: selectedSpec,
      specName: selectedSpecInfo.name,
      price: selectedSpecInfo.price
    };

    // 获取本地购物车数据
    let cartList = wx.getStorageSync('cartList') || [];
    
    // 检查是否已存在相同商品和规格
    const existingIndex = cartList.findIndex(item => 
      item.id === productDetail.id && item.specId === selectedSpec
    );
    
    if (existingIndex >= 0) {
      // 如果存在，增加数量
      cartList[existingIndex].quantity += quantity;
    } else {
      // 如果不存在，添加新商品
      cartList.push(cartItem);
    }
    
    // 保存到本地存储
    wx.setStorageSync('cartList', cartList);
    
    // 更新购物车数量显示
    this.updateCartCount();
    
    // 显示成功提示
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });

    console.log('商品已加入购物车:', cartItem);
  },

  // 立即购买
  buyNow: function() {
    const { productDetail, quantity, selectedSpec, specList } = this.data;
    
    // 获取选中的规格信息
    const selectedSpecInfo = specList.find(spec => spec.id === selectedSpec);
    
    // 构建订单商品数据
    const orderItem = {
      ...productDetail,
      quantity: quantity,
      specId: selectedSpec,
      specName: selectedSpecInfo.name,
      price: selectedSpecInfo.price,
      totalPrice: (parseFloat(selectedSpecInfo.price) * quantity).toFixed(2)
    };

    // 将商品信息保存到本地存储，供结算页面使用
    wx.setStorageSync('orderItems', [orderItem]);
    
    // 跳转到结算页面（这里暂时用Toast代替）
    wx.showModal({
      title: '立即购买',
      content: `商品：${productDetail.name}\n规格：${selectedSpecInfo.name}\n数量：${quantity}\n总价：¥${orderItem.totalPrice}`,
      confirmText: '确认购买',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '购买成功！',
            icon: 'success'
          });
        }
      }
    });

    console.log('立即购买:', orderItem);
  },

  // 分享
  onShareAppMessage: function() {
    const { productDetail } = this.data;
    return {
      title: `${productDetail.name} - 青春助农特产直供`,
      path: `/pages/detail/detail?id=${productDetail.id}`,
      imageUrl: productDetail.image
    };
  }
});
