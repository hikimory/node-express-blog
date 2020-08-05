const {Router} = require('express');
const router = Router();
const models = require('../models');

// GET for add
router.get('/add', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;

  if (!userId || !userLogin) {
    res.redirect('/');
  } else {
    res.render('post/add', {
      user: {
        id: userId,
        login: userLogin
      }
    });
  }
});

// POST is add
router.post('/add', (req, res, next) => {
 
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
  
    if (!userId || !userLogin) {
      res.redirect('/');
    } else{
        const title = req.body.title.trim().replace(/ +(?= )/g, '');
        const body = req.body.body;
        
        models.Post.create({
          title,
          body,
          userId 
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
    }
});

module.exports = router;
