export default [
	//登陆Layout
	{
		path: '/login',
		component: '../layouts/LoginLayout',
		routes: [
			//login
			{ path: '/login', redirect: '/login/index' },
			{ path: '/login/index', name: 'login', component: './Login' },
			{ path: '/login/register', name: 'login', component: './Login/Register' }
		]
	},
	//内容Layout
	{
		path: '/',
		component: '../layouts/BasicLayout',
		Routes: ['src/pages/Authorized'],
		authority: ['admin', 'user'],
		routes: [
			// dashboard
			{ path: '/', redirect: '/dashboard' },
			{ path: '/dashboard', name: 'dashboard', component: './Dashboard' },
			{ path: '/dashboard/info', name: 'info', component: './Dashboard/Info' }
		]
	}
];
