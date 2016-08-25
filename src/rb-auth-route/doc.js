function render({Link}) {
  return (
    <div>
    <div>代码实例，详情查看 <Link to="/md/route">Reboots路由系统</Link></div>
    <pre>
      {`import React from 'react';\nglobal.React = React;\nimport {render} from 'react-dom';\nimport {Router} from 'react-router';\nimport {RBAuthRoute} from 'rb-component';\nimport {useRouterHistory} from 'react-router';\nimport {createHistory} from 'history';\n\n// 使用url前缀，支持多入口\nconst browserHistory = useRouterHistory(createHistory)({\n  basename: "/doc"\n});\n\nconst rootRoute = RBAuthRoute({\n  path: '/',  //当前层级url\n  chunkLoader(cb) {\n    cb(\n      require('./home'), //当前结构 （Reac.Component)\n      require('./routes/md'), //叶子节点2（RBAuthRoute实例）\n      require('./routes/component') //叶子节点2 (RBAuthRoute实例)\n    );\n  },\n  //onEnter(...args) {/*默认RBAuthRoute.onEnter(...args)*/}\n  //可选参数，如果提供，全局onEnter逻辑在此层级会被忽略，一般用于需要跳过权限验证的的路由\n});\n\n// 路由全局钩子，可以在此做通用权限验证\nRBAuthRoute.onEnter = (nextState, replace, allowEnterCallback)=>{\n  asyncCheckAuth(nextState).then(allowEnterCallBack).catch(replace(nextUrl));\n};\n\nrender(\n  <Router history={browserHistory} routes={rootRoute}/>,\n  document.getElementById('app')\n);\n`}
    </pre>
    </div>
  );
}