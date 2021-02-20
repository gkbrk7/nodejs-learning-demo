const path = require("path")

console.log(path.resolve("app.js"))
console.log(path.extname("app.js"))
console.log(path.parse(__filename))