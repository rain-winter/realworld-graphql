/**
 * npm i apollo-datasource-mongodb
 * https://github.com/GraphQLGuide/apollo-datasource-mongodb/
 *
 */
const { MongoDataSource } = require('apollo-datasource-mongodb')

class Users extends MongoDataSource {
    findByEmail (email) {
        return this.findByFields({
            email
        })

    }
    findByUsername (username) {
        return this.model.findOne({ username })
    }
    getUser () {
        return this.findOneById("620b88d0438c6ba6faa58b04")
    }
}

module.exports = Users
