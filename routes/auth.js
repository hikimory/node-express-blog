const {Router} = require('express');
const router = Router();
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');

// POST is register
router.post('/register', async(req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;

  try {
    const user = await models.User.findOne({
      login
    });

    if (!user) {
      bcrypt.hash(password, null, null, async(err, hash) => {
        const newUser = await models.User.create({
            login,
            password: hash
        })
         
        console.log(newUser);
        req.session.userId = newUser.id;
        req.session.userLogin = newUser.login;
        res.json({
          ok: true
        });
      });
    } else {
      res.json({
        ok: false,
        error: 'Имя занято!',
        fields: ['login']
      });
    }
  } catch (err) {
      console.log(err);
      res.json({
        ok: false,
        error: 'Ошибка, попробуйте позже!'
      });
  }
  
});

// POST is login
router.post('/login', async(req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;

  try {
    const user = await models.User.findOne({
      login
    });

    if (!user) {
      res.json({
        ok: false,
        error: 'Логин и пароль неверны!',
        fields: ['login', 'password']
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
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
  } catch (err) {
      console.log(err);
      res.json({
        ok: false,
        error: 'Ошибка, попробуйте позже!'
      });
  }

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