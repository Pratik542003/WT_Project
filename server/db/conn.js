require("dotenv").config();
const mongoose = require("mongoose");
//const db = process.env.DATABASE;
console.log("MongoDB URI:", db);

mongoose
  .connect(db)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Cannot connect to database"));
