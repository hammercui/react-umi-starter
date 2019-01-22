> umi(react+router)+dva+typescrip开发脚手架

## 脚手架特性

1. TypeScript的支持
2. 使用Dva进行状态管理，是redux+redux-saga的最佳实践之一
3. 集中式声明式路由管理，基于react-router实现，集成在umi
4. 异步加载和按需加载，集成在umi
5. less替换css，集成在umi
6. 登陆Layout和面板Layout的布局设置
7. 使用immutable.js优化redux

## 启动命令

**安装**
```
yarn
```

**Dev模式**
```
npm run start
```

**Alpha本地测试**
```
npm run build
npm run alpha
启动一个静态资源服务器，资源位于/dist目录,用于在beta测试前，进行本地打包测试
```

**打包部署**
```
npm run build
```
## 目录结构

```
+ config //配置文件目录，取代.umirc
  - alphaServer.js //alpha服务器
  - config.js      //项目配置文件
  - router.config.js //集中路由
+ src
  + components //公共组件
  + layouts    //骨架布局
  + models     //redux和redux-saga目录
  + pages      //路由页面
  + services   //api目录
  + utils      //工具类
    - request.ts //http请求工具，无限轮询模式
    - utils.ts   //全局工具类
  - app.ts     //app基础类，此处配置dva-logger插件
```
