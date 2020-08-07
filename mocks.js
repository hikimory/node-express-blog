const faker = require('faker');
const models = require('./models');
const tr = require('transliter');

const userId = 'userId'

module.exports = async () => {
    try {
      await models.Post.remove();
  
      Array.from({ length: 20 }).forEach(async () => {
        const title = faker.lorem.words(5);
        const url = `${tr.slugify(title)}-${Date.now().toString(36)}`;
        const post = await models.Post.create({
          title,
          body: faker.lorem.words(25),
          url,
          userId
        });
        console.log(post);
      });
    } catch (error) {
      console.log(error);
    }
};
