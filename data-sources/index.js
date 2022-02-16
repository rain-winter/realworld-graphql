
const dbModel = require('../models')

const Users = require('./user')
const Articles = require('./article')

// dataSources
module.exports = () => {
    return {
        users: new Users(dbModel.User),
        articles: new Articles(dbModel.Article)
    }
}

