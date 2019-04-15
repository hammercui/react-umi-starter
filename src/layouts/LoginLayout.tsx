import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './LoginLayout.less';
import logo from '../assets/logo.png';
import Footer from './Footer';
import DocumentTitle from 'react-document-title';



const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 美嘉科技WEB技术部出品
  </Fragment>
);

@connect(({ global }) => ({
  serverEnv: global.serverEnv,
}))
class UserLayout extends React.PureComponent<any> {


  render() {
    const { children, serverEnv } = this.props;
    return (
      <DocumentTitle title="登陆" >
      <div className={styles.container}>

        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>MEGA 应用管理</span>
              </Link>
            </div>
            <div className={styles.desc}>本系统是美嘉科技所有产品不可分割的一部分</div>
          </div>
          {children}
        </div>
        <Footer/>
      </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
