// Maps : Key - value pair
let val

const numbers = new Map()

numbers.set(1, "one")
numbers.set("2", "two")
numbers.set(3, "three")
numbers.set("four", "four")

val = numbers.get(1)
val = numbers.get("2")
val = numbers.size
val = numbers.has(1)
// val = numbers.delete(1)
// val = numbers.clear()

for (const [key, value] of numbers) {
    console.log(key + " = " + value)
}
for (const value of numbers.entries()) {
    console.log(value)
}
for (const key of numbers.keys()) {
    console.log(key)
}
for (const key of numbers.values()) {
    console.log(key)
}

numbers.forEach((value, key) => {
    console.log(value + "/" + key)
})

console.log(numbers)
console.log(val)

var first = new Map([[1, "one"], [2, "two"]])
var merged = new Map([...first, ...numbers])
console.log(merged)
console.log(first)