/**
 * 加载 Schema
 */
const { makeExecutableSchema } = require('@graphql-tools/schema')
const typeDefs = require('./type-defs/index')

const userResolver = require('./resolvers/user')
const articleResolver = require('./resolvers/article')

const upperDirectiveTransformer = require('./schema-directives/upper') // 大写指令
const authDirectiveTransformer = require('./schema-directives/auth') //

// 这个方法，会把typeDefs resolvers 合成schema
let schema = makeExecutableSchema({
  typeDefs,
  resolvers: [userResolver, articleResolver],
})
schema = upperDirectiveTransformer(schema, 'upper')
schema = authDirectiveTransformer(schema, 'auth')

module.exports = schema
