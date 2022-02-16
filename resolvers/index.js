const { UserInputError } = require('apollo-server-express')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const md5 = require('../util/md5')

const generateToken = (userId) => {
  const token = jwt.sign(
    {
      userId,
    },
    jwtSecret,
    {
      expiresIn: 60 * 60 * 24,
    }
  )
  return token
}

const resolvers = {
  Query: {
    foo() {
      return 'hello'
    },
  },
  Mutation: {
    async createUser(parent, { user }, { dataSources }) {
      // 判断用户、邮箱是否存在
      const users = dataSources.users
      const user1 = await users.findByEmail(user.email)
      if (user1) {
        throw new UserInputError('用户已存在')
      }
      const user2 = await users.findByUsername(user.email)
      if (user2) {
        throw new UserInputError('邮箱已存在')
      }
      // 保存用户
      const userData = await users.saveUser(user)
      // 生成token
      const token = generateToken(userData._id)
      // 返回客户端
      return {
        user: {
          ...userData.toObject(),
          token,
        },
      }
    },

    async login(parent, { user }, { dataSources }) {
      // 用户是否存在（email）
      const users = dataSources.users

      const userData = await users.findByEmail(user.email)
      if (!userData) {
        throw new UserInputError('邮箱不存在')
      }
      // 校验密码
      if (md5(user.password) != userData.password) {
        throw new UserInputError('密码错误')
      }

      const token = generateToken(userData._id)
      // 发送成功相应
      return {
        user: {
          ...userData.toObject(),
          token,
        },
      }
    },
  },
}

module.exports = resolvers
