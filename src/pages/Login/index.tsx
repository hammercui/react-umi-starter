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
import * as styles from "./index.less"
import {  Form, Button } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'react-router-dom';

export interface ILoginPageProps extends RouteComponentProps,FormComponentProps  {
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
			<div  className={styles.main}>
				i am 登录页
				<Button onClick={this.handleLogin} type="primary">登陆</Button>
			</div>
		);
	}
}

export default Form.create()(LoginPage) ;
