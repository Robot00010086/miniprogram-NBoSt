
Page({
  data: {
    tags: [], // 用户已经添加的tag
    mainActiveIndex: 0,
    activeId: [], // 已被树形选择器选择
    addTag:"",
    districts:[
      {text:'新旧程度',
        dot:false,
        children:[{text:'全新'},{text:'九成新'},{text:'八成新'},{text:'七成新'},{text:'六成新'},{text:'较旧'},]
      },
      {text:'书籍类型',
      dot:false,
      children:[{text:'参考书'},{text:'教科书'}]
      },
      {text:'笔记',
      dot:false,
      children:[{text:'有笔记'},{text:'无笔记'}]
      },
    ],
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({detail={}}){
    let newTag = ""
    var childrenList = this.data.districts[this.data.mainActiveIndex]
    for(var i=0;i<childrenList.children.length;i++){
      var attraction = childrenList.children[i]
      if(attraction.text==detail.text){
        newTag = attraction.text
      }
    }

    const { activeId } = this.data;
    const { tags } = this.data
    const index = activeId.indexOf(detail.text);
    if (index > -1) {

      activeId.splice(index, 1);

      // 同时在已选择的tags中删除
      let idx = tags.indexOf(newTag)
     
      if(idx>-1){
        tags.splice(idx,1)
      }
    } else {
      activeId.push(detail.text);
      tags.push(newTag)
    }

    this.setData({ 
      activeId, tags
    });

  },

  // 删除标签
  onClosetag:function(e){
    this.data.tags.splice(e.target.id,1)
    this.setData({
      tags: this.data.tags
    })
  },

  // 用户输入自定义标签
  inputTag: function(e){
    this.setData({
      addTag: e.detail
    })
    console.log(e.detail)
  },

  // 用户加入自定义标签
  onAddTag: function(e){
    console.log(e)
    let content = this.data.addTag
    console.log(content)
    if(content==""||content.length==0){
      wx.showToast({
        title:"输入内容不能为空",
        icon:"none"
      })
      return;
    }
    
    var idx = this.data.tags.indexOf(content)

    if(idx>-1){
      wx.showToast({
        icon: "none", 
        title:"该tag已经存在!"
      })
      return 
    }

    this.data.tags.push(content)
    this.setData({
      tags: this.data.tags,
      addTag:""
    })

  },

  submitTags: function(e){
    let pages = getCurrentPages()
    let currPage = null, prevPage = null
    if(pages.length>=2){
      currPage = pages[pages.length-1] // 当前界面
      prevPage = pages[pages.length-2] // 上一界面
    }
    
    if(prevPage&&prevPage.data.tags){
      prevPage.setData({
        tags: this.data.tags
      })
    }
    wx.navigateBack({})
  }


})