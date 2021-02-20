const Logger = require("./logger")
const logger = new Logger()
// add Listener 
logger.on("connection", function (args) {
    console.log("connected successfully", args)
})

logger.on("logout", function () {
    console.log("connection interrupted")
})

// trigger event
// emitter.emit("connection", { id: 1, message: "hello" })

logger.log("Hello Gokberk")