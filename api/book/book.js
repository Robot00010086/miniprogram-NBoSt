import {getBaseInfo} from "../base"
const {baseUrl,env}=getBaseInfo();
export function getBooksByClassId(class_id){
  if(env==="development"){
 return [{
    publish_id:"1001",
    class_id:class_id,
    seller_id:"1001",
    title:"老人与海",
    describe:"best-seller",
    price:"100$",
    image:"https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png"

  },
  {
    publish_id:"1001",
    class_id:class_id,
    seller_id:"1001",
    title:"老人与海",
    describe:"best-seller",
    price:"100$",
    image:"https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png"

  },
  {
    publish_id:"1001",
    class_id:class_id,
    seller_id:"1001",
    title:"老人与海",
    describe:"best-seller",
    price:"100$",
    image:"https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png"

  }]

  }else{
   wx.request({
    url: baseUrl+"book/getById?classId="+class_id,
    method:"GET",
    success(res){
      if(res.data.status==="SUCCESS"){
        const books=res.data.data;
        return books;
      }else {
        return [];
      }

    }
  });


  }
 
 

}

export function getBooksByPublishId(publish_id){
  if(env==="development"){
    console.log(env);
    return {
        publish_id:publish_id,
        class_id:"1001",
        seller_id:"1001",
        title:"老人与海",
        describe:"best-seller",
        price:"10000",
        image:"https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png"
      };
  }else{
   wx.request({
    url: baseUrl+"book/getByPublishId?publishId="+publish_id,
    method:"GET",
    success(res){
      if(res.data.status==="SUCCESS"){
        const books=res.data.data;
        return books;
      }else {
        return [];
      }

    }
  });


  }

 


}

export function getBooksByKeyWords(keywords){
  if(env==="development"){
    return [{
      publish_id:"1001",
      class_id:"1001",
      seller_id:"1001",
      title:"老人与海",
      describe:"best-seller",
      price:"100$",
      image:"https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png"
  
    },
    {
      publish_id:"1001",
      class_id:"1002",
      seller_id:"1001",
      title:"海老与人",
      describe:"best-seller",
      price:"100$",
      image:"https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png"
  
    },
    {
      publish_id:"1001",
      class_id:"1003",
      seller_id:"1001",
      title:"海人与老",
      describe:"best-seller",
      price:"100$",
      image:"https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png"
  
    }]


  }else{
    wx.request({
    url: baseUrl+"book/getById?classId="+class_id,
    method:"GET",
    success(res){
      if(res.data.status==="SUCCESS"){
        const books=res.data.data;
        return books;
      }else {
        return [];
      }

    }
  });

  }



}
export function getBookImages(publish_id){
  if(env==="development"){
    console.log(env);
    return ['https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png','https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png'];
  }else{
   wx.request({
    url: baseUrl+"book/image/all?publishId="+publish_id,
    method:"GET",
    success(res){
      if(res.data.status==="SUCCESS"){
        const images=res.data.data;
        return images;
      }else {
        return [''];
      }

    }
  });


  }
}