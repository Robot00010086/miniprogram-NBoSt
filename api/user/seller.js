import { getBaseInfo } from "../base"
const { baseUrl, env } = getBaseInfo();
export function getSellerInfoById(seller_id) {
  if (env === "development") {
    return {
      seller_id: '1001',
      seller_avatar: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
      seller_name: "fdy"
    };

  }
  else {
    wx.request({
      url: baseUrl + "user/select/user",
      method: "POST",
      data: {
        sellerId: seller_id
      },
      success(res) {
        if (res.data.status === 0) {
          const seller_info = res.data.res;
          return seller_info;
        } else {
          return {
            seller_id: '',
            seller_avator: '',
            seller_name: ''
          };
        }

      }
    });

  }
}
