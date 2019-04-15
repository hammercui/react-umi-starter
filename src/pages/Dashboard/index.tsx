import React from 'react';
import * as styles from './index.less';
import router from 'umi/router';
import { Button } from 'antd';

export default function() {
  const loginOut = ()=>{
    router.replace("/login")
  }

  const goInfo = ()=>{
    router.replace("/dashboard/info")
  }

	return <div className={styles.normal}>
  dashboard页面
  <Button onClick={loginOut}>登出</Button>
  <Button onClick={goInfo}>info</Button>
  </div>;
}
