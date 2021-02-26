// without parameters
let welcome = () => {
    console.log('Hello World')
}
welcome()

// With parameters
let multiply = (num1, num2) => num1 * num2
console.log(multiply(2, 10))

// Object Literals ES5
let es5 = function (id, name) {
    return {
        id: id,
        name: name
    }
}

// Object Literals ES6
let literal = (id, name) => (
    {
        id: id,
        name: name
    }
)

let literal2 = (id, name) => {
    return {
        id: id,
        name: name
    }
}
console.log(literal(1, "Gokberk"))
console.log(literal2(1, "Gokberk"))

// ES6 Mapping
const phones = [
    { name: "Iphone 8", price: 3000 },
    { name: "Iphone X", price: 5000 },
    { name: "Samsung S8", price: 7000 },
    { name: "Huawei Mate Pro", price: 6000 },
]

let prices = phones.map(phone => phone.price)
console.log(prices)

// ES6 Filtering
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 134, 76, 345, 890, 12, 234]
let evens = arr.filter(even => even % 2 === 0)
console.log(evens)