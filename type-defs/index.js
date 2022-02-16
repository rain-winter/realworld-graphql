/**
 * 定义 Schema
 */
const { gql } = require('apollo-server-express')
const typeDefs = gql`
  directive @upper on FIELD_DEFINITION

  type User {
    email: String!,
    newUserName:String,
    username: String! @deprecated(reason:"请使用newUserName"),
    token: String,
    bio: String,
    image: String
  }
  # 返回这个对象
  type UserPayLoad {
    user: User
  }

  type Query {
    foo: String @upper
    currentUser: User
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

/**
mutation createUser{
  createUser(user:{username:"hello",password:"pass",email:"33"}) {
    user {
      username
      email
    }
  }
} 
*/