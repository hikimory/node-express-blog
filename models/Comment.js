const {Schema, model} = require('mongoose')
const autopopulate = require('mongoose-autopopulate');

const schema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: true
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

schema.plugin(autopopulate);

schema.set('toJSON', {
  virtuals: true
});

module.exports = model('Comment', schema);