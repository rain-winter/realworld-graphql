module.exports = {
  Query: {
    // 获取全部文章
    async articles(parent, {}, { dataSources }) {
      const [articles, articlesCount] = await Promise.all([
        dataSources.articles.getArticles(),
        dataSources.articles.getCount(),
      ])
      return {
        articles,
        articlesCount,
      }
    },
  },
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
