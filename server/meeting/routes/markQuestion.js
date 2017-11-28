const Joi = require('joi')

const createEvent = {
  method: 'PATCH',
  path: '/api/events/{code}/question/{questionId}/highlight',
  config: {
    tags: ['api', 'events'],
    description: 'Highlight Question',
    notes: 'Highlight question (max 3 questions)',
    validate: {
      params: {
        questionId: Joi.number().required(),
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
      const { code, questionId } = req.params
      const { events } = req.server

      return events
        .markQuestion(code, questionId)
        .then(event => reply(event).code(200))
    }
  }
}

module.exports = createEvent
