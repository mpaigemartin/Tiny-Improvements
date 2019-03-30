const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kudosdb");

const names = [
  {
    name: "Aragorn"
  },
  {
    name: "Boromir"
  },
  {
    name: "Frodo"
  },
  {
    name: "Samwise"
  },
  {
    name: "Merriwhether"
  },
  {
    name: "Perragrin"
  },
  {
    name: "Gandalf"
  },
  {
    name: "Legolas"
  },
  {
    name: "Gimli"
  }
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(names))
  .then(data => {
    console.log(data.insertedCount + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
