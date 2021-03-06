# nodejs-learning-demo

Learning series about nodejs

### Table of Contents

- [Introduction](#introduction)
- [ES6Features](#es6-features)
- [Npm](#npm)
- [Express](#express)
- [Template Engine (Pug)](#template-engine-pug)
- [Mvc](#mvc)
- [Database Integration](#database-integration)
  - [MySQL Integration](#mysql-integration)
    - [Sequelizejs ORM Tool](#sequelizejs-orm-tool)
  - [MongoDB Integration](#mongodb-integration)
    - [Mongoose ORM Tool](#mongoose-orm-tool)
- [Authentication](#authentication)
  - [Cookies](#cookies)
  - [Session](#session)

## Introduction

> All the necessary files are in Introduction directory \
> `node_modules` including `fs, path, url, events, http, querystring` mentioned in this section \
> Usage of some modules explained with a simple example

## ES6 Features

> Some new features of ES6 added \
> There features explained by comparing the ES5 \
> All the necessary files in `ES6-Features` directory \
> Some of ES6 features will be used in express project.

## Npm

> `^major.minor.patch` npm packages versioning, `^` trackes the change of minor or patch part not major part so if any major update is available on a package, it is not installed to the project\
> `npm i [package_name] --save-dev` npm packages will be installed as devDependencies. It is a local package but it is only for development purposes \
> `npm -v` Gives the installed npm version \
> `npm list -g --depth 0` Lists global npm packages on the machine \
> `npm i -g [package_name]` Install npm package into system globally \
> `npm config ls -l | grep prefix` Global npm packages installed this directory
> `npm init` Created packages.json \
> `npm init -y` Created packages.json with default settings \
> `npm i` If there is no node_modules it installs all the dependencies \
> `npm i [package_name@version_number]` Install npm packages with specific version \
> `npm uninstall [package_name]` Uninstall npm packages \
> If define a npm script name reserved by npm, this command canbe executed with `npm run [command_name]`

## Express

> `npm i express` install express
> Simple Code Sample to get started, write code snippet below into app.js

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
```

> To serve any public file on web add this middleware into app.js

```javascript
app.use(express.static(path.join(__dirname, "/public")));
```

> To use body-parser npm package as a default add this middleware. Express supports usage of body-parser anywhere with `req.body` property

```javascript
app.use(bodyParser.urlencoded({ extended: false }));
```

## Template Engine-Pug

> There are several popular templates engines like `ejs, pug, handlebars` \
> Install npm package first with the command `npm i pug` \
> Some configuration needed to use pug template engine, so add this codes into app.js

```javascript
app.set("view engine", "pug");
app.set("views", "./views");
```

> Use `block [block_name]` to render block of codes into pug file \
> Use `#{name}` to define a variable in the layout page \
> Use `include [file_path]` to import pug code block into layout \
> Use `mixin [function]` to define a function in pug file and use defined function like `+[function]` \
> After layout definition, it is needed to introduce the layout to every page. Therefore, add `extends layouts/main-layout.pug` at the top of page

## Mvc

> Models, Controllers and Views directories added \
> Clear sample of usage MVC has been shown in the Express file

## Database Integration

### MySQL Integration

> Click [here](https://dev.mysql.com/downloads/installer/) to install for windows MySQL Server and workbench \
> For database connection added `utility` folder in Express directory \
> Use `npm i mysql2` command to install mysql package \
> Add **mysql2** package into app.js and run this sample code snippet to check whether connection is successful or not \
> Old files for storage have preserved with `_memory` suffix \

```javascript
connection
  .execute("select * from products")
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.error(err.sqlMessage);
  });
```

#### Sequelizejs ORM Tool

> An ORM (Object Relational Mapping) tool for MySQL is integrated \
> `Sequelizejs` ORM tool used for MySQL in this project \
> `Sequelizejs` supports Postgres, MySQL, MariaDB, SQLite and MSSQL as well \
> Old connection file preseverd as `database_norm.js` in utility folder \
> First, install `sequelizejs` package from npm with `npm i --save sequelize` command \
> Examine sample create code for testing purposes \

```javascript
const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

const User = sequelize.define("user", {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
});

sequelize.sync().then(() =>
  User.create({
    username: "johndoe",
    birthday: new Date(1980, 6, 20),
  }).then((john) => console.log(john.toJSON()))
);
```

> Sequelize provides the `create` method, which combines the `build` and `save` methods for adding data into database \
> One-to-Many relationship in app.js before calling `sync()` method

```javascript
Product.belongsTo(Category);
Category.hasMany(Product);
```

> If two tables have relationship with each other, then `Sequelize` creates automatically combined functions like :

```javascript
category.createProduct(Product);
```

> This is valid for specific category object because it has relationship with Products.\
> Syntax should be **object.[create/get]{Model + 's'}** ==> (i.e user.getProducts())

### MongoDB Integration

> Install community edition on official website \
> Create data directory for mongodb and place it into ` C:\\data\\db\\` \
> Add `mongod` server to path in environment variables \
> For cloud storage canbe used `MongoDb Atlas`. It gives 512 mb cloud storage \
> Before mysql integration and its connection js preserved as `database_mysql.js` \
> Install mongodb from npm `npm i mongodb`

#### Mongoose ORM Tool

> Install mongoose ORM from npm `npm i mongoose` \
> Integration code sample of mongoose like this \

```javascript
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/node-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected MongoDB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
```

> To make some CRUD operation on the mongodb with mongoose ORM, define schema like this

```javascript
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});
```

> After definition of the schema create a database model for the usage of the collection with defined schema like below

```javascript
module.exports = mongoose.model("Product", productSchema);
```

## Authentication

### Cookies

> To write login information of the user to cookie by using cookie based authetication, use `npm i cookie-parser` command. Usage of this module : \

```javascript
const cookieParser = require("cookie-parser");
app.use(cookieParser());
```

### Session

> Use `npm install express-session` command to setup session module. Usage of the module: \

```javascript
const session = require("express-session");
app.use(
  session({
    secret: "gokberk",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);
```
