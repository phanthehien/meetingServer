const Joi = require('joi')

const createEvent = {
  method: 'POST',
  path: '/api/events',
  config: {
    tags: ['api', 'events'],
    description: 'Create event',
    notes: 'Create event',
    validate: {
      payload: Joi.object({
        name: Joi.string().required()
          .description('Name of the event')
          .example('Saturday night with your friend'),
        start: Joi.date().required()
          .description('start date with ISO String')
          .example('2017-11-29T16:58:12.823Z'),
        end: Joi.date().required()
          .description('start date with ISO String')
          .example('2017-11-29T16:58:12.823Z'),
        code: Joi.string().required()
          .description('Unique code for the event')
          .example('CB008')
      }).label('event item data'),
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
      const event = req.payload
      const { events } = req.server

      return events
        .create(event)
        .then(events => reply(events).code(200))
    }
  }
}

module.exports = createEvent
