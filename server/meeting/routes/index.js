const list = require('./list')
const listQuestion = require('./listQuestion')
const create = require('./create')
const editQuestion = require('./markQuestion')
const markQuestion = require('./editQuestion')
const get = require('./loginEvent')
const login = require('./login')
const askQuestion = require('./askQuestion')
const likeQuestion = require('./likeQuestion')
const getEventDetail = require('./getEventDetail')

module.exports = [
  list,
  create,
  editQuestion,
  markQuestion,
  get,
  login,
  askQuestion,
  likeQuestion,
  listQuestion,
  getEventDetail
]
