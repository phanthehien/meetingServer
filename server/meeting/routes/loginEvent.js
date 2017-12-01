const Joi = require('joi')
const uuid = require('uuid/v4')
const data = require('../data/data')
const randomString = require('random-string')

const loginEvent = {
  method: 'GET',
  path: '/api/event/{code}/login',
  config: {
    auth: false,
    tags: ['api', 'event'],
    description: 'Audience will login this event',
    notes: 'Audience will login this event by just input the event code',
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
        .then(event => {

          if (event) {
            const randomName = randomString()
            const sid = uuid()
            const audience = {
              id: sid,
              name: randomName,
              type: 'audience',
              likes: []
            }
            return req.server.app.cache.set(sid, { user: audience }, 0, (err) => {

              if (err) {
                reply(err)
              }

              req.cookieAuth.set({ sid })

              const { audiences } = data
              audiences.push(audience)

              return reply(event).code(200)
            })
          }

          return reply().code(400)
        })
    }
  }
}

module.exports = loginEvent
