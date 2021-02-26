// ES5
function sum() {
    console.log(arguments)
    let arr = Array.prototype.slice.call(arguments) // convert to array
    console.log(arr)
    let result = 0
    arr.forEach(function (item) {
        result += item
    })
    return result
}

console.log(sum(3123, 4235, 1234, 1243))

// ES6
function sumES6(...arr) {
    let total = arr.reduce((total, item) => total + item)
    return total
}

console.log(sumES6(123, 123, 132, 213, 54))