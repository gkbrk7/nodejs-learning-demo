// const boxes = document.querySelectorAll('.box')

// // ES5
// let boxesES5 = Array.prototype.slice.call(boxes)

// // ES6
// Array.from(boxes).forEach(box => box.style.backgroundColor = 'green')
// console.log(boxes)

// from
let arr = Array.from("Modern Javascript") //converts all elements into character array

const products = [
    { name: "Iphone 8", price: 3000 },
    { name: "Iphone X", price: 5000 },
    { name: "Samsung S8", price: 7000 },
    { name: "Huawei Mate Pro", price: 6000 },
]

console.log(Array.from(products, prd => prd.name))
console.log(Array.from(products, prd => prd))
console.log(products.find(prd => prd.name === 'Samsung S8'))
console.log(products.filter(prd => prd.name.indexOf("ung") !== -1))
console.log(products.findIndex(prd => prd.price === 5000))

let numbers = ['a', 'b', 'c']
let entries = numbers.entries()
let keys = numbers.keys()
let values = numbers.values()

for (const i of entries) {
    console.log(i)
}

for (const i of keys) {
    console.log(i)
}

for (const i of values) {
    console.log(i)
}

for (const i of products.values()) {
    console.log(i)
}