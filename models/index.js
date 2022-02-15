const mongoose = require('mongoose');

const { dbUrl } = require('../config/config.default')

mongoose.connect(dbUrl);

const db = mongoose.connection

db.on('error', err => {
    console.log('MongoDB 数据库连接失败:', err)
})

db.once('open', function () {
    console.log('连接数据库成功')
})

// 导出模块类
module.exports = {
    User: require('./user'),
    Article: require('./article'),
}