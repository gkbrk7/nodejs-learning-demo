var a, b, rest
// Destructuring
[c, d, ...rest] = [10, 20, 30, 40, 50]
console.log(c)
console.log(d)
console.log(rest)


// ES5
a = 10, b = 20

// ES6
[a, b] = [10, 20]
console.log(a)
console.log(b)

// Destructuring Assignment
({ a, b } = { a: 10, b: 20 })
console.log(a)
console.log(b)

// Array and Object Destructuring
const arrConfig = ['localhost', 9000, 900]
const objConfig = {
    server: 'localhost',
    port: 9000,
    timeout: 900
}
const [server, port, timeout] = arrConfig
const { server, port, timeout } = objConfig
console.log(server)

let {timeout : t} = objConfig // assign as t variable
const { server, port, timeout=1000 } = objConfig // default value

const days = ['monday', 'tuesday', 'wednesday', 'thursday','friday']
const [,,wed,,fri] = days
console.log(wed,fri)