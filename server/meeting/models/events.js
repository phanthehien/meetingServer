const uuid = require('uuid/v4')
const data = require('../data/data')

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

  async likeQuestion (eventCode, questionId, audienceId) {
    const { events, audiences } = data

    const event = events.find(event => event.code === eventCode)
    const question = event.questions.find(question => question.questionId === questionId)
    const audience = audiences.find(audience => audience.id === audienceId)

    if (event && audience && question) {
      const now = new Date()

      const like = {
        eventCode,
        questionId,
        createdDateAt: now.toISOString()
      }

      event.lastUpdated = now.toISOString()

      audience.likes.push(like)
      question.likes.push(audienceId)

      return {
        event,
        audience
      }
    }

    return null
  }
}

module.exports = Events
