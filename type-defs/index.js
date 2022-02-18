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

  type ArticlePayload {
    articles: [Article!],
    articlesCount: Int!
  }
  type Query {
    # foo: String @upper
    foo: String @auth
    currentUser: User @auth
    articles: ArticlePayload
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

  # Article 创建文章 传递的参数
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
  # 创建完，返回的数据格式
  type CreateArticlePayload {
    article: Article
  }

  # 它只能更新当前用户，所以加了auth指令
  type Mutation {
    # User
    login (user: LoginInput!): UserPayLoad
    createUser (user: CreateUserInput): UserPayLoad
    updateUser (user: UpdateUserInput): UserPayLoad @auth
    
    # Article ,他需要经过权限认证，就有了user._id
    createArticle (article: CreateArticleInput): CreateArticlePayload @auth
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