const data = {
  events: [
    {
      eventId: 1,
      name: 'How to use cashback feature?',
      code: 'CB001',
      start: '2017-11-28T16:48:12.823Z',
      end: '2017-11-29T16:48:12.823Z',
      lastUpdated: '2017-11-29T16:48:12.823Z',
      status: 'active',
      questions: [{
        questionId: 1,
        question: 'Do I need to do paper work to use cashback?'
      }, {
        questionId: 2,
        question: 'My iOS device is good enough for cashback 2?'
      }, {
        questionId: 3,
        question: 'Do I need to do paper work to use cashback 3?'
      }, {
        questionId: 4,
        question: 'My iOS device is good enough for cashback 4?'
      }, {
        questionId: 5,
        question: 'Do I need to do paper work to use cashback 5?'
      }, {
        questionId: 6,
        question: 'My iOS device is good enough for cashback 6?'
      }
      ],
      good: [1]
    },
    {
      eventId: 2,
      name: 'Where we can use cashback feature?',
      code: 'CB002',
      start: '2017-11-28T16:58:12.823Z',
      end: '2017-11-29T16:58:12.823Z',
      lastUpdated: '2017-11-28T16:58:12.823Z',
      status: 'active',
      questions: [{
        questionId: 1,
        question: 'Are you good?'
      }, {
        questionId: 2,
        question: 'So how minimum money I need to pay for cashback?'
      }
      ],
      good: [1, 2]
    },
    {
      eventId: 3,
      name: 'How to use cashback feature?',
      code: 'CB003',
      start: '2017-11-27T16:48:12.823Z',
      end: '2017-11-28T16:48:12.823Z',
      lastUpdated: '2017-11-27T16:48:12.823Z',
      status: 'inactive',
      questions: [{
        questionId: 1,
        question: 'I have android, can I use it?'
      }, {
        questionId: 2,
        question: 'Can I use with Samsung Pay?'
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
}

module.exports = Events
