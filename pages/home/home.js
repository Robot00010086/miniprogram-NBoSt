import { fetchHome } from '../../services/home/home';
import { fetchGoodsList } from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    navigation: { type: 'dots' },
  },

  goodListPagination: {
    index: 0,
    num: 20,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    // if (this.data.goodsListLoadStatus === 0) {
    //   this.loadGoodsList();
    // }
  },

  onPullDownRefresh() {
    // this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    // wx.stopPullDownRefresh();

    // this.setData({
    //   pageLoading: true,
    // });
    fetchHome().then(({ swiper, tabList }) => {
      this.setData({
        tabList,
        imgSrcs: swiper,
        pageLoading: false,
      });

      this.setData({
        goodsList: [
          {
            id: 1,
            name: "hahah",
            introduction: "info",
            image: "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png",
            seller: "seller"
          },
          {
            id: 2,
            name: "hahah",
            introduction: "info",
            image: "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png",
            seller: "seller"
          },
          {
            id: 3,
            name: "hahah",
            introduction: "info",
            image: "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png",
            seller: "seller"
          }


        ]

      });
      //   //this.loadGoodsList(true);
      // });

    });
  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: 1 });

    const pageSize = this.goodListPagination.num;
    let pageIndex =
      this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0,
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 });
    }
  },

  goodListAddCartHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/search/index' });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },

  gotoGoodsDetail(e) {
    // console.log(e);
    const index = parseInt(e.currentTarget.dataset.index);
    //console.log(index);
    wx.navigateTo({
      url: `/pages/goods/details/index?id=${this.data.goodsList[index].id}`,
    });

  }
});
