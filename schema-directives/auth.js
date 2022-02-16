// 大写指令
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils')
const { defaultFieldResolver } = require('graphql')
const { AuthenticationError } = require('apollo-server-express')
const { jwtSecret } = require('../config/config.default')
const jwt = require('../util/jwt')

function authDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const upperDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0]

      if (upperDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          // 从context里获取token和 dataSources
          const { token, dataSources } = context
          if (!token) {
            throw new AuthenticationError('未授权')
          }
          try {
            const decodedData = await jwt.verify(token, jwtSecret)
            console.log(decodedData)
            // 拿到当前的用户
            const user = await dataSources.users.findById(decodedData.userId)
            console.log(user)
            // 把当前用户添加到context上下文对象上
            context.user = user
          } catch (err) {
            throw new AuthenticationError('未授权2')
          }
          // 重新调用该方法
          const result = await resolve(source, args, context, info)
          return result
        }
      }
    },
  })
}

module.exports = authDirectiveTransformer
// {
//     userId: '620cc8350c0eeb4da5e7fe2e',
//     iat: 1645004853,
//     exp: 1645091253
//   }
