const {Router} = require('express');
const router = Router();
const models = require('../models');
const config = require('../config');

function posts(req, res) {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const perPage = +config.PER_PAGE;
    const page = req.params.page || 1;
  
    models.Post.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then(posts => {
        models.Post.count()
          .then(count => {
            res.render('index', {
              posts,
              current: page,
              pages: Math.ceil(count / perPage),
              user: {
                id: userId,
                login: userLogin
              }
            });
          })
      })
      .catch(console.log);
  }
  
  // routers
  router.get('/', (req, res, next) => posts(req, res));
  router.get('/archive/:page', (req, res, next) => posts(req, res));

module.exports = router;