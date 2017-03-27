import RBAuthRoute from 'components/rb-auth-route';
export default RBAuthRoute({
  path: 'md',
  chunkLoader(cb) {
    require(['./home', './page'], cb);
  }
})
