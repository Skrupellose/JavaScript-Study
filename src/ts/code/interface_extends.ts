import { UserItem } from './type'

export interface Admin extends UserItem {
    power: number
}

export const admin: Admin = {
    name: 'John',
    profession: 'IT engineer',
    power: 5
}
// 继承时舍弃部分属性需要借助Omit类型
// type Omit<T, k extends string | number| symbol>
export interface SimpleAdmin extends Omit<UserItem, 'profession'> {
    power: number
}

export const simpleAdmin: SimpleAdmin = {
    name: 'Mike',
    power: 4
}