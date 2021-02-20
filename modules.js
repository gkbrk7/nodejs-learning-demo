// Modules
// Browser IIFE
var controllerA = (function () {
    var name = "Gokberk";
    return {
        name
    }
})()

var controllerB = (function () {
    var name = "Gizem";
    return {
        name
    }
})()

// Nodejs
// console.log(module)

let firstName = "Gokberk"

const log = function (name) {
    console.log(name)
}

let age = 30

// module.exports.log = log
// module.exports.name = firstName

module.exports = {
    name: firstName,
    log: log
}

// module.exports = {
//     firstName,
//     log
// }