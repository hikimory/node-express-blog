const {Router} = require('express');
const router = Router();
const models = require('../models');

// GET for add
router.get('/add', (req, res, next) => {
    const id = req.session.userId;
    const login = req.session.userLogin;
  
    res.render('post/add', {
      user: {
        id,
        login
      }
    });
});

// POST is add
router.post('/add', (req, res, next) => {
  const title = req.body.title.trim().replace(/ +(?= )/g, '');
  const body = req.body.body;
    
    models.Post.create({
      title,
      body
    })
      .then(post => {
        console.log(post);
        res.json({
          ok: true
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          ok: false
        });
      });
});

module.exports = router;
