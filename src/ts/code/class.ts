export class Person {
    name: string
    constructor(userName: string) {
        this.name = userName
    }
    getName() {
        console.log(this.name)
    }
}

export const person: Person = new Person('Jack')
