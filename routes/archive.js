const {Router} = require('express');
const router = Router();
const models = require('../models');
const config = require('../config');
const moment = require('moment');
moment.locale('ru');

async function posts(req, res) {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const perPage = +config.PER_PAGE;
    const page = req.params.page || 1;
  
    try {
      const posts = await models.Post.find({status: 'published'})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .populate('userId')
        .populate('uploads')
        .sort({ createdAt: -1 });

        posts.map(post => {
          let body = post.body;
          if (post.uploads.length) {
            post.uploads.forEach(upload => {
              post.body = body.replace(
                `src="${upload.id}"`,
                `src="/${config.DESTINATION}${upload.path}"`
              );
            });
          }
          post.save()
          return post
        });
      
      const count = await models.Post.count();
  
      res.render('archive/index', {
        posts,
        current: page,
        pages: Math.ceil(count / perPage),
        user: {
          id: userId,
          login: userLogin
        }
      });
    } catch (error) {
      console.log(error)
      throw new Error('Server Error');
    }
}
  
  // routers
  router.get('/', (req, res, next) => posts(req, res));
  router.get('/archive/:page', (req, res, next) => posts(req, res));

  router.get('/posts/:post', async(req, res, next) => {
    const url = req.params.post.trim().replace(/ +(?= )/g, '');
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
  
    if (!url) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
      try {
        const post = await models.Post.findOne({
          url,
          status: 'published'
        }).populate('uploads');
  
        if (!post) {
          const err = new Error('Not Found');
          err.status = 404;
          next(err);
        } else {

          const comments = await models.Comment.find({
            postId: post.id,
            parent: { $exists: false }
          });

          let body = post.body;
          if (post.uploads.length) {
            post.uploads.forEach(upload => {
              post.body = body.replace(
                `src="${upload.id}"`,
                `src="/${config.DESTINATION}${upload.path}"`
              );
            });
          }

          post.save()

          res.render('post/post', {
            post,
            comments,
            moment,
            user: {
              id: userId,
              login: userLogin
            }
          });
        }
      } catch (error) {
        throw new Error('Server Error');
      }
    }
});  

// users posts
router.get('/users/:login/:page*?', async(req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const perPage = +config.PER_PAGE;
  const page = req.params.page || 1;
  const login = req.params.login;

  try {
    const user = await models.User.findOne({
      login
    });

    const posts = await models.Post.find({
      userId: user.id
    })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .populate('uploads');

      posts.map(post => {
        let body = post.body;
        if (post.uploads.length) {
          post.uploads.forEach(upload => {
            post.body = body.replace(
              `src="${upload.id}"`,
              `src="/${config.DESTINATION}${upload.path}"`
            );
          });
        }
        post.save()
        return post
      });

    const count = await models.Post.count({
      userId: user.id
    });

    res.render('archive/user', {
      posts,
      _user: user,
      current: page,
      pages: Math.ceil(count / perPage),
      user: {
        id: userId,
        login: userLogin
      }
    });
  } catch (error) {
    throw new Error('Server Error');
  }
});

module.exports = router;