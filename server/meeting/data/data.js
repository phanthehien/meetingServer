const data = {
  users: [
    {
      userId: '1',
      name: 'Hien Phan',
      username: 'hien',
      password: 'admin',
      lastUpdated: '2017-11-29T16:48:12.823Z',
      status: 'active'
    },
    {
      userId: '2',
      name: 'event administrator',
      username: 'admin',
      password: 'admin',
      lastUpdated: '2017-11-29T16:48:12.823Z',
      status: 'active'
    },
    {
      userId: '3',
      name: 'Ethan Ang',
      username: 'ethan',
      password: '123',
      lastUpdated: '2017-11-29T16:48:12.823Z',
      status: 'active'
    }
  ],

  events: [
    {
      eventId: '1',
      name: 'How to use cashback feature?',
      code: 'CB001',
      start: '2017-11-28T16:48:12.823Z',
      end: '2017-11-29T16:48:12.823Z',
      lastUpdated: '2017-11-30T21:34:47.356Z',
      status: 'active',
      questions: [{
        questionId: '1',
        question: 'Do I need to do paper work to use cashback?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: [],
        creatorId: '123'
      }, {
        questionId: '2',
        question: 'My iOS device is good enough for cashback 2?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: [],
        creatorId: '123'
      }, {
        questionId: '3',
        question: 'Do I need to do paper work to use cashback 3?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: [],
        creatorId: '123'
      }, {
        questionId: '4',
        question: 'My iOS device is good enough for cashback 4?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: [],
        creatorId: '123'
      }, {
        questionId: '5',
        question: 'Do I need to do paper work to use cashback 5?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: [],
        creatorId: '123'
      }, {
        questionId: '6',
        question: 'My iOS device is good enough for cashback 6?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: [],
        creatorId: '123'
      }
      ],
      good: ['1'],
      likes: []
    },
    {
      eventId: '2',
      name: 'Where we can use cashback feature?',
      code: 'CB002',
      start: '2017-11-28T16:58:12.823Z',
      end: '2017-12-15T16:58:12.823Z',
      lastUpdated: '2017-11-28T16:58:12.823Z',
      status: 'active',
      questions: [{
        questionId: '1',
        question: 'Are you good?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: [],
        creatorId: '123'
      }, {
        questionId: '2',
        question: 'So how minimum money I need to pay for cashback?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: [],
        creatorId: '123'
      }
      ],
      good: ['1', '2']
    },
    {
      eventId: '3',
      name: 'How to use cashback feature?',
      code: 'CB003',
      start: '2017-11-27T16:48:12.823Z',
      end: '2017-12-28T16:48:12.823Z',
      lastUpdated: '2017-11-27T16:48:12.823Z',
      status: 'inactive',
      questions: [{
        questionId: '1',
        question: 'I have android, can I use it?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: ['123'],
        creatorId: '123'
      }, {
        questionId: '2',
        question: 'Can I use with Samsung Pay?',
        createdDateAt: '2017-11-30T21:34:47.356Z',
        likes: ['123'],
        creatorId: '123'
      }
      ],
      good: []
    }
  ],

  audiences: [{
    id: '123',
    name: 'Hien 123',
    type: 'audience',
    likes: [{
      eventCode: 'CB003',
      questionId: '1',
      createdDateAt: '2017-11-30T21:34:47.356Z'
    }, {
      eventCode: 'CB003',
      questionId: '2',
      createdDateAt: '2017-11-30T21:34:47.356Z'
    }]
  }]
}

module.exports = data
