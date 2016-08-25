import {RBAuthRoute} from 'components';
export default RBAuthRoute({
  path: 'page(/:name)',
  chunkLoader(cb) {
    cb(
      require('./home')
    );
  }
})
