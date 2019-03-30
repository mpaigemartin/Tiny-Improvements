const mongoose = require('mongoose');
const User = require('../models/Users');
mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/improvements');


const names = [
  {
    name: 'Aragorn'
  },
  {
    name: 'Boromir'
  },
  {
    name: 'Frodo'
  },
  {
    name: 'Samwise'
  },
  {
    name: 'Merriwhether'
  },
  {
    name: 'Perragrin'
  },
  {
    name: 'Gandalf'
  },
  {
    name: 'Legolas'
  },
  {
    name: 'Gimli'
  }
];


User.deleteMany({})
  .then(() => User.collection.insertMany(names))

  .then(data => {
    console.log(data.insertedCount + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
