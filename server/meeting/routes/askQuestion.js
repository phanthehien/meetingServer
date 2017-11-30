const Joi = require('joi')

const createEvent = {
  method: 'POST',
  path: '/api/events/{code}/questions',
  config: {
    tags: ['api', 'events question'],
    description: 'Audience asks a question',
    notes: 'User will post question to the event',
    validate: {
      params: {
        code: Joi.string().required()
      },
      payload: {
        question: Joi.string().required()
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
      const { question } = req.payload
      const { events } = req.server

      return events
        .askQuestion(code, question)
        .then(event => reply(event).code(200))
    }
  }
}

module.exports = createEvent
