import { getCategoryList } from '../../../services/good/fetchCategoryList';
import { getAllColledges, getClassesByColledgeName } from "../../../api/class/class"
import { getBaseInfo } from '../../../api/base'

Page({
  data: {
    colledges: [],
    classes: [],
    activeKey: 0,
    subActiveKey: 0,
    bookList: []
  },
  async init() {
    try {
      // const result = await getCategoryList();
      //api get all major and lessons
      //get all class class_id  class_colledge class_name
      let { baseUrl } = getBaseInfo();
      let that = this;
      wx.request({
        url: baseUrl + "class/find/allcolleges",
        method: "GET",
        success(res) {
          const colledges = res.data;
          // console.log(colledges);

          wx.request({
            url: baseUrl + "class/find/collegeclass",
            method: "POST",
            data: {
              colledge_name: colledges[0]
            },
            success(res) {
              const classes = res.data.res;
              // console.log(classes);
              const bookList = [];
              that.setData({
                colledges: colledges,
                classes: classes,
                bookList: bookList
              });
            }
          });

        }


      }
      );

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
  onClick(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    // console.log(index);
    // const item=this.data.list[index];
    //console.log(item.name);
    this.setData({
      activeKey: index,
      subActiveKey: 0
    })
    let { baseUrl } = getBaseInfo();
    let that = this;
    wx.request({
      url: baseUrl + "class/find/collegeclass",
      method: "POST",
      data: {
        colledge_name: that.data.colledges[index]
      },
      success(res) {
        const classes = res.data.res;

        //api get booklist
        that.setData({
          bookList: [],
          classes: classes
        });

      }
    });

  },
  onClickSub(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    // console.log(index);
    // const item=this.data.list[index];
    //console.log(item.name);
    this.setData({
      subActiveKey: index
    })
    // console.log(this.data.list[this.data.activeKey].name+" "+this.data.list[this.data.activeKey].children[this.data.subActiveKey].name)

    this.setData({
      bookList: []
    })
  },
  goToSearchResult(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    //console.log(index+"----"+this.data.bookList[index]);
    const value = this.data.bookList[index];
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${value}`,
    });

  },
  goToSearchLesson() {
    const value = this.data.colledges[this.data.activeKey] + " " + this.data.classes[this.data.subActiveKey].class_name;
    const class_id = this.data.classes[this.data.subActiveKey].class_id;
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${value}&classId=${class_id}&entry=className`,
    });
  }
});
