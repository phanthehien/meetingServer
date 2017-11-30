const data = {
  users: [
    {
      userId: 1,
      name: 'Hien Phan',
      username: 'hien',
      password: 'admin',
      lastUpdated: '2017-11-29T16:48:12.823Z',
      status: 'active'
    },
    {
      userId: 2,
      name: 'event administrator',
      username: 'admin',
      password: 'admin',
      lastUpdated: '2017-11-29T16:48:12.823Z',
      status: 'active'
    },
    {
      userId: 3,
      name: 'Ethan Ang',
      username: 'ethan',
      password: '123',
      lastUpdated: '2017-11-29T16:48:12.823Z',
      status: 'active'
    }
  ]
}

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
