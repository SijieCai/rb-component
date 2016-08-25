## 介绍

reboots是React在大型企业应用上一个方案总结，我们对项目结构，可维护性和性能高度优化。

### 谁会用到reboots

你对React已经有一定了解，但是想深入学习如何用React开发企业级产品，这涉及到许多其它的技术框架，配置优化和工程化思考。

reboots提供的react方案主要针对大型企业应用，性能和可扩展性，可维护性使我们主要思考的问题。先看看方案描述，了解你的项目场景适不适合用React框架，通过命令行帮助你快速实现项目配置，相信我，不要被那复杂的配置和文件结构所吓倒，如果你重新开始，也是殊途同归，如果你有更好的建议，请不吝反馈。

你对前端技术框架有相当了解，在权限架构，应用模式和持续集成等更高层抽象需求，reboots就是这样一个轮子。完整的文档描述请查看 www.reboots.cn/doc/

### 快速开始

    npm install reboots -g 
    reboots new project 
    cd project 
    reboots entry admin
    reboots entry doc
    npm install 
    npm start

打开浏览器访问 http://localhost:8360/admin 和  http://localhost:8360/doc。

如果需要使用sass，postcss，less或者stylus

    reboots style [name]
    npm install

### reboots特性

Reboots提供项目架构方案，包括
一键添加入口页面，自动生成所有配置，支持登录页，主程序，文档，静态页等异构页面一键打包的需求。

提供三种模式的开发和打包
develop模式，开发支持包括eslint代码检查，保存自动编译刷新，react热替换模式，使用babel 6 支持ES6/7。
hot模式与develop相比没有自动刷新功能，但是会自动热加载页面，这种模式适合于与redux一起使用，适合在调试样式时使用。
production模式，也develop模式相比，更注重性能，使用了一系列优化器如代码压缩。

一键设置支持测试驱动开发。
一键设置支持sass，less或者stylus。
支持redux或者reflux，并生成不同的结构。

持续集成，只是用npm命令一键打包（没有使用bower或者grunt），提供代码分析和改进建议。

路由方案：一键配置并生成目录结构。

管理系统路由方案，集成权限验证，菜单生成，代码分块灵活配置。

文档系统路由方案，自动生成目录结构（TOC），


