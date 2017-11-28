const listEvent = {
  method: 'GET',
  path: '/api/events',
  config: {
    tags: ['api', 'events'],
    description: 'Get all events',
    notes: 'Get all events created by this admin',
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
        .list()
        .then(events => reply(events).code(200))
    }
  }
}

module.exports = listEvent
