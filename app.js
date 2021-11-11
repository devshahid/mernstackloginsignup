// to work with expressjs
const express = require("express");

// it will use for all secrects
const dotenv = require("dotenv");

// calling express function and store meta data inside app, now app has all property of express
const app = express();

// configuring secrect keys path
dotenv.config({ path: "./config.env" });

// it will help to get the browser cookie
const cookieParser = require("cookie-parser");

//fetching port value from config.env
const PORT = process.env.PORT || 8000;

// connecting to database
require("./database/conn");

//using express.json to wrk with data in json form
app.use(express.json());

//using middleware for getting cookie from browser
app.use(cookieParser());

//most important all the route has been created on this file so using as middleware
app.use(require("./router/auth"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

// initializing the server at port value mentioned in config.env file
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
