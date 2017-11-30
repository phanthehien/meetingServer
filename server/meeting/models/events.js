const uuid = require('uuid/v4')

const data = {
  events: [
    {
      eventId: 1,
      name: 'How to use cashback feature?',
      code: 'CB001',
      start: '2017-11-28T16:48:12.823Z',
      end: '2017-11-29T16:48:12.823Z',
      lastUpdated: '2017-11-30T21:34:47.356Z',
      status: 'active',
      questions: [{
        questionId: 1,
        question: 'Do I need to do paper work to use cashback?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }, {
        questionId: 2,
        question: 'My iOS device is good enough for cashback 2?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }, {
        questionId: 3,
        question: 'Do I need to do paper work to use cashback 3?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }, {
        questionId: 4,
        question: 'My iOS device is good enough for cashback 4?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }, {
        questionId: 5,
        question: 'Do I need to do paper work to use cashback 5?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }, {
        questionId: 6,
        question: 'My iOS device is good enough for cashback 6?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }
      ],
      good: [1]
    },
    {
      eventId: 2,
      name: 'Where we can use cashback feature?',
      code: 'CB002',
      start: '2017-11-28T16:58:12.823Z',
      end: '2017-12-15T16:58:12.823Z',
      lastUpdated: '2017-11-28T16:58:12.823Z',
      status: 'active',
      questions: [{
        questionId: 1,
        question: 'Are you good?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }, {
        questionId: 2,
        question: 'So how minimum money I need to pay for cashback?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }
      ],
      good: [1, 2]
    },
    {
      eventId: 3,
      name: 'How to use cashback feature?',
      code: 'CB003',
      start: '2017-11-27T16:48:12.823Z',
      end: '2017-12-28T16:48:12.823Z',
      lastUpdated: '2017-11-27T16:48:12.823Z',
      status: 'inactive',
      questions: [{
        questionId: 1,
        question: 'I have android, can I use it?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }, {
        questionId: 2,
        question: 'Can I use with Samsung Pay?',
        createdDateAt: '2017-11-30T21:34:47.356Z'
      }
      ],
      good: []
    }
  ]
}

class Events {

  constructor (opts) {
    Object.assign(this, opts)
  }

  async list () {
    const { events } = data
    return events
  }

  async get (code) {
    const { events } = data
    const now = new Date().toISOString()

    const event = events.find(event =>
      event.code === code &&
      event.status === 'active' &&
      (now >= (new Date(event.start)).toISOString()) &&
      (now <= (new Date(event.end)).toISOString())
    )

    return event
  }

  async create (event) {
    const { events } = data

    const now = new Date()

    event.status = 'active'
    event.eventId = event.code
    event.lastUpdated = now.toISOString()
    events.push(event)
    return event
  }

  async editQuestion (eventCode, questionId, content) {
    const { events } = data

    const event = events.find(event => event.code === eventCode)

    if (event) {
      const question = event.questions.find(question => question.questionId === questionId)
      if (question) {
        const now = new Date()
        question.question = content
        event.lastUpdated = now.toISOString()
      }
    }

    return event
  }

  async markQuestion (eventCode, questionId) {
    const { events } = data

    const event = events.find(event => event.code === eventCode)

    if (event) {
      const question = event.questions.find(question => question.questionId === questionId)
      if (question) {
        const now = new Date()

        const index = event.good.indexOf(questionId)
        if (index < 0) {
          event.good.push(questionId)
          const length = event.good.length

          if (length > 3) {
            event.good = event.good.slice(length - 3, length)
          }
        }

        event.lastUpdated = now.toISOString()
      }
    }

    return event
  }

  async askQuestion (eventCode, question) {
    const { events } = data

    const event = events.find(event => event.code === eventCode)

    if (event) {
      const now = new Date()

      const { questions } = event
      const questionItem = {
        question,
        id: uuid(),
        createdDateAt: now.toISOString()
      }

      event.lastUpdated = now.toISOString()
      questions.push(questionItem)
    }

    return event
  }
}

module.exports = Events
