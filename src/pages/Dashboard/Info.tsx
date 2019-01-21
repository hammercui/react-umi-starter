import React from 'react';
import * as styles from './index.less';

import { Ilist } from './models/list';
import { connect } from 'dva';

export interface IinfoProps {
	list: Ilist;
	dispatch: Function;
}

@connect(({ list }) => ({
	list: list
}))


export default class Info extends React.Component<IinfoProps, any> {
  //测试更新
	handleUpdate = () => {
		const { list, dispatch } = this.props;
		const newScore = list.dataArray[5].score + 10;
		const payload = { id: 5, score: newScore };
		dispatch({
			type: 'list/updateList',
			payload: payload
		});
	};

	render() {
		const { list } = this.props;
		return (
			<div className={styles.normal}>
				info页面
				<div>演示immutable.js的List的使用</div>
				<button onClick={this.handleUpdate}>测试更新数据</button>
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
		);
	}
}
