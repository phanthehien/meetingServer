const Joi = require('joi')

const createEvent = {
  method: 'DELETE',
  path: '/api/events/{code}/question/{questionId}',
  config: {
    tags: ['api', 'events', 'question'],
    description: 'Delete question',
    notes: 'Delete event`s question',
    validate: {
      params: {
        questionId: Joi.string().required(),
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
        .deleteQuestion(code, questionId)
        .then(event => reply(event).code(200))
    }
  }
}

module.exports = createEvent
