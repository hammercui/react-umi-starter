import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  const authority = getAuthority();
  console.log('重载authority', authority);
  Authorized = RenderAuthorized(authority);
};

export { reloadAuthorized };
export default Authorized;
