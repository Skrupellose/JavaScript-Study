/**
 * es中的函数同样是对象类型
 * 每个函数都是Function类型的实例，Function也有属性和方法
 * 目前有四种定义函数的方法：
 * 1.普通声明
 * 2.函数表达式
 * 3.箭头函数
 * 4.new
 */

function normal() { }

let expression = function () { }

let arrowFn = () => { }

let instanceFn = new Function()

/**
 * 箭头函数可以理解为是函数表达式的一个语法糖
 * 1.当箭头函数的参数为0或多个时参数需要加括号
 * 2.函数体内容只有一行代码时可以省略函数体的括号
 */


/**
 * 函数名是指向函数的指针，因此，一个函数可以有多个函数名
 */
function sum(arg1, arg2) {
    console.log(arg1 + arg2)
}
/**
 * 声明变量sum2，并且将函数指针赋值给它
 */
let sum2 = sum
// sum(1, 2) // 3
// sum2(3, 4)  // 7
// sum = null
// sum(5, 6) //TypeError: sum is not a function
// sum2(7, 8)  // 15


/**
 * 通过function关键字定义函数时（不包括箭头函数），可以在函数内部访问arguments对象，它是一个类数组，可以使用下标和length方法
 * 而箭头函数只能通过形参的调用才能拿到具体的参数值
 */

function arg() {
    console.log(arguments.length)
    if (arguments.length) {
        console.log(arguments[0])
    }
}
// arg(1, 2, 3, 4) // 4 1

let argFn = (...arg) => {
    console.log(arg)
}
// argFn(5, 6, 7)


/**
 * 设置函数默认参数
 */

let normalArgsFn = (people = "Jack") => console.log(`${people} is coming`)
// normalArgsFn("Mike") // Mike is coming
// normalArgsFn()  //  Jack is coming


/**
 * 函数声明与函数表达式的区别在于函数声明有变量提升，而表达式没有
 */
// have() //   have
function have() {
    console.log("have")
}
// no() // ReferenceError: Cannot access 'no' before initialization
let no = () => console.log('"no"')


/**
 * 函数内部有两个特殊的对象：arguments和this
 * es6新增了new.target属性
 * arguments对象有一个callee属性，值为arguments对象所在函数的指针
 */

function factorial(num) {
    if (num === 1) {
        return 1
    } else {
        return num * factorial(num - 1)
    }
}

function newFactorial(num) {
    if (num === 1) {
        return 1
    } else {
        return num * arguments.callee(num - 1)
    }
}
// console.log(factorial(5))   //  120

let myFactorial = newFactorial
// console.log(myFactorial(5)) // 120


/**
 * 函数的this在标准函数与箭头函数有不同的行为
 * 标准函数中，this引用的是把函数当成方法调用的上下文对象
 * 箭头函数中，this引用的是定义箭头函数时的父级作用域
 */

let o1 = { color: "red" }
let o2 = { color: "blue" }
function sayColor() {
    console.log(this.color)
}
o1.say = sayColor
o2.say = sayColor
// o1.say()    //  red
// o2.say()    //  blue

let sayColor2 = () => console.log(this.color)
o1.say = sayColor2
o2.say = sayColor2
/**
 * 箭头函数定义时的上下文对象是全局，并没有对应的color属性，所以返回的是undefined
 */
// o1.say()    // undefined
// o2.say()    // undefined
let say = () => console.log(this.clor)
// say()
let o3 = {
    color: "green",
    say: () => {
        console.log(this.color)
    }
}
// o3.say() //undefined 对象字面量的{}并不是块级作用域，因此say函数定义时的父级作用域仍然是全局


/**
 * 但是一般来说，如果我们需要给函数固定this的话，就可以使用箭头函数了
 * 有的时候this的指向并非我们想要的上下文
 */

function King() {
    this.name = "king"
    setTimeout(() => console.log(this.name))
}

function Queen() {
    this.name = "queen"
    setTimeout(function () { console.log(this.name) })
}
// new King() //king
// new Queen() //queen


/**
 * 函数对象还有一个属性caller，该属性引用的是调用当前函数的函数
 */

function a() {
    b()
}

function b() {
    console.log(b.caller)
}

// a() // [Function: a]



/**
 * es6新增的new.target属性用来返回表示函数是否通过new关键字调用
 */


function Person() {
    if (new.target) {
        console.log("call by new")
    } else {
        console.log("call by normal")
    }
}
new Person() // call by new
Person()    // call by normal