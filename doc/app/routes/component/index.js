import {RBAuthRoute} from 'components';
export default RBAuthRoute({
  path: 'component',
  chunkLoader(cb) {
    require([
      './home',
      './detail'
    ], cb);
  }
})
