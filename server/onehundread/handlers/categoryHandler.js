const data = require('../../../data/category.json')

const categoryHandler = (request, reply) => {
  return reply(data)
}

module.exports = { categoryHandler }
