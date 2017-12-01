const Joi = require('joi')

const createEvent = {
  method: 'PATCH',
  path: '/api/events/{code}/questions/{questionId}',
  config: {
    tags: ['api', 'like question'],
    description: 'Audience like a question',
    notes: 'Audience will like question, it will be toggle feature',
    validate: {
      params: {
        code: Joi.string().required(),
        questionId: Joi.string().required()
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
      const { id: audienceId } = req.auth.credentials
      const { events } = req.server

      return events
        .likeQuestion(code, questionId, audienceId)
        .then(data => {
          if (data) {
            reply(data).code(200)
          } else {
            reply().code(404)
          }
        })
    }
  }
}

module.exports = createEvent
