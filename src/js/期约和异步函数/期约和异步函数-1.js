/**
 * 1.promise是一种新的引用类型，可以通过new来实例化
 * 2.promise实例化的时候接收一个执行器函数
 * 3.执行器函数有两个函数参数，分别对应着成功和失败的处理函数
 * 4.两个函数作用是改变promise的状态，未改变的时候promise处于pending，成功置为fulfilled，失败置为rejected
 */

// new Promise(() => setTimeout(console.log, 0, "executor"))
// setTimeout(console.log, 0, "promise initialized")

// executor     promise initialized

let p = new Promise((resolve, reject) => setTimeout(resolve, 50, "success"))
// console.log(p)   //  Promise { <pending> }
// setTimeout(console.log, 50, p)  //  Promise { "success" }

/**
 * promise的状态一经改变就不会被覆盖或撤销了
 */

let p1 = new Promise((resolve, reject) => {
    resolve("success")
    reject("fail")
})
// console.log(p1) //  Promise { "success" }


/**
 * 同时，promise也支持调用Promise类型的静态方法创建一个已解决或已拒绝的期约实例
 * 一般来说应用于将非promise对象的值包装为成功或者失败的promise对象
 */
let p2 = new Promise((resolve, reject) => resolve("2"))
let p3 = Promise.resolve("3")
// console.log(p2, p3) //  Promise { "2" } Promise { "2" }

// let p4 = new Promise((resolve, reject) => reject("fail4"))
// let p5 = Promise.reject("fail5")
// console.log(p4, p5) // Promise { <rejected> "fail4" } Promise { <rejected> "fail5" }


/**
 * promise的实例方法
 * 1.Promise.prototype.then() 是为promise实例添加处理程序的主要方法，then的参数最多有两个
 * 一个是onResolved处理程序，一个是onRejected处理程序，两个都是可选的。
 * 若提供对应方法，则promise的状态发生对应改变的时候会触发对应的处理程序
 *
 * 
 */

let suc = () => console.log("success")
let fail = () => console.log("fail")

let p6 = new Promise((resolve, reject) => setTimeout(resolve, 100))
let p7 = new Promise((resolve, reject) => setTimeout(reject, 100))
// p6.then(suc, fail)  // success
// p7.then(suc, fail)  // fail


/**
 * 2.Promise.prototype.catch()给来给promise实例添加onRejected处理程序
 * 其实这个方法就是then(null,onRejected)的语法糖
 */

let p8 = new Promise((resolve, reject) => setTimeout(reject, 100))
// p8.catch(fail)  // fail


/**
 * 3.Promise.prototype.finally()用来给promise实例添加onFinally处理程序
 * finally不关注promise的状态，只要状态发生了改变就会触发，因此多用于添加清理代码
 */

let finallyFn = () => console.log("finally")

let p9 = new Promise((resolve, reject) => setTimeout(resolve, 100))
// p9.finally(finallyFn) // finally

/**
 * 以上三个实例方法执行后都会返回一个新的promise实例
 * 并且三个方法都是微任务，调用的事件遵循事件循环机制
 */

let p10 = new Promise((resolve, reject) => resolve())
// p10.then(suc)
// console.log("exec first")



/**
 *
 */

let p11 = Promise.resolve(1)
p11.then((arg) => {
    if (arg > 2) {
        return Promise.resolve(">2")
    } else {
        throw new Error("<2")
    }
}).then((m) => console.log(m)).catch((e) => console.log("catch error"))


