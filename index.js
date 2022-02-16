const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')

// 加载Schema
const schema = require('./schema')
// datasources 默认加载index.js
const dataSources = require('./data-sources')

async function startApolloServer () {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    dataSources
  })

  await server.start()
  server.applyMiddleware({ app })

  await new Promise((resolve) => httpServer.listen({ port: 4001 }, resolve))

  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
}
startApolloServer()
