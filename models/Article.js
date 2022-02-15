var mongoose = require('mongoose')
const baseModel = require('./base-model')

var ArticleSchema = new mongoose.Schema({
  ...baseModel,
  slug: {
    type: String,
    lowercase: true,
    unique: true
  },
  title: String,
  description: String,
  body: String,
  favoritesCount: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tagList: [{
    type: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true,
  usePushEach: true
})


mongoose.model('Article', ArticleSchema)