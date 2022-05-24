## tips：npm配置国内镜像源
```
npm config set registry https://registry.npmmirror.com // 设置
npm config get registry // 查看
npm config rm registry  // 删除
```

## 1.TypeScript
TypeScript是JavaScript的超集，新增类型系统，解决JS作为一门动态语言时可能因为类型原因可能触发报错的问题

## 2.安装
需要安装以下包：
- typescript 这个包是用 TypeScript 编程的语言依赖包
- ts-node 是让 Node 可以运行 TypeScript 的执行环境
- tslib 提供ts辅助函数以及运行时环境
- @types/node 包含Node.js的类型定义

这几个包都是我们在开发过程中使用的

`npm install -D typescript ts-node tslib @types/node`


## 3.使用
### 用TS定义原始数据类型

|原始数据类型|Javascript|TypeScript|
|---|---|---|
|字符串|String|string|
|数字|Number|number|
|布尔值|Boolean|boolean|
|大整数|BigInt|bigint|
|符号|Symbol|symbol|
|不存在|Null|null|
|未定义|Undefined|undefined|

原始数据类型的类型定义可以省略，TypeScript会帮你进行推导
```
const str: string = 'hello typescript'
const num: number = 123
const bool: boolean = true

等同于
const str = 'hello typescript'
const num = 123
const bool = true
```

### 用TS定义引用类型
数组类型定义
类型声明格式：类型+[ ] eg: string[ ]
```
const strs = string['hello','world']
```


对象类型定义
对象的类型定义采用大驼峰命名

定义一个对象类型,属性后添加`?`表示属性为可选
```
interface UserItem{
    name:string,
    age?:number
}
const user:UserItem = {
    name:'john'
}
```
同时还可以实现继承
```
interface Admin extends UserItem {
    power:number
}
const admin: Admin = {
    name: 'John',
    power: 5
}
```
