const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
      postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      path: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );
  
  schema.set('toJSON', {
    virtuals: true
  });
  
  module.exports = model('Upload', schema);