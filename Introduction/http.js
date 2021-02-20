const http = require("http")
const routes = require("./routes")

const server = http.createServer(routes)

// const server = http.createServer((req, res) => {

//     if (req.url === "/test") {

//         // res.setHeader("Content-Type", "text/plain")
//         res.setHeader("Content-Type", "application/json")
//         res.statusCode = 200
//         res.statusMessage = "OK"

//         res.write(JSON.stringify({ name: "Gokberk", age: 25, hobby: "programming", isAdmin: true }))
//         res.end()
//     }

//     if (req.url === "/html") {
//         res.setHeader("Content-Type", "text/html")
//         res.statusCode = 200
//         res.statusMessage = "OK"

//         res.write("<html>")
//         res.write("<head><title>Javascript</title></head>")
//         res.write("<body><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolorum dolor error, fuga aperiam necessitatibus, dignissimos accusamus odit aque ullam fugiat beatae modi voluptatibus corrupti recusandae libero facere ipsa tempore?</p></body>")
//         res.write("</html>")
//         res.end()
//     }

//     if (req.url === "/") {
//         res.write("Hello World")
//         res.end()
//     }

//     if (req.url === "/api/products") {
//         res.write("products list")
//         res.end()
//     }

//     fs.readFile("Introduction/index.html", function (err, file) {
//         if (err) {
//             res.setHeader("Content-Type", "text/plain")
//             res.statusCode = 404
//             res.statusMessage = "Not Found"
//             res.end("Not Found")
//         } else {
//             res.setHeader("Content-Type", "text/html")
//             res.statusCode = 200
//             res.statusMessage = "OK"
//             res.end(file)
//         }
//     })

//     res.setHeader("Content-Type", "text/html")
//     if (req.url === "/") {
//         res.write(`<html>
//         <head>
//             <title>Javascript</title>
//         </head>
//         <body>
//             <form action="/log" method="POST">
//             <input type="text" name="message">
//             <button type="submit">Save</button>
//             </form>
//         </body>
//         </html>
//         `)
//         return res.end()
//     }

//     if (req.url === "/log" && req.method === "POST") {

//         // body parser
//         const body = []
//         req.on("data", function (chunk) {
//             body.push(chunk)
//             console.log(chunk)
//         })

//         req.on("end", () => {
//             const bodyParsed = Buffer.concat(body).toString()
//             const message = bodyParsed.split("=")[1]
//             console.log(qs.parse(bodyParsed))
//             fs.appendFileSync("Introduction/log.txt", message)
//         })

//         res.statusCode = 302
//         res.setHeader("Location", "/")
//         return res.end()
//     }
// })

server.listen(3000)

// server.on("connection", function () {
//     console.log("new connection")
// })

console.log("Listening port on 3000")