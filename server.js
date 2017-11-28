'use strict'

const Hapi = require('hapi')
const config = require('config')

const routes = require('./routes')
const plugins = require('./plugins')
const logger = require('./server/utils/logger')
const Events = require('./server/meeting/models/events')

const server = new Hapi.Server()

server.connection({
  port: process.env.PORT || config.get('app.port')
})

// attach routes here
server.route(routes)

// register plugins
const registerPlugins = async () => {
  try {
    const events = new Events()
    await server.register(plugins)

    server.ext('onPreHandler', (request, reply) => {
      Object.assign(request.server, { events })
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
