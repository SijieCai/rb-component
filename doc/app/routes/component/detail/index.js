import {RBAuthRoute} from 'components';
export default RBAuthRoute({
  path: 'detail(/:name)',
  chunkLoader(cb) {
    require(['./home'], cb);
  }
});
