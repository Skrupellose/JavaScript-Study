/**
 * 继承
 * 在ES6之前，es通过组合继承，原型链继承来实现继承，但都各有优劣
 * ES6中，正式引入了类的概念，通过类我们可以实现更高效的继承
 */

/**
 * 类的声明两种方式
 * 1.class Person {} 
 * 2.或者 const Person = class {}
 * 
 * 类包含：
 * 1.构造函数方法
 * 2.实例方法
 * 3.获取函数、设置函数、静态类方法
 */

class Person {
    constructor(job) {
        this.job = job
    }
    introduce() {
        console.log(`my job is ${this.job}`)
    }
}
Jack = new Person("engineer")
// Jack.introduce() // my job is engineer

/**
 * es中没有类这个类型，实质上也是一种特殊函数
 * 通过typeof操作符检测类标识符，可以看出它是一个函数
 */

// console.log(typeof (Person)) // function

/**
 * 类标识符同样拥有prototype属性，值为对象，对象有constructor属性指向类标识符自身
 */

// console.log(Person.prototype.constructor) // [class Person]
// console.log(Jack instanceof Person) // true

/**
 * 1.在每次通过new调用类标识符的时候，都会执行类内部的构造函数。
 * 2.类内部空间可以分为类块和构造函数两部分
 * 3.如果在类块中定义内容，则会被定义在类的原型上，但是需要注意只能定义方法
 * 4.同样的可以在类块中使用获取和设置访问器
 */

class Book {
    constructor(word) {
        this.word = word
        this.say = () => console.log(`constructor say ${this.word}`)
        this.listen = () => console.log(`constructor listen ${this.word}`)
    }
    set name(name) {
        this._name = name
    }
    get name() {
        return this._name
    }
    say() {
        console.log('prototype say()')
    }
    listen() {
        console.log('prototype listen()')
    }
}
let book1 = new Book("some words")
// book1.say() // constructor say some words
// book1.constructor.prototype.say() // prototype say()
// book1.name = "future"
// console.log(book1.name) // future
// book1.constructor.prototype.listen() //prototype listen()
// book1.listen() // constructor listen some words


/**
 * 在类上也可以定义静态方法。这些方法通常用于执行不特定与实例的操作，也不要求存在类的实例
 * 与原型成员类似，静态成员每个类上只能有一个，且静态类的this指向类自身
 */

class Pen {
    constructor() {
        this.fn = () => console.log('instance', this)
    }
    fn() {
        console.log('prototype', this)
    }
    static fn() {
        console.log('static', this)
    }
}
let pen = new Pen()
// pen.fn() // instance Pen { fn: [Function (anonymous)] }
// Pen.prototype.fn() // prototype {}
// Pen.fn() // static [class Pen]

/**
 * 因为静态类的this是类本身，因此除了new类标识符，还可以通过类静态方法去创建一个实例
 */

class Card {
    constructor(name) {
        this.name = name
    }
    static createCard(name) {
        return new this(name)
    }
}
A = new Card('a')
B = Card.createCard('b')
// console.log(A.name, B.name) // a  b


/**
 * 继承，在类中使用继承需要用到extends关键字
 */

class Cup { }
class MyCup extends Cup { }
let cup = new MyCup()
// console.log(cup instanceof Cup, cup instanceof MyCup) // true true


/**
 * 派生类的方法可以通过super关键字引用其原型，在类构造方法中使用super可以调用父类的构造函数
 */

class Mask {
    constructor(color) {
        this.color = color
        this.introduce = () => { console.log(`this mask is ${this.color}`) }
    }
}

class MyMask extends Mask {
    constructor(color) {
        super(color)
    }
}

let mask = new MyMask('red')
// mask.introduce() // this mask is red