
//  加载 数据库model
const dbModel = require('../models')

const Users = require('./user')
const Articles = require('./article')

module.exports = () => {
    return {
        Users: new Users(dbModel.User),
        Articles: new Articles(dbModel.Article)
    }
}