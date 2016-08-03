# 项目使用教程

### 1.项目结构（加粗均为文件夹）  
+ **src**  (开发目录)  
**common**  （公用静态资源）  
 **components**  （组件文件夹）  
**page**(页面文件夹)  
**template**(模板html)  
+ **node_modules**(开发所需依赖)
+ .babelrc  
+ package.json  
+ README.md  
+ server.js  
+ webpack.config.dev.js(开发环境配置)  
+ webpack.config.prod.js(生产环境配置)  
+ **build**(打包生成文件存放路径)

### 2.用法
1. npm install 安装依赖包   
2. npm start 启动开发环境项目   浏览器打开http://locahost:3000/home.html[http://locahost:3000/home.html]
3. npm run build 生产环境打包（生成build文件夹）

### 3.组件  
在components开发新组件时要新建一个文件夹，例如Hello组件，每个组件的文件夹下要包含自己组件需要的css,scss,jsx,图片资源存放在assets文件下。

### 4.页面  
一个页面一个文件夹，文件夹包括css,js文件。
