
import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
const { Footer } = Layout;

export default function FooterView(props){
  return <Footer style={{ padding: 0 }}>
    <GlobalFooter
        // links={[
        // 	{
        // 		key: 'github',
        // 		title: <Icon type="github" />,
        // 		href: 'http://gitlab.53site.com/mega/internal/ConsoleSystem',
        // 		blankTarget: true
        // 	}
        // ]}
        copyright={
          <Fragment>
            Copyright <Icon type="copyright" /> 2019 美嘉科技WEB技术部出品
          </Fragment>
        }
      />
  </Footer>
}
