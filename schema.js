/**
 * 加载 Schema
 */
const { makeExecutableSchema  } = require('@graphql-tools/schema')
const typeDefs = require('./type-defs/index')
const resolvers = require('./resolvers/index')

// 这个方法，会把typeDefs resolvers 合成schema
const schema = makeExecutableSchema ({
    typeDefs,
    resolvers
})

module.exports = schema

