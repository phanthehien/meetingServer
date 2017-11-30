const Joi = require('joi')

const listEvent = {
  method: 'POST',
  path: '/api/login',
  config: {
    auth: false,
    tags: ['api', 'authentication'],
    description: 'Admin login',
    notes: 'admin login to the admin page',
    validate: {
      payload: {
        username: Joi.string().required(),
        password: Joi.string().required()
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
      const { username, password } = req.payload
      const { users } = req.server
      return users
        .get(username, password)
        .then(user => {

          if (user) {
            const sid = user.username
            return req.server.app.cache.set(sid, { user }, 0, (err) => {

              if (err) {
                reply(err)
              }

              req.cookieAuth.set({ sid })
              return reply(user).code(200)
            })
          }

          return reply().code(400)
        })
    }
  }
}

module.exports = listEvent
