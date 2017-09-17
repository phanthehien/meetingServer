const topicHandler = (request, reply) => {
  const topicName = request.params.name

  const data = require('../../../data/' + topicName)
  return reply(data)
}

module.exports = { topicHandler }
