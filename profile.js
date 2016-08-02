/**
 * Created by chenaosheng on 2016/7/28.
 * 页面多入口，模板页面，与打包生成页面命名配置
 */
module.exports={
  view: [
    {
      title: "hello page",
      template: "hello",
      page:"hello",
      filename: "hello"
    },
    {
      title:"home page",
      template: "home",
      page:"home",
      filename: "home",
    },
    {
      title:"test page",
      template: "test",
      page:"test",
      filename: "test",
    },
    {
      title:"router",
      template:"router",
      page:"routerPage",
      filename:"routerPage"
    },
    {
      title:"router-eg",
      template:"router",
      page:"routerExample",
      filename:"routerExample"
    }
  ]
};
