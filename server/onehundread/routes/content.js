const { topicHandler } = require('../handlers')

const routeCategory = {
  method: 'GET',
  path: '/api/content/{name?}',
  config: {
    tags: ['api', 'content'],
    description: 'Get content',
    validate: {
      query: null,
      headers: null
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: { description: 'Success', schema: {} },
          404: { description: 'Not Found', schema: {} },
          500: { description: 'Internal Error', schema: {} }
        }
      }
    },
    handler: topicHandler
  }
}

module.exports = routeCategory
