function tsFn(str: string) {
    console.log(str.split(' ')[0])
}
// 定义原始类型
const str: string = 'hello'
// 定义数组类型
const strs: string[] = ['hello', 'world']
// 定义对象类型 UserItem ?表示该属性为可选
interface UserItem {
    name: string,
    profession: string
    age?: number
}
const User: UserItem = {
    name: "admin",
    profession: "IT engineer",
    age: 18
}
// 接口继承
interface Admin extends UserItem {
    power: number
}

const admin: Admin = {
    name: 'John',
    profession: 'IT engineer',
    power: 5
}
// 继承时舍弃部分属性需要借助Omit类型
// type Omit<T, k extends string | number| symbol>
interface SimpleAdmin extends Omit<UserItem, 'profession'> {
    power: number
}
const simpleAdmin: SimpleAdmin = {
    name: 'Mike',
    power: 4
}
console.log(admin)
console.log(simpleAdmin);

console.log(str)
console.log(strs)
tsFn('hello Ts')