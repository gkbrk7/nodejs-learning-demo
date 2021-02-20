const EventEmitter = require("events");
// const emitter = new EventEmitter()


class Logger extends EventEmitter {
    log(message) {
        console.log(message)
        this.emit("connection", { id: 1, message: message })
    }
}

module.exports = Logger