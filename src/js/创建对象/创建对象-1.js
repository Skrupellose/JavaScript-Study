const { log } = require("console")

/**
 * 工厂模式
 * 按照特定的接口创建对象,可以解决创建多个类似对象的问题,但无法规避对象标识的问题,即新创建的对象是什么类型
 * 使用constructor属性只能返回Object
 */
function createPerson(name, age, job) {
    let o = new Object()
    o.name = name
    o.age = age
    o.job = job
    return o
}
let p1 = createPerson("p1", 18, "engineer")
// console.log(p1.constructor) //[Function: Object]
// console.log(p1) //{ name: 'p1', age: 18, job: 'engineer' }

/**
 * 构造函数模式
 * ES中的构造函数用于创建特定类型对象
 * 对象和数组这样的原生构造函数 运行时可以直接在执行环境使用
 * 也支持自定义构造函数
 */

/**
 * 构造函数与前面工厂模式的区别在于：
 * 1.没有显式的在函数内部创建对象
 * 2.属性或者方法直接赋值给this
 * 3.没有将对象return出去
 */

/**
 * 构造函数进行的操作：
 * 1.new操作符在内存中创建一个新对象
 * 2.这个新对象内部的[[Prototype]]属性被赋值为构造函数的prototype属性
 * 3.构造函数内部的this被赋值为新对象（即this指向新对象）
 * 4.执行构造函数内部的代码，为新对象添加属性
 * 5.若构造函数返回非空对象，则返回该对象，否则返回刚创建的新对象
 */
function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
}
let p2 = new Person("p2", 20, "worker")
let p3 = new Person("p3", 40, "boss")
// console.log(p2) //Person { name: 'p2', age: 20, job: 'worker' }

/**
 * 通过constructor属性可以查看对象类型
 * 但更建议使用instanceof操作符进行判断
 * 所有的自定义对象都继承自Object
 */

// console.log(p2.constructor) //[Function: Person]
// console.log(p2.constructor === Person) //true
// console.log(p3 instanceof Person) //true
// console.log(p3 instanceof Object) //true


/**
 * 原型模式
 * 每个函数都有一个prototype属性，该属性是一个记录了特定引用类型的实例共享的属性和方法的对象
 * 这个对象是通过构造函数构造出的对象实例的对象原型
 * 在原型上定义的属性与方法会被每一个对象实例所共享
 */

function Car() { }
Car.prototype.brand = "BMW"
Car.prototype.color = "White"

let c1 = new Car()
// console.log(c1.brand) //BMW

/**
 * 1.创建一个构造函数即会通过特定的规则为其添加一个prototype属性，该属性的值是一个对象（原型对象）
 * 2.原型对象拥有一个constructor属性，这个属性的值是构造函数本身
 * 3.该属性需要在浏览器中查看，其他环境下没有实现，会显示prototype是空对象
 */
// console.log(Car.prototype.constructor) //[Function: Car]

function Obj() { }
Obj.prototype.desc = "some info from prototype"
// console.log(Obj.prototype) //chrome {desc: 'some info from prototype', constructor: Obj()}
// console.log(Object.keys(Obj.prototype)) //['desc']
// console.log(Object.getOwnPropertyNames(Obj.prototype)) //[ 'constructor', 'desc' ]

/**
 * Object.values()返回对象属性值的数组
 * Object.entries()返回对象键值对的数组
 */
let watch = {
    color: "blue",
    brand: "Casio"
}
// console.log(Object.values(watch)) //[ 'blue', 'Casio' ]
// console.log(Object.entries(watch))  //[ [ 'color', 'blue' ], [ 'brand', 'Casio' ] ]


/**
 * 需要注意的是对象的construtor属性的值不一定就是构造函数
 * 所以尽量使用instanceof进行判断
 */

function Pen() { }
Pen.prototype = {
    name: "晨光",
    price: "7元"
}
pen = new Pen()
// console.log(pen.constructor) //[Function: Object] 而不是 [Function: Pen]

/**
 * 若需要将constructor属性值重新指向Pen
 * 可以使用Object.defineProperty()重新定义
 */

Object.defineProperty(Pen.prototype, "constructor", {
    enumerable: false,
    value: Pen
})

pen1 = new Pen()
// console.log(pen.constructor) //[Function: Pen]

/**
 * 关于构造函数和对象实例的原型：
 * 1.如果只是对构造函数的原型属性进行修改，那么新原型的属性会被每一个对象实例所继承
 * 2.在通过构造函数实例化对象的时候，对象实例就已经获得了构造函数的原型对象的指针，因此每次原型对象的每次修改，对象实例都能拿到最新的属性
 */
function Book() { }
let book1 = new Book()
Book.prototype.listen = function () { console.log("listen from prototype") }
let book2 = new Book()
Book.prototype.listen = function () { console.log("update listen first") }
// book1.listen() // update listen first
// book2.listen() // update listen first

/**
 * 但是如果是直接重写构造函数的原型对象，那么结果就不一样了
 * 最主要的原因就是重写构造函数的原型对象，会让构造函数重新拿到新的原型对象指针，同理通过构造函数实例化的对象也就拿到的是新原型对象的指针
 * 这个时候查看重写前后实例化对象所继承的属性就会产生差别
 */

function Cup() { }
Cup.prototype.say = function () { console.log("this cup is used to drink") }
let cap1 = new Cup()
Cup.prototype = {
    constructor: Cup,
    say: function () {
        console.log("i am new func")
    }
}
let cap2 = new Cup()
cap1.say() //this cup is used to drink
cap2.say() //i am new func