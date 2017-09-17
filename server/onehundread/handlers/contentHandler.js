const contentHandler = (request, reply) => {
  const contentName = request.params.name

  const data = require('../../../data/' + contentName)
  return reply(data)
}

module.exports = { contentHandler }
