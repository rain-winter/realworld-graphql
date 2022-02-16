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

## 文章



