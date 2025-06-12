// pages/login/login.js
Page({
  data: {
    username: '',
    password: '',
    isRegister: false
  },
  onUsernameInput(e) {
    this.setData({ username: e.detail.value });
  },
  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },
  switchMode() {
    this.setData({ isRegister: !this.data.isRegister });
  },
  onSubmit() {
    const { username, password, isRegister } = this.data;
    if (!username || !password) {
      wx.showToast({ title: '请填写完整', icon: 'none' });
      return;
    }
    // 模拟注册和登录
    if (isRegister) {
      wx.setStorageSync('userInfo', { username, password });
      wx.showToast({ title: '注册成功', icon: 'success' });
      setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 500);
    } else {
      const user = wx.getStorageSync('userInfo');
      if (user && user.username === username && user.password === password) {
        wx.showToast({ title: '登录成功', icon: 'success' });
        setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 500);
      } else {
        wx.showToast({ title: '用户名或密码错误', icon: 'none' });
      }
    }
  }
});