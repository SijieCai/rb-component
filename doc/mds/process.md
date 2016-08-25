## 开发环境相关



### 开发流程

我们总结出典型的上线流程包含5步，
![enter image description here](/images/process.png "")

他们分别对应一个环境变量名 environment, `dev`， `devtest`， `test`， `beta`，`production`(或者 `dist`）。

如果需要在本地使用 webpack-dev-server 查看调试对应环境，执行 

```
npm start <environment>
```

如果需要打包生成代码，执行 
```
npm run release:<enviroment>
```

上面所说的上线流程，本质上就是一个环境变量的输入，在 webpack.config.js 文件中会解析获取这个变量，然后由两个模块消化这个变量。

它们是

![enter image description here](/images/env-digest.png "")

#### 系统配置

`系统配置`：比如开发环境，测试环境，beta和线上，要求我们使用不同的后端接口，并且启用不同的log模式，伪代码如下：

``` javascript
// 文件 environment.bin, 以bin结尾避免jslint，用webpack import-loader在编译时注入 enviroment 的值.
export default environment;
```

``` javascript
// 文件system-config.bin

import environment from './environment.bin';

var config;
switch(environment) {
  case: 'dev':
    config = {api: 'http://dev.api', debug: true};
    break;
  case: 'test':
    config = {api: 'http://test.api', debug: true};
    break;
  case: 'bata':
    config = {api: 'http://beta.api', debug: false};
    break;
  case: 'production':
    config = {api: 'http://production.api', debug: false};
    break;
  ... 
}

export default config;

```

这样我们就可以隔离因环境导致的配置变化，提高可维护性。


#### 代码编译

我们希望开发环境能快速编译并提供尽可能多的错误提示（source-map），而测试、beta和线上环境应当尽量保持一致，并且把性能做到精致，比如代码压缩。伪代码如下：

``` javascript
// 文件 webpack.config.js
var configs = baseWebpackConfig;

configs.dev = _.merge({
  cache: true,
  devtool: 'inline-source-map'
}, base);
configs.test = config.beta = configs.production = _.merge({
  cache: false,
  devtool: 'eval',
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, base);
module.exports = configs[environment];

```
