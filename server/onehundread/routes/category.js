const { categoryHandler } = require('../handlers')

const routeCategory = {
  method: 'GET',
  path: '/api/category',
  config: {
    tags: ['api', 'Category'],
    description: 'Get categoryHandler.js',
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
    handler: categoryHandler
  }
}

module.exports = routeCategory
