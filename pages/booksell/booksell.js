// pages/booksell/booksell.js
const app=getApp(); 

Page({
  data: {
    imgList: [],
    desc: '',
    tags: [],
    TagNum: 0,
    save: false,
    price: '',
    title: '',

    array1: ['通识教育课程', '基础课程和专业课程','第二专业、第二学位课程'],
    index1: 0,
    array2: ['中国语言文学系', '外国语言文学学院', '哲学学院', '经济学院', '管理学院','法学院','社会发展与公共政策学院','国际关系与公共事务学院','新闻学院','历史学系','旅游学系','国际文化交流学院','文物与博物馆学系'],
    index2: 0,
    array3: ['数学分析A', '数学分析good'],
    index3: 0,
  },

  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },

  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },

  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },


  // 获得用户文输入的书籍名称
  getTitle(event){
    console.log("输入标题",event.detail.value)
    this.setData({title: event.detail.value});
  }, 


    // 获得用户文本框内输入内容
  getInput(event){
    console.log("输入内容",event.detail.value)
    this.setData({desc: event.detail.value});
  },

// 输入价格
  inputprice(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({price:event.detail})
  },

// 添加标签
  onTagTabTap: function() {
    wx.navigateTo({
      url: '../booksell/chooseTag',
    })
  },
// 删除标签
  onClosetag: function(e){
    this.data.tags.splice(e.target.id,1)
    this.setData({tags: this.data.tags})
  },

  // 选择图片
  ChooseImage(){
    wx.chooseImage({
      count: 8-this.data.imgList.length,
      sizeType: ['compressed'], // 指定图片为压缩格式
      sourceType: ['album'] , // 默认从相册中选择
      success:(res)=>{
        console.log("图片选择成功",res);
        if(this.data.imgList.length!=0){
          this.setData({imgList: this.data.imgList.concat(res.tempFilePaths)})
        }else{
          this.setData({imgList:res.tempFilePaths});
        }
        console.log("目前图片路径:", this.data.imgList)
      }
    })
  },

  // 删除图片
  DeleteImg(e){
    // 弹出Modal的方式让用户进一步选择
    wx.showModal({
      title: '确定删除这张照片吗?',
      content: '',
      cancelText: '取消',
      confirmText:'确定',
      success: res=>{
        if(res.confirm){
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({imgList: this.data.imgList});
        }
      }
    })
  },


  // 发布
  publish: function(e){
    let imgList = this.data.imgList; // 上传图片集合
    let price = this.data.price;

    if(!imgList || imgList.length<1){
      wx.showToast({
        icon: "none",
        title:"请选择图片"
      })
      return 
    }
    if(!price){
      wx.showToast({
        icon: "none",
        title:"请填入价格"
      })
      return 
    }
    wx.showLoading({
      title: '正在发布...',
    })
    wx.request({
      url: 'http://192.168.31.121:9090/bookcommodity/insert',
      method:'POST',
      data:{
        title:this.data.title,
        price:this.data.price,
        type:this.data.array1[this.data.index1],
        department:this.data.array2[this.data.index2],
        curriculum:this.data.array3[this.data.index3],
        complement:this.data.desc,

        // type:"通识选修",
        // curriculum:"大气科学漫谈",
        // department:"大气与海洋科学系",
        // sellerid:1,
      },
      header: { 
        "Content-Type": "application/json" //POST方式
      },
      
      success:function(res){//请求成功之后要做什么
        console.log(res);
        wx.hideLoading();
        if(res.data.status==0){
          wx.navigateBack({
            delta: 0,
          });
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          });
        }
        else{
            wx.showModal({
              title: '发布失败',
              content: '请检查学院与课程是否对应',
              showCancel:false,
            })
        }
      },
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({

    })
  },
})

