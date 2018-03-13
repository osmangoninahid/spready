# Spready
[![npm version](https://badge.fury.io/js/spready.svg)](https://badge.fury.io/js/spready)

Spready will help you to create a RESTFul backend  including basic CRUD operations with [NodeJS](https://nodejs.org/), [Express.js](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

## Install
```shell
$ npm install -g spready
```
## use
```shell
// Initialize project
$ spready init
$ cd [project_name]

// Add new module
$ spready add-module ModuleName
```
It should make a question, like:
  + Name of the project (It will create a folder in your current working directory and the folder name will be your project name)

### Display the command options with the -h option:
```sh
$ spready -h

  Usage: spready [options] [name]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -i, --init           initialize your project, create new
    -am, --add-module     Add new module
    -rm, --remove-module  Remove existing module
        --git           add .gitignore
    -f, --force         force on non-empty directory
```
## Project Structure
```bash
├── bin
│   ├── www
├── libs
│   ├── logger.js  
├── modules
│   ├── module_one
│   │   ├── controllers/index.js
│   │   ├── models/index.js
│   │   ├── routes/index.js
│   ├── module_two
│   │   ├── controllers/index.js
│   │   ├── models/index.js
│   │   ├── routes/index.js
├── routes
│   ├── index.js
├── node_modules
├── app.js
├── variable.env
├── package.json
├── variable.env.example
└── .gitignore
```

`variables.env.example` is the file that serves as example for other people contributing to your project, it contains all the needed *env* variables with dummy values to be replaced after your project gets cloned (`variables.env` does not get tracked by git).

## Before running this project (after cloned from *github*)
* change the name of `variables.env.example` to `variables.env`
* inside `variables.env` replace the value of the variables with your values
* run `npm install` to make sure dependencies intallation

## How to Run this project
```shell
// Development
$ npm run dev
// Debug
$ npm run debug
// Default
$ npm start

```

## Mongoose
You can choose if you want to use [mongoose](http://mongoosejs.com/) in your project.

We recomend you to create an account on [mlab](https://mlab.com/), it is free; after that create a new database. To use it your project, you should paste the MongoDB URI (the one that you find after creating the database) in the files `variables.env` and `variables.env.now` into MONGO_URI, MONGO_PASSWORD, MONGO_USER
> If you don't use authenticated mongodb e.g local mongodb then remove MONGO_USER and MONGO_PASSWORD from variable.env file.
## Third-Party Libraries

+ winston: We are using `winston-2.x.x` to as logger. You can find the package [here](https://www.npmjs.com/package/winston)
> If you want to write logs into file then uncomment the first console from `lib/logger.js` and make a log file with same name.

+ slug: We are using `slug` to slugify. You can find the package [here](https://www.npmjs.com/package/slug)

+ mongoose-unique-validator: it is a plugin to validate unique into Mongoose Unique Validation instances. You can find the package [here](https://www.npmjs.com/package/mongoose-unique-validator)


## Endpoints
Request      | Response
-------------|----------------------------
GET base-url/examples | This will return all example with pagination support
POST base-url/examples | This will create a new example
GET base-url/example/{id} | This will return a example
PUT base-url/example/{id} | This is for updating a example
DELETE base-url/example | This will delete the example with identification

### Upcoming Features
- [ ] JWT integration for authentication and authorization
- [ ] DeployNow integration
- [ ] AWS-SDK
- [ ] ApiDoc generation
- [ ] Automated deploy with pm2 and Python-Fabric
- [ ] Dockerize
- [ ] and Based on feedback



## License
### The MIT License

Copyright (c) 2018 [Osman Goni Nahid](https://osmangoni.info/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
