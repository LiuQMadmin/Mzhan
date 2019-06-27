const caozuo=require("../controllers/caozuo")
const {SW,list}=require("./../controllers/position");
// 加载swiper函数
SW();
// 向页面插入数据
list();
// 给页面添加事件
caozuo.jingxuan();