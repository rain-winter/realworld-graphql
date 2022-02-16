/**
 * 加载 Schema
 */
const { makeExecutableSchema } = require('@graphql-tools/schema')
const typeDefs = require('./type-defs/index')
const resolvers = require('./resolvers/index')

// 大写指令
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils')
const { defaultFieldResolver } = require('graphql')
function upperDirectiveTransformer(schema, directiveName) {
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
          const result = await resolve(source, args, context, info)
          if (typeof result === 'string') {
            return result.toUpperCase()
          }
          return result
        }
        return fieldConfig
      }
    },
  })
}

// 这个方法，会把typeDefs resolvers 合成schema
let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
schema = upperDirectiveTransformer(schema, 'upper')
module.exports = schema
