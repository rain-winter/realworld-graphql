# 目录
* data-sources 
  * index.js ，获取Users、Articles的MongoDataSource，并导出GraphQL的dataSources
  * user.js， Users类继承MongoDataSource，提供操作数据库的方法
* models
  * index.js， 导出模块类，连接数据库
  * user.js， 提供MongoDB的Schema
* resolvers
  * index.js， 
* type-defs
  * index.js
* schema.js 通过makeExecutableSchema()，把typeDefs resolvers 合成schema
* util
  * jwt.js
  * md5.js
* index.js 入口文件