require("dotenv").config();
const mongoose = require("mongoose");
//const db = process.env.DATABASE;
const db ='mongodb+srv://dhanepratik543:ODXuIu9a5nEhzxIm@elderease.u0jv9nd.mongodb.net/'
console.log("MongoDB URI:", db);

mongoose
  .connect(db)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Cannot connect to database"));
