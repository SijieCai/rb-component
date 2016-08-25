function RBAuthRoute(config) {
  var {chunkLoader, path, onEnter} = config;

  var route = {
    path,
    getComponent(location, cb) {
      chunkLoader(entry => cb(null, (entry && entry.default) || entry));
    },
    onEnter(nextState, replace, callback) {
      (onEnter || RBAuthRoute.onEnter)(nextState, replace, callback);
    },
    getChildRoutes(location, cb) {
      chunkLoader((...files)=> cb(null, files.slice(1).map(f=>f.default || f)));
    }
  };
  return route;
}

RBAuthRoute.onEnter = function(a, b, c) {
  c();
}

export default RBAuthRoute;
export {RBAuthRoute};
