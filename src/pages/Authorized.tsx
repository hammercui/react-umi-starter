import React from 'react';

//authority={children.props.route.authority}
export default ({ children }) => {
	console.log('children.props.route.authority',children.props.route.authority);
	return <div>{children}</div>;
};
