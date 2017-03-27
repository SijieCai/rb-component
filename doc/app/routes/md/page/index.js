import RBAuthRoute from 'components/rb-auth-route';
export default RBAuthRoute({
  path: 'page(/:name)',
  chunkLoader(cb) {
    cb(
      require('./home')
    );
  }
})
