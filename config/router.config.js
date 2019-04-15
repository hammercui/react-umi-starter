// import appWolf from './router.app.wolf';
// import appLiao from './router.app.liao';

export default [
  // user
  {
    path: '/login',
    component: '../layouts/LoginLayout',
    routes: [
      { path: '/login', redirect: '/login/index' },
      { path: '/login/index', component: './Login/index' },
    ],
  },
  // basic
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // 主页
      { path: '/', redirect: '/dashboard' },
      { path: '/dashboard', name: 'dashboard', icon: 'dashboard', component: './Dashboard' },
      { path: '/dashboard/info', component: './Dashboard/Info' },
    ],
  },
];
