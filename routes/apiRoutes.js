const User = require('../models/Users');
const Kudo = require('../models/Kudos');

module.exports = function(app) {
  app.get('/api/kudos', function(req, res) {
    Kudo.find({})
      .populate('to')
      .populate('from')
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get('/api/user', function(req, res) {
    User.find({})
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post('/api/kudo', function(req, res) {
    const userId = req.body.userId;
    const newKudo = {
      title: req.body.title,
      body: req.body.body,
      to: req.body.to,
      from: req.body.from
    };

    console.log(newKudo);
    Kudo.create(newKudo)
      .then(function(Kudodata) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { kudos: KudoData._id } },
          { new: true }
        );
      })
      .then(function(userData) {
        res.json(userData);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
