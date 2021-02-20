const url = require("url")

const address = "http://gokberk.com/courses?year=2019&month=may"

console.log(url.parse(address, true))