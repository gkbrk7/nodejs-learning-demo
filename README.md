# nodejs-learning-demo

Learning series about nodejs

### Table of Contents

- [Introduction](#introduction)
- [Npm](#npm)
- [Express](#express)

## Introduction

> All the necessary files is in Introduction directory \
> `node_modules` including `fs, path, url, events, http, querystring` mentioned in this section \
> Usage of some modules explained with a simple example

## Npm

> `^major.minor.patch` npm packages versioning, `^` trackes the change of minor or patch part not major part so if any major update is available on a package, it is not installed the project\
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
