module.exports = {
  Query: {},
  Mutation: {
    async createArticle(parent, { article }, { user, dataSources }) {
      article.auth = user._id // 给它添加一个auth字段
      const res = await dataSources.articles.createArticle(article)
      
      return {
        article: res,
      }
    },
  },
}
