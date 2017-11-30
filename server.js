'use strict'

const hapiCookie = require('hapi-auth-cookie')
const Hapi = require('hapi')
const config = require('config')

const routes = require('./routes')
const plugins = require('./plugins')
const logger = require('./server/utils/logger')
const Events = require('./server/meeting/models/events')
const Users = require('./server/meeting/models/users')

const server = new Hapi.Server()

server.connection({
  port: process.env.PORT || config.get('app.port')
})

server.register([{
  register: hapiCookie
}], err => {
  if (err) {
    console.error('Failed to load a plugin:', err)
    throw err
  }

  const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 })
  server.app.cache = cache

  // Set our server authentication strategy
  server.auth.strategy('session', 'cookie', true, {
    password: 'somecrazycookiesecretthatcantbeguesseswouldgohere', // cookie secret
    cookie: 'app-cookie', // Cookie name
    isSecure: false, // required for non-https applications
    ttl: 24 * 60 * 60 * 1000, // Set session to 1 day,
    validateFunc: (request, session, callback) => {

      cache.get(session.sid, (err, cached) => {

        if (err) {
          return callback(err, false)
        }

        if (!cached) {
          return callback(null, false)
        }
        console.log('You are logging with ', cached.user)
        return callback(null, true, cached.user)
      })
    }
  })
})

// attach routes here
server.route(routes)

// register plugins
const registerPlugins = async () => {
  try {
    const events = new Events()
    const users = new Users()
    await server.register(plugins)

    server.ext('onPreHandler', (request, reply) => {
      Object.assign(request.server, { events, users })
      reply.continue()
    })

  } catch (error) {
    logger.error(error, 'Failed to register hapi plugins')
    throw error
  }
}

registerPlugins()

// export modules
module.exports = server
