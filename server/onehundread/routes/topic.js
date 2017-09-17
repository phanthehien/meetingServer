const { topicHandler } = require('../handlers')

const routeCategory = {
  method: 'GET',
  path: '/api/topic/{name?}',
  config: {
    tags: ['api', 'topic'],
    description: 'Get topic',
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
