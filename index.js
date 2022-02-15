const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')

// 加载Schema
const schema = require('./schema')
// datasources 默认加载index.js
const { datasources } = require('./data-sources/index')

async function startApolloServer () {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    datasources
  })

  await server.start()
  server.applyMiddleware({ app })

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}
startApolloServer()
