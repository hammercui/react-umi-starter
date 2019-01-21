const dva = {
	config: {
		onError(e) {
			e.preventDefault();
			console.error(e);
		}
	},
	plugins: []
};

//非生产模式
if(process.env.NODE_ENV !=  'production'){
  dva.plugins.push(
    require('dva-logger')({
			duration: false, // print the duration of each action?
			diff: false,
			level: 'info',
			predicate: (getState: Function, action: any) => {
				let type: string = action.type;
				if (type.startsWith('@@')) return false;
				return true;
			} // 是否过滤action
		})
  )
}

module.exports = {
  dva,
}
