## 组件

[rb-component](https://github.com/sijiecai/rb-component)  组件针对一些场景封装的组件能帮助快速开发项目。如果用 reboots 搭建项目默认会添加这个组件。

### 安装 rb-component

    npm install rb-component --save

### 在项目中使用组件

ES6 

    import RBTable from 'rb-component';

CMD

    var RBTable = require('rb-component');


组件会提供简单的默认样式，样式按照 BEM 方式命名，如果希望自己定义样式，可以应用不带样式的组件如下：

    import RBTable from 'rb-component/lib/rb-table/component';



### 组件设计初衷

和 react-bootstrap （bootstrap 的 react 封装） 相比较，bootstrap 为样式定义了高度内聚的样式支持，而对场景业务的支持相对较少。因为实际项目中，样式改动往往频繁而且复杂，而逻辑的变动相对较小，对高度内聚的样式进行调整而不引起全局污染或者被污染，是一件很琐碎而且容易出错的难题。所以我们在样式上放弃了内聚，拥抱组件化的隔离思路。对 JavaScript 表达的逻辑进行更多的抽象和设计。

* 使用 [BEM](https://segmentfault.com/a/1190000000391762) 作为所有组件的设计准则。
* rb-component 数据的表现组件（[presentational component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.s1das6ktm)）
* 输入组件实现`受控`和`不受控`[模式](https://facebook.github.io/react/docs/forms.html)


### 组件sublime插件
为了快速生成使用组件，我们开发了 [reboots-sublime-plugin](https://github.com/SijieCai/reboots-sublime-plugin), 只要直接拷贝到 sublime 的 packages 目录重启就可以使用。

输入 rb 就可以考到组件列表，按 tab 就会自动生成组件的完整声明和所有参数列表。


![enter image description here](/images/sublime-plugin.png "")
