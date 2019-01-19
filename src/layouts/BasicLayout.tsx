/*
 * @Description: 信息页基础布局
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-01-19 17:03:17
 * @LastEditors: hammercui
 * @LastEditTime: 2019-01-19 19:00:59
 */

import React from 'react';
import Link from 'umi/link';

export default class BasicLayout extends React.Component {
	renderNavigation() {
		return (
			<div>
				<Link to="/dashboard">/dashboard</Link>
        <div> | </div>
        <Link to="/dashboard/info">/dashboard/info</Link>
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
