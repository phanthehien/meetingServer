const data = require('../../../data/english.json')

const routeCategory = {
  method: 'GET',
  path: '/api/english',
  config: {
    tags: ['api', 'english'],
    description: 'Get english',
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
