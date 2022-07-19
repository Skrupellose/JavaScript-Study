/**
 * 把promise通过then、catch、finally串联起来使用叫做promise连锁，可以解决回调函数回调地狱的问题
 */
let p1 = new Promise((resolve, reject) => {
    // console.log('p1 executor')
    setTimeout(resolve, 1000)
})

p1.then(() => new Promise((resolve, reject) => {
    // console.log('p2 executor')
    setTimeout(resolve, 1000)
}))
    .then(() => new Promise((resolve, reject) => {
        // console.log('p3 executor')
        setTimeout(resolve, 1000)
    }))
    .then(() => new Promise((resolve, reject) => {
        // console.log('p4 executor')
        setTimeout(resolve, 1000)
    }))


/**
 *  then()返回的新promise实例基于onResolved处理程序进行构建，或者是基于Promise.resolve()进行包装，如果没有提供那么就会包装上一个promise的resolve()返回的值
 */

let p2 = Promise.resolve("p2")
let p3 = p2.then(() => "p3")
let p4 = p2.then(() => new Promise((resolve, reject) => {
    resolve("p4")
}))
let p5 = p2.then(() => Promise.resolve("p5"))
let p6 = p2.then()
// setTimeout(console.log, 1000, p3, p4, p5, p6)  // Promise { 'p3' } Promise { 'p4' } Promise { 'p5' } Promise { 'p2' }


/**
 * 也可以通过Promise类的静态方法，Promise.all()和Promise.race()
 * Promise.all()接收一个可迭代对象，可迭代对象会通过Promise.resolve()转化为期约
 * all()方法合成的promise只会在内部包含的所有promise都解决之后才解决
 * 如果只要有一个promise处于pending或者rejected状态，那么该合成的promise也是对应的状态
 */
let p7 = Promise.all([1, 2, 3])
// setTimeout(console.log, 0, p7) // Promise { [ 1, 2, 3 ] }


let p8 = Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(resolve, 2000)
    }),
    Promise.resolve()
])

// setTimeout(console.log, 0, p8)  //Promise { <pending> }
// p8.then(() => setTimeout(console.log, 0, 'p8 handle'))  // 2000ms之后打印p8 handle


/**
 * Promise.race()方法参数相同，只不过他不会等待所有期约的状态改变再返回合成的promise，而是返回最先执行完毕的promise的参数镜像
 * 不论解决还是拒绝
 */

let p9 = Promise.race([
    new Promise((resolve, reject) => {
        setTimeout(resolve, 500, "fast")
    }),
    new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, "slow")
    })
])

p9.then(v => console.log(v))    // fast


