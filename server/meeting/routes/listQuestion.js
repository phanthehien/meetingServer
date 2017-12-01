const listEvent = {
  method: 'GET',
  path: '/api/questions',
  config: {
    auth: false,
    tags: ['api', 'questions'],
    description: 'Get all questions',
    notes: 'Get all questions created by all audiences',
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
    handler: (req, reply) => {
      const { events } = req.server

      return events
        .listQuestion()
        .then(questions => reply(questions).code(200))
    }
  }
}

module.exports = listEvent
