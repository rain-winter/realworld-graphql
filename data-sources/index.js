
const dbModel = require('../models')

const Users = require('./user')
const Articles = require('./article')

module.exports = () => {
    return {
        Users: new Users(dbModel.User),
        Articles: new Articles(dbModel.Article)
    }
}
// const User = require('../models/User')
// const Article = require('../models/Article')
// console.log(User)
// const Users = require('./user')
// const Articles = require('./article')

// module.exports = () => {
//     return {
//         Users: new Users(User),
//         Articles: new Articles(Article)
//     }
// }
