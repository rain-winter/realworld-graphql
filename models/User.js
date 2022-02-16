const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('../util/md5') // md5 加密函数

const UserSchema = new mongoose.Schema(
  {
    ...baseModel,
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    password: {
      type: String,
      required: true,
      set: value => md5(value)
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    bio: {
      type: String,
      default: null
    },
    image: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    hash: String,
    salt: String,
  },
  { timestamps: true, usePushEach: true }
)

module.exports = mongoose.model('User', UserSchema)
