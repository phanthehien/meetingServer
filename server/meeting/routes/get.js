const Joi = require('joi')

const listEvent = {
  method: 'GET',
  path: '/api/events/{code}',
  config: {
    tags: ['api', 'event'],
    description: 'Get event  by code',
    notes: 'Get event by code',
    validate: {
      params: {
        code: Joi.string().required()
      },
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
    handler: (req, reply) => {
      const { code } = req.params
      const { events } = req.server
      return events
        .get(code)
        .then(event => reply(event).code(200))
    }
  }
}

module.exports = listEvent
