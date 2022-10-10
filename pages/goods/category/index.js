import { getCategoryList } from '../../../services/good/fetchCategoryList';
Page({
  data: {
    list: [],
    activeKey:0,
    subActiveKey:0,
    bookList:[]
  },
  async init() {
    try {
     // const result = await getCategoryList();
     //api get all major and lessons
     const result= [
      {
        name:"计算机学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机组成与体系结构"
          },
          {
            name:"计算机图形学"
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"数学学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"新闻与传播",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },   {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },   {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      },
      {
        name:"外语学院",
        children:[
          {
            name:"计算机网络",
          },
          {
            name:"计算机图形学"
          }
        ]
      }

     ]
     const bookList=["计算机网络-自顶向下方法","概率论与数理统计教程"];
    
      this.setData({
        list: result,
        bookList:bookList
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange() {
    wx.navigateTo({
      url: '/pages/goods/list/index',
    });
  },
  onLoad() {
    this.init(true);
  },
  onClick(e){
    const index=parseInt(e.currentTarget.dataset.index);
   // console.log(index);
   // const item=this.data.list[index];
    //console.log(item.name);
    this.setData({
      activeKey:index,
      subActiveKey:0
    })
    //api get booklist
    this.setData({
      bookList:["计算机网络-自顶向下方法","概率论与数理统计教程"]
    })

  },
  onClickSub(e){
    const index=parseInt(e.currentTarget.dataset.index);
   // console.log(index);
   // const item=this.data.list[index];
    //console.log(item.name);
    this.setData({
      subActiveKey:index
    })
   // console.log(this.data.list[this.data.activeKey].name+" "+this.data.list[this.data.activeKey].children[this.data.subActiveKey].name)

    this.setData({
      bookList:["计算机网络-自顶向下方法","概率论与数理统计教程"]
    })
  },
  goToSearchResult(e){
    const index=parseInt(e.currentTarget.dataset.index);
   //console.log(index+"----"+this.data.bookList[index]);
   const value=this.data.bookList[index];
   wx.navigateTo({
    url: `/pages/goods/result/index?searchValue=${value}`,
  });

  },
  goToSearchLesson(){
    const value=this.data.list[this.data.activeKey].name+" "+this.data.list[this.data.activeKey].children[this.data.subActiveKey].name;
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${value}`,
    }); 
  }
});
