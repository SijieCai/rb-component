const func = new Function;


function RBAuthRoute(config) {
  var {path, chunkLoader, getModel, onEnter=RBAuthRoute.onEnter, onLeave=RBAuthRoute.onLeave, ...rest} = config;

  var callLoader = (route, cb)=>{
    chunkLoader(result=>{
      cb(RBAuthRoute.loaderMiddleware(route, result))
    })
  }
  var route = {
    path,
    getComponent(location, cb) {
      callLoader(route, ({component})=>{
        cb(null, component.default || component, location);
      });
    },
    getChildRoutes(location, cb) {
      callLoader(route, ({childRoutes})=>childRoutes && cb(null, childRoutes.map(f=>f.default || f)) );
    },
    getModel(cb) {
      callLoader(route, ({model})=>model && cb(model));
    },
    onEnter(a, b, c) {
      function allowEnter() {
        RBAuthRoute.entering(route, a, b);
        c();
      }
      onEnter(a, b, allowEnter);
    },
    onLeave(...props) {
      RBAuthRoute.leaving(route, ...props);
      onLeave(...props);
    },
    ...rest
  };
  return route;
}

RBAuthRoute.loaderMiddleware = (route, result)=>result;
RBAuthRoute.onEnter = function(a, b, c) {
  c();
}
RBAuthRoute.entering = func;
RBAuthRoute.leaving = func;
RBAuthRoute.onLeave = func;


module.exports = RBAuthRoute;
