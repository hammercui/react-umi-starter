/*
 * @Description: 登录页基础布局
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-01-19 10:46:44
 * @LastEditors: hammercui
 * @LastEditTime: 2019-01-21 11:51:21
 */

import React from 'react';
import * as styles from './LoginLayout.less';
import Link from 'umi/link';

export type LoginLayoutComponent<P> = React.SFC<P>;

export interface LoginLayoutProps extends React.Props<any> {
	history?: History;
	location?: Location;
}


const renderNavigation= ()=> {
  return (
    <div>
      <Link to="/login/index">登录页</Link>
      <div> | </div>
      <Link to="/login/register">注册页</Link>
    </div>
  );
}

const LoginLayout: LoginLayoutComponent<LoginLayoutProps> = props => {
	return (
		<div className={styles.normal}>
			<h1 className={styles.title}>LoginLayout头部</h1>
      {renderNavigation()}
      {props.children}
      <h1 className={styles.title}>LoginLayout页脚</h1>
		</div>
	);
};

export default LoginLayout;
