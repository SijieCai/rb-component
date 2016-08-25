import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
global.React = React;
import {render} from 'react-dom';
import {Router} from 'react-router';
import {RBAuthRoute} from 'components';
import {useRouterHistory} from 'react-router';
import {createHistory} from 'history';

const browserHistory = useRouterHistory(createHistory)({
  basename: "/doc"
});


const rootRoute = RBAuthRoute({
  path: '/',
  chunkLoader(cb) {
    cb(
      require('./home'),
      require('./routes/md'),
      require('./routes/component')
    );
  }
});

RBAuthRoute.onEnter = (nextState, replace, allowEnterCallback)=>{
  var pathname = nextState.location.pathname;
  if(pathname === '/') {
    replace('/md/page/index');
    return allowEnterCallback();
  }

  if(pathname === '/component') {
    replace('/component/detail/RBTable');
    return allowEnterCallback();
  }
  if(pathname === '/md') {
    replace('/md/page/index');
    return allowEnterCallback();
  }
  allowEnterCallback();
};
render(
  <Router history={browserHistory} routes={rootRoute}/>,
  document.getElementById('app')
);
