/**
 * npm i apollo-datasource-mongodb
 * https://github.com/GraphQLGuide/apollo-datasource-mongodb/
 *
 */
const { MongoDataSource } = require('apollo-datasource-mongodb')

class Users extends MongoDataSource {
    findByEmail (email) {
        return this.model.findOne({ email })
    }
    findByUsername (username) {
        return this.model.findOne({ username })
    }
    // 保存到数据库
    saveUser (args) {
        const user = new this.model(args)
        return user.save()
    }

}

module.exports = Users
