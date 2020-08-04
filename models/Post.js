const {Schema, model} = require('mongoose')

const schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

schema.set('toJSON', {
  virtuals: true
})

module.exports = model('Post', schema)