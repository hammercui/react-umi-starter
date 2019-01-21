import { List } from 'immutable';

export interface Istudent {
	name: string;
	id: number;
	score: number;
}

export interface Ilist {
	dataArray: Istudent[];
}

const getInit = (): Ilist => {
	const initValue: Ilist = {
		dataArray: []
	};
	for (let i = 0; i < 100; i++) {
		let name = 'name' + i;
		let id = i;
		let score = 70;
		initValue.dataArray.push({ name, id, score });
	}
	return initValue;
};

export default {
	state: getInit(),
	namespace: 'list',
	reducers: {
		initList(state, { payload }) {
			return state;
		},

		updateList(state: Ilist, { payload }): Ilist {
			let id: number = payload.id;
			let score = payload.score;
			//原list使用immutable生成新list
			let newlist: List<Istudent> = List(state.dataArray);
			newlist = newlist.update(id, val => {
				val.score = score;
				return val;
      });

			console.log('newlist', newlist.get(id));
			return { ...state, dataArray: newlist.toArray() };
		}
	}
};
