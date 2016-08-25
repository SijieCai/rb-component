import {RBAuthRoute} from 'components';
export default RBAuthRoute({
  path: 'md',
  chunkLoader(cb) {
    require(['./home', './page'], cb);
  }
})
