// 定义原始类型
const str: string = 'hello'
// 定义数组类型
const strs: string[] = ['hello', 'world']
// 定义对象类型 UserItem ?表示该属性为可选
export interface UserItem {
    name: string,
    profession: string
    age?: number
}
export const User: UserItem = {
    name: "admin",
    profession: "IT engineer",
    age: 18
}
export default {
    str, strs, User
}