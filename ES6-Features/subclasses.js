// ES5
function PersonES5(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
}

PersonES5.prototype.sayHi = function () {
    return `Hello I'am ${this.firstName} ${this.lastName}`
}

function CustomerES5(firstName, lastName, phone, userName) {
    PersonES5.call(this, firstName, lastName)
    this.phone = phone
    this.userName = userName
}

CustomerES5.prototype = Object.create(PersonES5.prototype)

var customer = new CustomerES5("gokberk", "yildirim", "123-23-904", "gyildirim")
console.log(customer.firstName)
console.log(customer.sayHi())

// ES6
class PersonES6 {
    constructor(firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
    }

    sayHi() {
        console.log(`Hello I'am ${this.firstName} ${this.lastName}`)
    }

    static getTotal() {
        return 1000;
    }
}

class CustomerES6 extends PersonES6 {
    constructor(firstName, lastName, phone, userName) {
        super(firstName, lastName)
        this.phone = phone
        this.userName = userName
    }

    sayHello() {
        console.log(`Hello My phone : ${this.phone} and username: ${this.userName}`)
    }
}

let customer2 = new CustomerES6("gokberk", "yildirim", "123-23-904", "gyildirim")
customer2.sayHello()
customer2.sayHi()
console.log(CustomerES6.getTotal())