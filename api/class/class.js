import { getBaseInfo } from "../base"
const { baseUrl, env } = getBaseInfo();

export function getAllColledges() {
  if (env === "development") {
    return ["计算机学院", "数学学院"];
  } else {
    let colledges = [];
     wx.request({
      url: baseUrl + "class/find/allcolleges",
      method: "GET",
      success(res) {
        console.log(res);
        colledges = res.data;
      }
    });
    return colledges;


  }


}

export function getClassInfoById(class_id) {
  if (env === "development") {
    return {
      class_id: class_id,
      colledge_name: "计算机学院",
      class_name: "计算机网络"
    };

  } else {
    wx.request({
      url: baseUrl + "class/find/class",
      method: "POST",
      data: {
        classId: class_id
      },
      success(res) {
        if (res.data.status === 0) {
          const class_info = res.data.res;
          return class_info;
        } else {
          return [];
        }

      }
    });
  }
}

export function getClassesByColledgeName(colledge_name) {
  if (env === "development") {
    if (colledge_name === "计算机学院") return [
      {
        class_name: "计算集网络",
        class_id: "1001"
      },
      {
        class_name: "计算机图形学",
        class_id: "1002"
      }
    ];
    else return [
      {
        class_name: "概率论与数理统计",
        class_id: "1003"
      },
      {
        class_name: "数学分析",
        class_id: "1004"
      }
    ];


  } else {
    wx.request({
      url: baseUrl + "class/find/collegeclass",
      method: "POST",
      data: {
        colledge_name: colledge_name
      },
      success(res) {
        if (res.data.status === 0) {
          const classes = res.data.res;
          return classes;
        } else {
          return [];
        }
      }
    });

  }


}