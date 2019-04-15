import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

// const Authority = getAuthority();
const Authorized = RenderAuthorized(getAuthority());

export default ({ children }) => {
  console.log('children.props.route.authority', children.props.route.authority);
  return (
    <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
      {children}
    </Authorized>
  );
};
