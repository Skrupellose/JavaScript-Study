/**
 * 函数还有两个方法call()和apply()用来以指定的this调用函数，即作用是动态改变this
 * 两者只有传参的区别，实现的效果相同
 * apply方法接收两个参数，this(即被调用的函数内部的this)和一个参数数组
 * call方法第一个参数也是this，剩余参数是每一个要传给被调用函数的参数
 */
function sum(arg1, arg2) {
    return arg1 + arg2
}

function callSum1() {
    return sum.apply(this, arguments)
}

// console.log(callSum1(1, 2)) // 3


function callSum2() {
    return sum.call(this, ...arguments)
}
// console.log(callSum2(3, 4)) // 7


/**
 * 上面的例子主要是通过call和apply给函数进行了传参
 * 但是call和apply使用更多的是用于控制函数调用的上下文即函数内部的this值
 * 通过call和apply可以将任意对象设置为函数的作用域
 */

let o = {
    color: "red"
}
let o1 = {
    color: "blue"
}
function showColor() {
    console.log(this.color)
}
showColor.apply(o)  // red
showColor.call(o1) // blue


/**
 * 还有另一个方法bind()，同样是用来控制函数调用的上下文，只不过不是立即执行，而是返回一个函数用于回调执行
 */

showColor.bind(o)() // red


// 0 1 1 2 3 5
function fib(n) {
    if (n < 2) {
        return n
    } else {
        return fib(n - 1) + fib(n - 2)
    }
}