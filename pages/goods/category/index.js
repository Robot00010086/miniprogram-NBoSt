import { getCategoryList } from '../../../services/good/fetchCategoryList';
import {getAllColledges,getClassesByColledgeName} from "../../../api/class/class"
Page({
  data: {
    colledges: [],
    classes:[],
    activeKey:0,
    subActiveKey:0,
    bookList:[]
  },
  async init() {
    try {
     // const result = await getCategoryList();
     //api get all major and lessons
     //get all class class_id  class_colledge class_name
      const colledges=getAllColledges();
      const classes=getClassesByColledgeName(colledges[0]);
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
     const bookList=[];
    
      this.setData({
        colledges: colledges,
        classes:classes,
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
    let classes=getClassesByColledgeName(this.data.colledges[index]);

    //api get booklist
    this.setData({
      bookList:[],
      classes:classes
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
      bookList:[]
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
    const value=this.data.colledges[this.data.activeKey]+" "+this.data.classes[this.data.subActiveKey].class_name;
    const class_id=this.data.classes[this.data.subActiveKey].class_id;
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${value}&classId=${class_id}&entry=className`,
    }); 
  }
});
