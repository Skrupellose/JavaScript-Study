- [1.下载node并完成配置](#1下载node并完成配置)
- [2.初始化项目](#2初始化项目)
- [3.了解package.json文件](#3了解packagejson文件)
- [4.配置脚本命令](#4配置脚本命令)
  - [知识点：npm run xxx的过程中发生了什么事？](#知识点npm-run-xxx的过程中发生了什么事)
## 1.下载node并完成配置
`node -v` 输出版本号则安装成功

## 2.初始化项目
在项目文件夹下运行`npm init`命令初始化一个node项目,之后填写对应的项目信息,会记录在`package.json`这个文件中

## 3.了解package.json文件
package.json文件的各字段名与含义如下：
|字段名|含义|
|---|---|
|name|项目名称，也作为npm包名|
|version|项目版本号，若需要发布成npm包则必须填写且符合语义化版本号的要求
|description|项目描述|
|keywords|关键词，用于npm网站的搜索|
|homepage|项目官网|
|main|项目的入口文件|
|scripts|指定项目运行脚本的命令缩写|
|author|作者信息|
|license|许可证信息|
|dependencies|项目的生产依赖|
|devDependcies|项目的开发依赖|
|type|配置Node对CJS和ESM的支持|

type有两个值：commonjs和module对应cjs和esm

## 4.配置脚本命令
其实我们之前在vue脚手架等使用的命令如：`npm run dev`、`npm run build`本质上是运行的起了别名的命令
，我们可以在package.json的scripts字段看到对应的命令

其中脚本的结构为：命令缩写 + 完整命令
以Vue-Cli为例
```
{
    "scripts":{
        "serve":"vue-cli-service serve",
        "build":"vue-cli-servece build"
    }
}
```
我们在命令行下运行`npm run serve`就等同于运行`npm run vue-cli-service serve`

### 知识点：npm run xxx的过程中发生了什么事？
紧跟上面的Vue-Cli的例子，我们说别名可以为我们简化命令，但是如果直接运行`vue-cli-service serve`会报错，因为操作系统并没有这一条指令。但是为什么`npm run vue-cli-service serve`不会报错呢？

1.我们在下载第三方包的时候
`npm i @vue/cli-service`时就会在node_modules文件夹下的bin目录中创建好`vue-cli-service`打头的几个可执行文件了，bin目标下的文件是软链接

2.我们运行对应命令的时候，npm就会到bin目录下寻找对应的可执行文件

3.在我们安装的第三方包的package.json文件中的bin字段就有该包的对应可执行文件，用于在安装时创建软链接指向bin中的地址

4.同样的首先运行命令的时候，npm先从项目的`node_modules`文件夹下的`bin`目录寻找可执行程序，找不到则从全局的`node_modules`去寻找，最后再去`path环境变量`中去寻找