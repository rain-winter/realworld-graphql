/**
 * 定义 Schema
 */
const { gql } = require('apollo-server-express')
const typeDefs = gql`
  type User {
    email: String!,
    token: String,
    username: String!,
    bio: String,
    image: String
  }
  # 返回这个对象
  type UserPayLoad {
    user: User
  }

  type Query {
    foo: String
  }

  input LoginInput {
    email: String!,
    password: String!
  }
  input CreateUserInput {
    username: String!,
    email: String!,
    password: String!
  }

  type Mutation {
    login (user: LoginInput!): UserPayLoad
    createUser (user: CreateUserInput): UserPayLoad
  }
`
module.exports = typeDefs
