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
            req.session.userId = user.id;
            req.session.userLogin = user.login;
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

// POST is register
router.post('/login', (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;

  models.User.findOne({ login })
      .then(user => {
        if (!user) {
          res.json({
            ok: false,
            error: 'Логин и пароль неверны!',
            fields: ['login', 'password']
          });
        } else {
          bcrypt.compare(password, user.password, function(err, result) {
            if (!result) {
              res.json({
                ok: false,
                error: 'Логин и пароль неверны!',
                fields: ['login', 'password']
              });
            } else {
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              res.json({
                ok: true
              });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({
          ok: false,
          error: 'Ошибка, попробуйте позже!'
        });
      });
});

// GET for logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;