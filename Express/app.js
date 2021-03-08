const express = require('express');
const bodyParser = require("body-parser")
const errorController = require('./controllers/errors');
const mongoose = require('mongoose')
const path = require('path');
const User = require('./models/user')

const app = express()

app.set("view engine", "pug")
app.set("views", "./views")

const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "/public")))


app.use((req, res, next) => {
    User.findOne('gokberkyildirim').then(user => {
        req.user = user
        next()
    }).catch(err => console.log(err))
})
app.use("/admin", adminRoutes)
app.use(userRoutes)

app.use(errorController.get404Page)
/*
mongoConnect(() => {
    User.findByUserName('gokberkyildirim').then(user => {
        if (!user) {
            user = new User(null, "gokberkyildirim", "gokberk@gokberk.com")
            return user.save()
        }
        return user
    }).then(user => {
        console.log(user)
        app.listen(3000)
    }).catch(err => console.log(err))
})
*/

mongoose.connect('mongodb://localhost/node-app', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected MongoDB')
    User.findOne({ name: 'gokberkyildirim' }).then(user => {
        if (!user) {
            user = new User({
                name: 'gokberkyildirim',
                email: 'gokberk@gokberk.com',
                cart: {
                    items: []
                }
            })
            return user.save()
        }
        return user
    }).then(user => {
        console.log(user)
        app.listen(3000)
    }).catch(err => console.log(err))
}).catch(err => console.log(err))