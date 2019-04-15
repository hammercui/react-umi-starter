/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line jsx-a11y/label-has-associated-control
/* eslint-disable import/no-named-as-default */
// https://umijs.org/config/
import os from 'os';
// eslint-disable-next-line import/no-named-as-default-member
import pageRoutes from './router.config';
// import webpackPlugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      targets: {
        ie: 11,
      },

      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
      // 按需加载
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/PageLoading/index',
        level:1
      },
      ...(!process.env.TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'lodash', 'moment'],
              exclude: ['@babel/runtime'],
            },
            hardSource: true,
          }
        : {}),
    },
  ],
];

// judge add ga
if (process.env.APP_TYPE === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

const config = {
  // add for transfer to umi
  plugins,
  history: 'hash', // 解决打包刷新后刷新路由问题
  targets: {
    ie: 11,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // externals: {
  //   '@antv/data-set': 'DataSet',
  // },
  proxy: {
    '/api/': {
      target: 'http://localhost:7001/',
      // target: 'http://47.104.239.185/',
      changeOrigin: true,
      pathRewrite: { '^/': '' },
    },
    '/github': {
      target: 'https://api.github.com/',
      changeOrigin: true,
      pathRewrite: { '^/github': '/' }, // 实际的请求路径 https://api.github.com/users/octocat
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },

  // outputPath: './megaconsole', // 导出路径
  // publicPath: '/megaconsole/', // 导出index引用带megaconsole前缀
  hash: true, // 导出文件带hash

  // manifest: {
  //   basePath: '/megaconsole',
  // },
  // 该字段控制动态修改主题
  // chainWebpack: webpackPlugin,//改善经常编译95%的问题
};

// 生产环境 去掉console
if (process.env.NODE_ENV === 'production') {
  config.extraBabelPlugins = ['transform-remove-console'];
  console.log('生产环境新增babel插件：transform-remove-console \n');
}

export default config;
