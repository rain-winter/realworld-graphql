const { MongoDataSource } = require('apollo-datasource-mongodb')

class Articles extends MongoDataSource {
  createArticle(data) {
    const article = new this.model(data)
    return article.save()
  }
}

module.exports = Articles
