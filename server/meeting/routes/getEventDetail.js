const Joi = require('joi')

const getEventDetail = {
  method: 'GET',
  path: '/api/events/{code}',
  config: {
    auth: false,
    tags: ['api', 'event'],
    description: 'Admin will get event detail',
    notes: 'Admin will manage event questions',
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
        .getEventDetail(code)
        .then(event => {

          if (event) {
            return reply(event).code(200)
          }

          return reply().code(400)
        })
    }
  }
}

module.exports = getEventDetail
