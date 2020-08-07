const {Router} = require('express');
const router = Router();
const models = require('../models');
const tr = require('transliter');

// GET for add
router.get('/edit/:id', async (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');

  if (!userId || !userLogin) {
    res.redirect('/');
  } else {
    try {
      const post = await models.Post.findById(id);

      if (!post) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      }

      res.render('post/edit', {
        post,
        user: {
          id: userId,
          login: userLogin
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});

// GET for add
router.get('/add', async (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;

  if (!userId || !userLogin) {
    res.redirect('/');
  } else {
    try {
      const post = await models.Post.findOne({
        userId,
        status: 'draft'
      });

      if (post) {
        res.redirect(`/post/edit/${post.id}`);
      } else {
        const post = await models.Post.create({
          userId,
          status: 'draft'
        });
        res.redirect(`/post/edit/${post.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// POST is add
router.post('/add', async (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;

  if (!userId || !userLogin) {
    res.redirect('/');
  } else {
    const title = req.body.title.trim().replace(/ +(?= )/g, '');
    const body = req.body.body.trim();
    const isDraft = !!req.body.isDraft;
    const postId = req.body.postId;
    const url = `${tr.slugify(title)}-${Date.now().toString(36)}`;

      try {
        const post = await models.Post.findOneAndUpdate(
          {
            _id: postId,
            userId: userId
          },
          {
            title,
            body,
            url,
            userId,
            status: isDraft ? 'draft' : 'published'
          },
          { new: true }
        );

        // console.log(post);

        if (!post) {
          res.json({
            ok: false,
            error: 'Пост не твой!'
          });
        } else {
          res.json({
            ok: true,
            post
          });
        }

        ///
      } catch (error) {
        res.json({
          ok: false
        });
      }
  }
});

module.exports = router;
