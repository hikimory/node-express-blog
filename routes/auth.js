const {Router} = require('express');
const router = Router();
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');

// POST is authorized
router.post('/register', (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;

  models.User.findOne({
    login
  }).then(user => {
    if (!user) {
      bcrypt.hash(password, null, null, (err, hash) => {
        models.User.create({
          login,
          password: hash
        })
          .then(user => {
            console.log(user);
            res.json({
              ok: true
            });
          })
          .catch(err => {
            console.log(err);
            res.json({
              ok: false,
              error: 'Ошибка, попробуйте позже!'
            });
          });
      });
    } else {
      res.json({
        ok: false,
        error: 'Имя занято!',
        fields: ['login']
      });
    }
  });
});

module.exports = router;