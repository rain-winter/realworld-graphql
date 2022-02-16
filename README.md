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

# md5

~~~js
const crypto = require('crypto')

/**
 * @param {*} str 传过来的密码
 * @returns 返回一个16进制加密字符串
 */
module.exports = (str) => {
  return crypto
    .createHash('md5') // 创建 md5
    .update('winter' + str) // rain是盐，一个字符串，将和密码拼接
    .digest('hex') // 16进制结果，还可以是Base64
}
~~~

# JWT

* JWT是一种跨域认证解决方案
* JWT会生成签名，保证传输安全
* JWT具有时效性
* JWT更高效利用集群做好单点登录

## 原理

服务器认证后，生成一个JSON对象，后续通过JSON进行通信

## 数据结构

Header.Payload.Signature

* Header（要对它进行base64处理。是一个对象）

~~~json
{
    "alg": "HS345",
    "type": "JWT"
}
~~~

* Payload

~~~tst
iss（issuer）：签发人
exp（expiration time）过期时间
sub (subject):主题
aud (audience):受众
nbf (Not Before):生效时间
iat (Issued At):签发时间
jti (JWT ID):编号
~~~

~~~json
{
    "sub": "123455",
    "name": "Jonh",
    "admin": true
}
~~~

* Signature

## 使用方式

* /api?token=xxx
* cookie写入token
* storage写入token，请求头添加：`Authorization:Bearer<token>`

~~~bat
npm install jsonwebtoken
~~~

~~~js
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.sign = promisify(jwt.sign)
exports.verify = promisify(jwt.verify)
exports.decode = promisify(jwt.decode)
~~~

~~~js
const token = await jwt.sign(
    {userId: userData._id,},
    jwtSecret,
    {expiresIn: 60 * 60 * 24,}
)
~~~
# 接口

## 用户

### 添加用户

type-defs

~~~js
const typeDefs = gql`
	type Mutation {
		login (user: LoginInput!): UserPayLoad
		createUser (user: CreateUserInput): UserPayLoad
	}
`
~~~

resolvers

~~~js
async createUser(parent, { user }, { dataSources }) {}
async login(parent, { user }, { dataSources }) {}
~~~

### 获取当前登录用户

type-defs

~~~js
const typeDefs = gql`
  # 自定义指令
  directive @auth on FIELD_DEFINITION
  type Query {
  	currentUser: User @auth
  }
`
~~~

~~~js
// index.js
const server = new ApolloServer({
    schema,
    dataSources,
    context({ req }) { // 所有的 GraphQL 都会经过这里
      const token = req.headers['authorization']
      return {token }
    },
 })
~~~

~~~js
// auth.js
我们在这里通过操作获取context里的token，然后添加到context上
~~~

~~~js
// resolvers.js
const resolvers = {
    currentUser(parent, args, context, info) {
        return context.user // 在这直接返回当前用户
    }
}
~~~



### 指令

~~~js
mutation login($if: Boolean!) {
  login(user: { email: "100@qq.com", password: "111" }) {
    user {
      username @include(if: false) // false，不显示字段
      email @skip(if: $if) // true不显示字段
      token
    }
  }
}
~~~

### 自定义指令

type-defs

~~~js
const typeDefs = gql`
  # 声明
  directive @upper on FIELD_DEFINITION
  type Query {
    foo: String @upper
    currentUser: User
  }
 `
~~~

~~~js
// 大写指令 schema.js
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils')
const { defaultFieldResolver } = require('graphql')
function upperDirectiveTransformer(schema, directiveName) {}
schema = upperDirectiveTransformer(schema, 'upper')
~~~



### 更新当前登录的用户

~~~js
// type-defs
const typeDefs = gql`
    input UpdateUserInput {
        email: String
        username: String
        password: String
        image: String
        bio: String
     }
    type Mutation {
  	  updateUser (user: UpdateUserInput): UserPayLoad @auth
 	}
`
~~~

~~~js
// data-sources
// 必须返回，不反回不更新
updateUser(userId, data) {
    return this.model.findOneAndUpdate(
        {  _id: userId }, // 条件
        data,
        { new: true,} // 默认返回更新前的数据。tru返回更新后的数据
    )
}
~~~

~~~js
// resolvers.js
async updateUser(parent, { user: userInput }, { user, dataSources }) { 
    // 调用更新用户的方法，并返回数据
},
~~~

## 文章



