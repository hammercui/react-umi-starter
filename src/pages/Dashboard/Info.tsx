import React from 'react';
import * as styles from './index.less';

import { Ilist } from './models/list';
import { connect } from 'dva';
import {Layout, Card} from "antd";
import Link from 'umi/link';

export interface IinfoProps {
	list: Ilist;
  dispatch: Function;
  loading:boolean;
}

@connect(({ list, loading}:{list:Ilist;loading:IdvaLoading}) => ({
  list: list,
  loading:loading.effects['list/fetchUpdateList']
}))
export default class Info extends React.Component<IinfoProps, any> {
  //测试更新
	handleUpdate = () => {
		const { list, dispatch } = this.props;
		const newScore = list.dataArray[5].score + 10;
		const payload = { id: 5, score: newScore };
		dispatch({
			type: 'list/fetchUpdateList',
			payload: payload
		});
	};

	render() {
    console.log('渲染');
		const { list,loading } = this.props;
		return (
      <Layout>
        <Card>
        <div className={styles.normal}>
          info页面
          <Link to="/dashboard">返回dashboard</Link>
          <div>演示immutable.js的List的使用</div>
          <button disabled={loading} onClick={this.handleUpdate}>{loading?"loading":"测试更新数据"}</button>
          <ul>
            {list.dataArray.map((item, key) => (
              <li key={key} style={{ display: 'flex', margin: 10 }}>
                <div style={{ margin: 10 }}>{item.name}</div>
                <div style={{ margin: 10 }}>{item.id}</div>
                <div style={{ margin: 10 }}>{item.score}</div>
              </li>
            ))}
          </ul>
        </div>
        </Card>

      </Layout>
		);
	}
}
