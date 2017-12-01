const uuid = require('uuid/v4')
const data = require('../data/data')

class Events {

  constructor (opts) {
    Object.assign(this, opts)
  }

  async list () {
    const { events, audiences } = data

    const mappedEvents = events.map(event => {
      const { questions } = event
      const mappedQuestions = questions.map(question => {
        const { creatorId } = question
        const creator = audiences.find(audience => audience.id === creatorId)
        return {
          ...question,
          creator
        }
      })

      const mappedEvent = {
        ...event,
        questions: mappedQuestions
      }

      return mappedEvent
    })

    return mappedEvents
  }

  async getEventDetail (code) {
    const event = await this.get(code)
    if (event) {
      const mappedQuestions = this._enrichEventQuestions(event)
      const mappedEvent = {
        ...event,
        questions: mappedQuestions
      }

      return mappedEvent
    }

    return null
  }

  _enrichEventQuestions (event) {
    const { audiences } = data
    const { questions, code, name } = event

    const mappedQuestions = questions.map(question => {
      const { creatorId } = question
      const creator = audiences.find(audience => audience.id === creatorId)
      return {
        ...question,
        creator,
        eventCode: code,
        eventName: name
      }
    })

    return mappedQuestions
  }

  async listQuestion () {
    const { events } = data

    const allQuestions = []

    for (let i = 0, len = events.length; i < len; i++) {
      if (events[i].status !== 'active') {
        continue
      }

      const mappedQuestions = this._enrichEventQuestions(events[i])
      allQuestions.push(...mappedQuestions)
    }

    return allQuestions
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
