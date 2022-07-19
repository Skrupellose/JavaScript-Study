/**
 * 状态标记
 * 反射方法会返回称作状态标记的布尔值，用来表示执行的操作是否成功
 * 支持状态标记的反射方法：
 * 1.Reflect.defineProperty() 为对象添加新的属性
 * 2.Reflect.preventExtensions()    阻止新属性添加到对象
 * 3.Reflect.setPrototypeOf()     为对象设置新的原型对象 
 * 4.Reflect.set()  
 * 5.Reflect.deleteProperty()
 */
const o = {
    name: "GG"
}
try {
    Object.defineProperty(o, "props", 1)
} catch (e) {
    console.log('fail')
}

const result = Reflect.defineProperty(o, "props", { value: "2" })
// console.log(result) // true

/**
 * 还有部分反射方法提供只有通过操作符才能完成的操作：
 * 1.Reflect.get():可以替代对象属性访问操作符
 * 2.Reflect.set():可以替代=赋值操作符
 * 3.Reflect.has():可以替代in操作符或者with()
 * 4.Reflect.deleteProperty():可以替代delete操作符
 * 5.Reflect.construct():可以替代new操作符
 */
class Person {
    constructor(name) {
        this.name = name
    }
}
const people = Reflect.construct(Person, ["jj"])

// console.log(Reflect.get(o, "name")) // GG
// console.log(Reflect.set(o, "age", "18")) // true
// console.log(Reflect.get(o, "age"))  // 18
// console.log(Reflect.has(o, "name")) // true
// console.log(Reflect.deleteProperty(o, "age")) // true
// console.log(Reflect.get(o, "age")) // undefined
// console.log(people.constructor)  // [class Person]

/**
 * 代理本身也是个对象，因此可以实现通过代理去代理另一个代理
 */
const target = {
    foo: "bar"
}
const firstProxy = new Proxy(target, {
    get() {
        console.log('first proxy')
        return Reflect.get(...arguments)
    }
})

const secondProxy = new Proxy(firstProxy, {
    get() {
        console.log('second proxy')
        return Reflect.get(...arguments)
    }
})
// console.log(secondProxy.foo) // second proxy    first proxy     bar


/**
 * 数据绑定与可观察对象
 * 将被代理的类绑定到全局的实例集合中，将类的实例添加进该集合里面
 * 将集合绑定到事件分派程序，当有新实例添加进集合的时候，可以发送对应的消息
 */

const globalMap = []
class Chair {
    constructor(size) {
        this.size = size
    }
}
const proxy1 = new Proxy(globalMap, {
    set(target, property, value, receiver) {
        const result = Reflect.set(...arguments);
        console.log(`prop:${property} value:${value}`)
        if (result) {
            console.log(Reflect.get(...arguments));
        }
        return result
    }
})


const proxy = new Proxy(Chair, {
    construct() {
        const newChair = Reflect.construct(...arguments)
        proxy1.push(newChair)
        return newChair
    }
})

new proxy("big")
new proxy("small")

console.log(globalMap) // [ Chair { size: 'big' }, Chair { size: 'small' } ]

