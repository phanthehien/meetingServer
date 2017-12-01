const list = require('./list')
const create = require('./create')
const editQuestion = require('./markQuestion')
const markQuestion = require('./editQuestion')
const get = require('./get')
const login = require('./login')
const askQuestion = require('./askQuestion')
const likeQuestion = require('./likeQuestion')

module.exports = [
  list,
  create,
  editQuestion,
  markQuestion,
  get,
  login,
  askQuestion,
  likeQuestion
]
