const data = require('../../../data/topic.json')

const routeCategory = {
  method: 'GET',
  path: '/api/topic',
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
    handler (request, reply) {
      return reply(data)
    }
  }
}

module.exports = routeCategory
