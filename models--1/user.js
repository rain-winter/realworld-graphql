const mongoose = require('mongoose')
// mongoose 数据模型，和 Graphql 的不一样
// 描述的是MongoDB集合
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});
// 导出一个叫User的模型
module.exports = mongoose.model('User', userSchema)