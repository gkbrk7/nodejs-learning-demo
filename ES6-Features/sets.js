// Sets : Object Collection - for Unique values
let val
var mySet = new Set()

mySet.add(1)
mySet.add(2)
mySet.add(3)
mySet.add("2") // not added into set
mySet.add({ a: 1, b: 2 })

var obj = { a: 1, b: 2 } // address different because of this reason it is added
mySet.add(obj)
console.log(mySet)

val = mySet.has(1)
val = mySet.size

mySet.delete(1)

console.log(val)
console.log(mySet)

for (const item of mySet) {
    console.log(item)
}

for (const item of mySet.keys()) {
    console.log(item)
}

for (const item of mySet.values()) {
    console.log(item)
}
// In sets keys and values are same

console.log(Array.from(mySet)) // converts mySet into array

let myset2 = new Set([1, 2, 3, 4, 5])


// Intersection
var intersect = new Set(Array.from(mySet).filter(x => myset2.has(x)))
// var intersect = new Set([...mySet].filter(x => myset2.has(x)))
console.log(intersect)

// Difference
var difference = new Set([...mySet].filter(x => !myset2.has(x)))
console.log(difference)