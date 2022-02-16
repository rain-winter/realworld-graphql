/**
 * 定义 Schema
 */
const { gql } = require('apollo-server-express')
const typeDefs = gql`
  # 自定义指令
  directive @upper on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION

  type User {
    email: String!,
    # newUserName:String,@deprecated(reason:"请使用newUserName")
    username: String! ,
    token: String,
    bio: String,
    image: String
    following: Boolean
  }
  # 返回这个对象
  type UserPayLoad {
    user: User
  }

  type Query {
    # foo: String @upper
    foo: String @auth
    currentUser: User @auth
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
  input UpdateUserInput {
    email: String
    username: String
    password: String
    image: String
    bio: String
  }

  # Article
  input CreateArticleInput {
    title: String!
    description: String!
    body: String!
    tagList: [String!]
  }
  type Article {
    _id: String!
    title: String!
    description: String!
    body: String!
    tagList: [String!]
    createdAt: String!
    updateAt: String!
    favorited: Boolean
    favoritesCount: Int
    author: User
  }
  type CreateArticlePayloas {
    article: Article
  }

  # 它只能更新当前用户，所以加了auth指令
  type Mutation {
    # User
    login (user: LoginInput!): UserPayLoad
    createUser (user: CreateUserInput): UserPayLoad
    updateUser (user: UpdateUserInput): UserPayLoad @auth
    
    # Article
    createArticle (article: CreateArticleInput): Article
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