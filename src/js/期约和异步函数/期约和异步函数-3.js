/**
 * 使用async关键字可以使得函数具有异步特征，但是async声明的异步函数默认返回的就是一个被Promise.resolve()包装后的promise对象
 * 没有返回值则将undefined进行包装
 */

const { time } = require("console")

async function foo() {
    console.log("foo")
}
// console.log(foo())  //Promise { undefined }



/**
 * 异步函数主要是内部有不能立马得到结果的任务，因此需要暂停异步函数代码的执行，等待结果出来
 * await关键字就是用来暂停异步函数代码的执行，当代码运行到await关键字的时候，会暂停后面的代码执行并且让出当前的执行线程
 */

async function baa() {
    let p = new Promise((resolve, reject) => {
        setTimeout(resolve, 400, "over")
    })
    console.log(await p)
}

// baa()


async function bab() {
    console.log(1)
    let p = new Promise((resolve, reject) => {
        setTimeout(reject, 300, "fail")
    })
    console.log(2)
    console.log(await p)
    console.log(3) // 不会执行到这里因为await会直接把处于拒绝状态的promise return出去
}
// bab().catch(e => console.log(e))
// 1
// 2
// fail


/**
 * await关键字并非只是等待一个值可用那么简单。JavaScript运行时在碰到 await 关键字时，会记录在哪里暂停执行。
 * 等到 await 右边的值可用了，JavaScript运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。
 */


function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

async function bac() {
    const start = Date.now()
    await sleep(5000)
    console.log(Date.now() - start)
}

// bac() // 5000ms左右后打印时间差
