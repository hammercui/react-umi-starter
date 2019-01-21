/*
 * @Description: 登陆页
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-01-19 17:03:17
 * @LastEditors: hammercui
 * @LastEditTime: 2019-01-21 11:56:02
 */

import React from 'react';
import { connect } from 'dva';


export interface ILoginPageProps {
	dispatch: Function;
}

@connect(({ login }) => ({}))
class LoginPage extends React.Component<ILoginPageProps, any> {
	handleLogin = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'login/fetchLogin'
		});
	};

	render() {
		return (
			<div>
				i am 登录页
				<button onClick={this.handleLogin}>登陆</button>
			</div>
		);
	}
}

export default LoginPage;
