## 1.简介
不论是CJS还是ESM的出现都是为了在前端方案中实现模块化
|模块化方案|全称|适用范围|
|---|---|---|
|CJS|CommonJS|Node端|
|ESM|ES Module|Node端和浏览器|

其余方案现在用的已经很少了，如AMD、CMD、UMD
现在使用更多的则是ESM方案，因为它是ES6推出的模块化标准，且同时支持Node端与浏览器端

## 2.在项目中使用CommonJS

```
// src/cjs/module.cjs

function cjsFn(){
    console.log('i am from cjs module')
}
const cjsStr = 'i am cjs strings'
module.exports = {
    cjsFn,
    cjsStr
}
```

```
// src/cjs/index.cjs

const {cjsStr,cjsFn} = require('./module.cjs')
cjsFn()
console.log(cjsStr)
```
CJS的模块导出使用的是module.exports,可以直接导出单个数据，也可以将多个数据放在对象字面量中进行导出

导入则需要使用require关键字，后跟文件名，只有js文件可以省略扩展名

重命名则使用`:`即可
```
const {cjsStr:myStr,cjsFn} = require('./module.cjs')
console.log(myStr)
```

## 3.项目中使用ES Module
一个模块中只能有一个默认导出export default，export可以导出多个数据

接收语法是`import...from...`
接收export default默认导出时import后不能接{}，接收export导出的数据时只能使用{}
```
// src/esm/module.mjs

export  function esmFn(){
    console.log('i am from esm module')
}

export  const esmStr = 'i am esm strings'

export default function defaultFn(){
    console.log('i am defaultFn')
}
```

```
// src/esm/index.mjs
import {esmFn,esmStr} from './module.mjs'
import myFn from './module.mjs'

esmFn()
myFn()
console.log(esmStr)
```
