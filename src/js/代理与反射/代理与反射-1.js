/**
 * 代理可以理解为是目标对象的抽象
 * 可以理解为对象的指针，目标对象可以直接被操作，也可以通过代理进行操作
 * 因此不管是对代理还是目标对象进行操作，结果都会应用到两个对象上
 */

const target = {
    id: "target"
}
const handler = {}

const proxy0 = new Proxy(target, handler)

// console.log(proxy.id === target.id) // true
// console.log(typeof (proxy)) // object

proxy0.length = 10
target.color = 'red'

// console.log(proxy0.length, target.length) // 10 10
// console.log(proxy0.color, target.color) //  red red


/**
 * 使用代理的主要目的是定义捕获器，捕获器是用来处理程序对象中定义的“基本操作的拦截器”
 * 数量0个或多个，每个捕获器对应一种基本操作，可以直接或间接在代理对象上调用
 * 在操作发生时，代理的捕获器在操作传播到目标对象之前先进行拦截和修改
 * 强调的是捕获器作用的目标是代理而不是目标对象，故只有代理才能触发捕获器
 */

const obj = {
    id: 1
}
const handler1 = {
    get() {
        return "catch get"
    }
}
const proxy1 = new Proxy(obj, handler1)
// console.log(obj.id, proxy1.id) // 1, catch get


/**
 * 捕获器均可以访问到相应的参数，基于参数去重建被捕获方法的原始行为，比如get()捕获器会接收到目标对象、查询的属性、代理对象三个参数
 */

const handler2 = {
    get(target, prop, proxy) {
        console.log(`prop: ${prop}`)
        console.log(target === obj, proxy === proxy2)
        return target[prop]
    }
}

const proxy2 = new Proxy(obj, handler2)
// console.log(proxy2.id) // prop: id, true true, 1

/**
 * 捕获器除了基于自己的参数重建操作以外，还可以通过反射api来进行重建
 */

const handler3 = {
    get() {
        return Reflect.get(...arguments)
    }
}
const proxy3 = new Proxy(obj, handler3)
// console.log(proxy3.id) // 1

const handler4 = {
    get() {
        let getResult = Reflect.get(...arguments)
        return `handle ${getResult}`
    }
}
const proxy4 = new Proxy(obj, handler4)
// console.log(proxy4.id) // handle 1


/**
 * Proxy也暴露出了revocable()方法,返回值有revoke方法可以用于撤销代理
 */

const { proxy, revoke } = Proxy.revocable(obj, handler4)
console.log(proxy.id) // 1
revoke()
console.log(proxy.id) // Cannot perform 'get' on a proxy that has been revoked