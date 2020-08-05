const {Router} = require('express');
const router = Router();

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

// POST is register
router.post('/add', (req, res, next) => {
    console.log(req.body);
    res.json({
      ok: true
    });
  });

module.exports = router;
