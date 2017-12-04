const Joi = require('joi')

const createEvent = {
  method: 'PATCH',
  path: '/api/events/{code}/question/{questionId}',
  config: {
    tags: ['api', 'events'],
    description: 'Edit Question',
    notes: 'Edit question of audience',
    validate: {
      payload: Joi.object({
        name: Joi.string().required()
          .description('Updated of the question')
          .example('How to register to be cashback user?')
      }).label('event item data'),
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
      const { name } = req.payload
      const { events } = req.server

      return events
        .editQuestion(code, questionId, name)
        .then(event => reply(event).code(200))
    }
  }
}

module.exports = createEvent
