const faker = require('faker');
const models = require('./models');

const userId = 'userId'

module.exports = () => {
    models.Post.remove()
      .then(() => {
        Array.from({ length: 20 }).forEach(() => {
          models.Post.create({
            title: faker.lorem.words(5),
            body: faker.lorem.words(25),
            userId
          })
            .then(console.log)
            .catch(console.log);
        });
      })
      .catch(console.log);
  };
