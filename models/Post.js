const {Schema, model} = require('mongoose')

const schema = new Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String
    },
    url: {
      type: String
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      required: true,
      default: 'published'
    },
    commentCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

schema.statics = {
  incCommentCount(postId) {
    return this.findByIdAndUpdate(
      postId,
      { $inc: { commentCount: 1 } },
      { new: true }
    );
  }
};

schema.set('toJSON', {
  virtuals: true
})

module.exports = model('Post', schema)