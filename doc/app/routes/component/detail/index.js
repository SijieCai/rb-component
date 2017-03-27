import RBAuthRoute from 'components/rb-auth-route';
export default RBAuthRoute({
  path: 'detail(/:name)',
  chunkLoader(cb) {
    require(['./home'], cb);
  }
});
