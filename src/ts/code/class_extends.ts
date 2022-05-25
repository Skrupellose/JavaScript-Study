class EUserBase {
    name: string
    constructor(userName: string) {
        this.name = userName
    }
    getName() {
        console.log(this.name)
    }
}

class EUser extends EUserBase {
    getFather() {
        console.log('i am extends from EUserBase')
    }
}

export const euser: EUser = new EUser("user")

// 同时接口也可以继承类，且可以通过Omit删除类上的方法
interface User extends Omit<EUserBase, 'getName'> {
    age: number
}
export const user: User = {
    name: 'user1',
    age: 5
}