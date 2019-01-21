/*
 * @Description: 信息页基础布局
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-01-19 17:03:17
 * @LastEditors: hammercui
 * @LastEditTime: 2019-01-21 11:50:43
 */

import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
export interface IBasicLayoutProps{
  dispatch:Function
}
@connect(({ login }) => ({
}))
class BasicLayout extends React.PureComponent<IBasicLayoutProps,any> {
  constructor(props) {
    super(props);
  }

	handleLogout = ()=>{
    const { dispatch } = this.props;
		dispatch({
			type: 'login/fetchLogout'
		});
	}

	renderNavigation() {
		return (
			<div>
				<Link to="/dashboard">/dashboard</Link>
				<div> | </div>
				<Link to="/dashboard/info">/dashboard/info</Link>
				<div> | </div>
				<div onClick={this.handleLogout}>登出</div>
			</div>
		);
	}

	render() {
		const { children } = this.props;
		return (
			<div>
				<h1>BasicLayout头部</h1>
				{this.renderNavigation()}
				{children}
				<h1>BasicLayout页脚</h1>
			</div>
		);
	}
}

export default BasicLayout;
