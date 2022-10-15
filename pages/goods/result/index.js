/* eslint-disable no-param-reassign */
import { getSearchResult } from '../../../services/good/featchSearchResult';
import {getBooksByClassId,getBooksByKeyWords} from '../../../api/book/book'
import {getSellerInfoById} from '../../../api/user/seller'
import Toast from 'tdesign-miniprogram/toast/index';

const initFilters = {
  overall: 1,
  sorts: '',
};

Page({
  data: {
    goodsList: [],
    sorts: '',
    overall: 1,
    show: false,
    minVal: '',
    maxVal: '',
    minSalePriceFocus: false,
    maxSalePriceFocus: false,
    filter: initFilters,
    hasLoaded: false,
    keywords: '',
    loadMoreStatus: 0,
    loading: true,
    entry:"",
    classId:"",
    seller:[]
  },

  total: 0,
  pageNum: 1,
  pageSize: 30,

  onLoad(options) {
    const { searchValue = '' } = options || {};
    const {classId = ''}= options||{};
    const {entry=''} =options||{};
    this.setData(
      {
        keywords: searchValue,
        classId:classId,
        entry:entry
      },
      () => {
        this.init(true);
      },
    );
  },
  gotoSellerIntro(){
    console.log('gotouserdetails');
  },

  generalQueryData(reset = false) {
    const { filter, keywords, minVal, maxVal } = this.data;
    const { pageNum, pageSize } = this;
    const { sorts, overall } = filter;
    const params = {
      sort: 0, // 0 综合，1 价格
      pageNum: 1,
      pageSize: 30,
      keyword: keywords,
    };

    if (sorts) {
      params.sort = 1;
      params.sortType = sorts === 'desc' ? 1 : 0;
    }
    if (overall) {
      params.sort = 0;
    } else {
      params.sort = 1;
    }
    params.minPrice = minVal ? minVal * 100 : 0;
    params.maxPrice = maxVal ? maxVal * 100 : undefined;
    if (reset) return params;
    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },

  async init(reset = true) {
    //api keywords search book id and info
    //console.log(this.data.keywords);
    if(this.data.entry==="className"){
      const books=getBooksByClassId(this.data.classId);
      let seller=new Array(books.length);
      books.forEach((item,index)=>{
        const seller_info=getSellerInfoById(item.seller_id);
        seller[index]=seller_info;
      });
      // let book={
      //   publish_id:"",
      //   class_id:"",
      //   seller_id:"",
      //   title:"",
      //   describe:"",
      //   price:"",
      //   image:""
      // };
      this.setData({
        goodsList:books,
        seller:seller
      });

    }else{
      //search entry
      const books=getBooksByKeyWords(this.data.keywords);
      let seller=new Array(books.length);
      books.forEach((item,index)=>{
        const seller_info=getSellerInfoById(item.seller_id);
        seller[index]=seller_info;
      });
      this.setData({
        goodsList:books,
        seller:seller
      });
    }
    
  },

  handleCartTap() {
    wx.switchTab({
      url: '/pages/cart/index',
    });
  },

  handleSubmit() {
    this.setData(
      {
        goodsList: [],
        loadMoreStatus: 0,
      },
      () => {
        this.init(true);
      },
    );
  },

  onReachBottom() {
    const { goodsList } = this.data;
    const { total = 0 } = this;
    if (goodsList.length === total) {
      this.setData({
        loadMoreStatus: 2,
      });
      return;
    }
    this.init(false);
  },

  handleAddCart() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加购',
    });
  },

  gotoGoodsDetail(e){
    // console.log(e);
     const index=parseInt(e.currentTarget.dataset.index);
     //console.log(index);
     wx.navigateTo({
       url: `/pages/goods/details/index?id=${this.data.goodsList[index].publish_id}`,
     });
 
   },

  handleFilterChange(e) {
    const { overall, sorts } = e.detail;
    const { total } = this;
    const _filter = {
      sorts,
      overall,
    };
    this.setData({
      filter: _filter,
      sorts,
      overall,
    });

    this.pageNum = 1;
    this.setData(
      {
        goodsList: [],
        loadMoreStatus: 0,
      },
      () => {
        total && this.init(true);
      },
    );
  },

  showFilterPopup() {
    this.setData({
      show: true,
    });
  },

  showFilterPopupClose() {
    this.setData({
      show: false,
    });
  },

  onMinValAction(e) {
    const { value } = e.detail;
    this.setData({ minVal: value });
  },

  onMaxValAction(e) {
    const { value } = e.detail;
    this.setData({ maxVal: value });
  },

  reset() {
    this.setData({ minVal: '', maxVal: '' });
  },

  confirm() {
    const { minVal, maxVal } = this.data;
    let message = '';
    if (minVal && !maxVal) {
      message = `价格最小是${minVal}`;
    } else if (!minVal && maxVal) {
      message = `价格范围是0-${minVal}`;
    } else if (minVal && maxVal && minVal <= maxVal) {
      message = `价格范围${minVal}-${this.data.maxVal}`;
    } else {
      message = '请输入正确范围';
    }
    if (message) {
      Toast({
        context: this,
        selector: '#t-toast',
        message,
      });
    }
    this.pageNum = 1;
    this.setData(
      {
        show: false,
        minVal: '',
        goodsList: [],
        loadMoreStatus: 0,
        maxVal: '',
      },
      () => {
        this.init();
      },
    );
  },
});
