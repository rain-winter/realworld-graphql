const { UserInputError } = require('apollo-server-express')

const resolvers = {
  Query: {
    foo () {
      return 'hello'
    },

  },
  Mutation: {
    async createUser (parent, { user }, { dataSources }) {
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
      console.log(userData)
      // 生成token
      // 返回客户端
      return {
        user: {
          ...userData.toObject(),
          token: '123'
        }
      }
    }
  }
}

module.exports = resolvers
