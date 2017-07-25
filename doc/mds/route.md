## Reboots路由方案介绍

技术栈： ReactJS React-Router Webpack

指标特点： 用户端路由方案，使用非hash（#）格式，支持多入口，支持页面分块和按需加载，支持权限认证。

适用场景和限制： 适用于大型超大型企业应用，混合移动应用。对于不支持history接口的浏览器在切页时候采用刷新页面的fallback方案。SEO需要服务器端特殊支持。

### 前后端渲染

简单的对用户来说，输入特定的url，浏览器显示相应的页面。在介绍如何Reboots用户端路由方案实现之前，先介绍网页渲染的两种方式：服务器端渲染和用户端渲染。

`服务器端渲染`
当服务端接收到请求的时候，会解析url并渲染相应的页面后返回，页面的渲染通常使用模板技术（ejs jade swig nunjucks等)来更好的管理页面和组件。所以这种对应关系包含了URL与控制器的映射关系（路由配置），以及控制器与页面内容组装的关系（模板渲染）。这种技术在返回的时候页面内容就已经被填充好。但即使这样，页面也需要JavaScript，因为许多交互只能用JavaScript完成，很长一段时间的实现是在服务器端渲染页面上铺一层JavaScript，最著名的就是JQuery，随着复杂度增加，同时使用两种技术（模板技术，JQuery）维护页面变得复杂而难以维护。


`用户端渲染`
随着AJAX的流行浏览器技术标准的进步，用户端JavaScript变得飞快，越来越多的逻辑被转移用户端，以获得更低的延迟和更丰富的体验。这时候url与页面已经没有严格关系，一般说的单页应用（SPA）只有一个页面入口，当页面加载完成后，所有的交互都由前端的脚本负载，页面内容的加载变得灵活多变，可以一次性全部打包获取(小型项目或者移动端），也可以实现按需加载。而服务器端的职责变得简单清晰，一是静态资源服务器，二是提供页面交互所需的接口服务。一些前段框架如ReactJs，AngularJs，Backbone等等就是专门为单页应用而生。这种技术在具有复杂交互的系统中能提供更好的体验--减少页面刷新和延迟。对比服务器端渲染而言，这种技术的优点是对搜索引擎不友好，浏览器的缓存支持差，额外的框架文件对移动浏览器（hybrid 另说）来言是一个负担。所以说虽然前端框架发展迅速，但也有自己的局限性，需要根据自己项目情况选型。

### 原理概述 
前端路由框架更新发展较快，而且互相学习，虽然文档描述各有侧重，但功能和特性本质趋同，比如Angular UI Router, Ember的Router，包括我们实现用到的React-Router，都是互相借鉴。抛开具体的框架实现，我们原理上分析框架特性。

### 嵌套的视图和状态
在一个项目经常会出现如下图的设计需求，产品要求我们需要制作5个页面，其中各个字母代表的含义是：
A：一级顶部菜单
B：二级左侧菜单
F：三级标签菜单
C, D, E, G, H...：页面

![enter image description here](/images/page-patterns.png "典型页面布局")

这非常简单，很快我们设计路由方案并完成了原型，基本就是利用组件化思路分别将 A ~ H 独立封装，然后组合成5个单独的页面。如图：

![enter image description here](/images/route1.png "典型页面布局")

这种方案利用了组件化的优势，将出现频率较高的A和B组件封装，设计简单明了。我们成功的交付了一期功能并开始了二期总共20个页面的开发。然后遇到一个严重问题，我们需要支持页面的权限控制，这意味着原来包含菜单的页面（5个A页面，4个B页面，2个F页面）都需要调整，具体就是在每个页面通过ajax获取树形结构的菜单数据，然后把树的一级树节点传到A，二级树节点传给B，以及三级树节点传给F，由于数据是联动的（A菜单的改变导致B和C改变），导致我们无法将逻辑封装到每个组件里面。这简直是噩梦，问题出现在如果组件发生变化导致改动，需要对多个页面的同一组件调整，重复代码导致高维护成本？想到小学里面的公因数，这个问题的理想情况应该如下


![enter image description here](/images/route2.png "页面组件树状表示")

这样路由就相当于这颗树从根部开始到叶子节点的某一条路径，比如

![enter image description here](/images/nestroute2.png "页面组件树状表示")

这样的好处非常明显，你需要重复声明的组件数量变少了，无论你的页面再多，A组件只需要声明一次。考虑到实际应用中，每一个页面（从根部到叶子节点的一条路径）可以通过跳转等方式到达另一个页面，这棵树就是一种[状态机](https://en.wikipedia.org/wiki/Finite-state_machine)，所以也有人把这种路由成为基于状态的路由方案（state based router），比如著名的[Angular UI-Router](http://angular-ui.github.io/ui-router/1.0.0-alpha.3/)。

#### 嵌套视图代码

```javascript
//A代码（程序入口）---------------------------
import {AuthRoute} from 'auth';
var rootRoutes = AuthRoute({
  path: '/A',
  chunkLoader(cb) {
    cb(
      require('./compnent-A'), //第一个参数代表当前节点
      require('./B'), //子节点
      require('./E')  //子节点
    );
  }
});

render(
  <Router routes={rootRoutes}/>,
  document.getElementById('app')
);
```

```javascript
//B代码---------------------------
import {AuthRoute} from 'auth';
export default AuthRoute({
  path: '/B',
  chunkLoader(cb) {
    cb(
      require('./component-B'), 
      require('./C'), 
      require('./D'),
      require('./F')
    );
  }
});

```

```javascript

//F代码---------------------------
import {AuthRoute} from 'auth';
export default AuthRoute({
  path: '/F',
  chunkLoader(cb) {
    cb(
      require('./component-F'),
      require('./G'),
      require('./H')
    );
  }
});
```

### 文件分块
在大型系统中，如果代码编译成单个文件，首次加载的速度就不理想，把文件分块并按需加载很有必要。
和一般页面结构的程序不一样，嵌套结构的分页不是按照一个路由一个页面来分块，而是按照树的节点切开，本文例子如果按下图分成三块
![enter image description here](/images/nestroute3.png "")

这样如果用户访问页面，对于分块的加载关系如下


![enter image description here](/images/nestroute4.png "")

#### 文件分块代码
文件代码分块的核心是webpack区分对待CMD和AMD的写法，如果是AMD写法会产生分块。具体定义可以查看webpack[官方文档](https://webpack.github.io/docs/code-splitting.html)。上面的嵌套视图代码最终只会打包成一个文件，如果需要获得如上代码分块，对于的写法如下


```javascript

//A代码（程序入口）---------------------------
import {AuthRoute} from 'auth';
var rootRoutes = AuthRoute({
  path: '/A',
  chunkLoader(cb) {
    cb(
      require('./compnent-A'), //第一个参数代表当前节点
      require('./B'), //子节点
      require('./E')  //子节点
    );
  }
});

render(
  <Router routes={rootRoutes}/>,
  document.getElementById('app')
);

```


```javascript

//B代码---------------------------
import {AuthRoute} from 'auth';
export default AuthRoute({
  path: '/B',
  chunkLoader(cb) {
    require(['./component-B', './C', './D', './F')], cb)
    );
  }
});

```

```javascript

//F代码---------------------------
import {AuthRoute} from 'auth';
export default AuthRoute({
  path: '/F',
  chunkLoader(cb) {
    require(['./component-F', './G', './H'], cb);
  }
});

```

#### 文件分块的背后原理
 * 分块文件用webpackJsonp包装 x.chunk.js
 * 在调用处改成往document末尾插入script标签
 * 其中AMD的require.ensure和require不太一样
require.ensure only loads the modules, it doesn’t evaluate them.
require loads and evaluate the modules. In webpack modules are evaluated left to right.

### 权限控制
权限控制的背后逻辑很简单，需要拦截所有页面请求，然后从后端获取权限列表进行判断。

Reboots默认提供了一个简洁方案，AuthRoute的 onEnter 函数会在每一个路由发生的时候调用，只有调用第三个参数后，路由才会生效。前两个参数包含目标路由和重定向方法，需要注意的是不能直接用 window.location，否者会导致页面的刷新。这种设计使得异步获取权限进行判断提供了很大便利。

AuthRoute的内部实现基于react-router的[动态路由](https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md)，请参考react-router获取更多详细。


```javascript
AuthRoute.onEnter = (nextState, replace, allowEnterCallback)=>{
  var nextPathname = nextState.location.pathname;
  aysncGetAuthorizationData().then(list=>{ //通常做缓存
    if(list.indexOf(nextState)){
      allowEnterCallback(); //调用函数允许访问
    } else { 
      replace('/unauth');  //显示无权限页面
    }
  });
};
```

### 多入口
通常单页应用只有一个入口文件，但是reboots方案的权限控制做了一个假设，一个入口文件内的权限判断是一致的，也就是只有一个onEnter函数，而实际项目中，一个项目里面也会包含文档页，介绍页其它性质的页面时，就需要通过多入口来满足这个场景。在webpack里面配置多入口比较繁琐，可以用reboots命令

    reboots entry entryName

这个命令做了如下操作
* 配置`webpack.entry.entryName`。
* 配置`webpack.alias.entryName`, 目的为了方便的访问入口对应的文件和里面的业务化组件。
* 配置`webpack.devServer.historyApiFallback.entryName`, 使得能用webpack dev server方便调试browserHistory的路由
* 生成对应的文件结构

生成完了以后，直接访问 http://youhost/entryName 就能看到欢迎页面。

### History

前端路由之所以能免刷新跳转同时响应url，正是基于[history](https://developer.mozilla.org/en-US/docs/Web/API/Window/history)，你可能会问，为什么不直接用hash就好呢（hash改变也不会导致页面加载）。
其实默认的react-router就是基于hash来标记url，举例 http://domain/#A-B-E，然后很多人包括本文并不推荐这种方案，reboots默认基于 [browserHistory](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md)，理由如下

* hash的初衷是用来处理页面锚点等场景，保留hash使用可以为后续开发提供便利
* 服务端渲染只能用browserHistory
* hash长得丑

但是一些老的浏览器不支持History对象，这时候browserHistory的兼容方案是每一次跳转都会重新刷新页面，但是谁用react开发IE6的程序呢？


```javascript
import {useRouterHistory} from 'react-router';
import {createHistory} from 'history';

const browserHistory = useRouterHistory(createHistory)({
  basename: "/entryName"
});

.....此处省略其它代码

render(
  <Router history={browserHistory} routes={rootRoute}/>,
  document.getElementById('app')
);
```

这是入口文件的代码，每一个入口文件都在一个basename上，具体的路由规则是 http://domian/entryName/A/B/...



