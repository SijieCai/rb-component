import RBAuthRoute from 'components/rb-auth-route';
export default RBAuthRoute({
  path: 'component',
  chunkLoader(cb) {
    require([
      './home',
      './detail'
    ], cb);
  }
})
