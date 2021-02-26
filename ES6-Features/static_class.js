class Person {
    language = ""
    constructor(name, job) {
        this.name = name
        this.job = job
    }

    set lang(language) {
        this.language = language
    }

    get lang() {
        return this.language
    }

    static sayHi() {
        console.log("Hello there")
    }
}

let person = new Person("Gokberk", "Developer")
person.lang = "jgjg"
console.log(person.language)
Person.sayHi()


class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static distance(a, b) {
        const dx = a.x - b.x
        const dy = a.y - b.y
        return Math.hypot(dx, dy)
    }
}

const d1 = new Point(10, 10)
const d2 = new Point(20, 20)
console.log(Point.distance(d1, d2))