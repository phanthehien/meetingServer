const topicHandler = (request, reply) => {
  const topicName = request.params.name

  const path = '../../../data/' + topicName
  let data = require(path)
  return reply(data)
}

module.exports = { topicHandler }
