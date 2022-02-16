/**
 * npm i apollo-datasource-mongodb
 * https://github.com/GraphQLGuide/apollo-datasource-mongodb/
 *
 */
const { MongoDataSource } = require('apollo-datasource-mongodb')

class Users extends MongoDataSource {
  findByEmail(email) {
    return this.model.findOne({ email })
  }
  findByUsername(username) {
    return this.model.findOne({ username })
  }
  // 保存到数据库
  saveUser(args) {
    const user = new this.model(args)
    return user.save()
  }
  findById(userId) {
    return this.findOneById(userId)
  }
  //   更新数据
  updateUser(userId, data) {
    console.log(userId)
    console.log(data)
    return this.model.findOneAndUpdate(
      { _id: userId }, // 条件
      data,
      {
        new: true, // 默认返回更新前的数据。tru返回更新后的数据
      }
    )
  }
}

module.exports = Users
