const fs = require("fs")

// console.log(fs)

const files = fs.readdir("./", function (err, files) {
    if (err) console.log(err)
    else console.log(files)
})

const data = fs.readFile("Introduction/index.html", "utf-8", function (err, file) {
    if (err) console.log(err)
    else console.log(file)
})

fs.writeFile("deneme.txt", "Hello World", function (err) {
    if (err) console.log(err)
    else console.log("File is created successfully.")
})

fs.appendFile("deneme.txt", " Gokberk Yıldırım", function (err) {
    if (err) console.log(err)
    else console.log("File is appended successfully.")
})

fs.unlink("deneme.txt", function (err) {
    console.log("File is deleted")
})

fs.rename("deneme.txt", "deneme1.txt", function (err) {
    console.log("Filename is changed")
})

