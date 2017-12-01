const data = require('../data/data')

class Users {

  constructor (opts) {
    Object.assign(this, opts)
  }

  async list () {
    const { users } = data
    return users
  }

  async get (username, password) {
    const { users } = data

    const user = users.find(user =>
      user.username === username &&
      user.password === password &&
      user.status === 'active'
    )

    return user
  }
}

module.exports = Users
