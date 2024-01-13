const chats = {
    status: 200,
    data: {
      chats: [
        {
          id: 1,
          name: 'Friends Forever',
          createdAt: '2023-01-03T12:20:00Z',
          msgs: [
            {
              id: 1,
              content: 'Hello Everyone, Happy Diwali!',
              sender: 'myself@yopmail.com',
              timestamp: '2023-01-01T12:05:00Z',
              likes: 7
            },
            {
              id: 2,
              content: 'Happy Diwali Everyone, How is it going guys?',
              sender: 'John@yopmail.com',
              timestamp: '2023-01-01T12:05:00Z',
              likes: 5
            },
            {
              id: 3,
              content: 'This Diwali is the best one, spending some quality time with family after so long',
              sender: 'Ashish@yopmail.com',
              timestamp: '2023-01-01T12:05:00Z',
              likes: 0
            },
            {
              id: 4,
              content: 'Hello Everyone, Happy Diwali!',
              sender: 'myself@yopmail.com',
              timestamp: '2023-01-01T12:05:00Z',
              likes: 0
            },
            {
              id: 5,
              content: 'Happy Diwali Everyone, How is it going guys?',
              sender: 'John@yopmail.com',
              timestamp: '2023-01-01T12:05:00Z',
              likes: 1
            },
            {
              id: 6,
              content: 'This Diwali is the best one, spending some quality time with family after so long',
              sender: 'Ashish@yopmail.com',
              timestamp: '2023-01-01T12:05:00Z',
              likes: 3
            },
          ],
        },
        {
          id: 2,
          name: 'Sports',
          createdAt: '2023-01-01T12:00:00Z',
          msgs: [
            {
              id: 1,
              content: 'Guys, Today we have a table tennis competition. Be ready!',
              sender: 'Ashish@yopmail.com',
              timestamp: '2023-01-01T12:05:00Z',
              likes: 0
            },
            {
              id: 2,
              content: 'Ready Chief',
              sender: 'John@yopmail.com',
              timestamp: '2023-01-01T12:05:00Z',
              likes: 0
            },
            {
              id: 3,
              content: 'Okay Sir.',
              sender: 'myself@yopmail.com',
              timestamp: '2023-01-01T12:05:00Z',
              likes: 1
            },
          ],
        },
        {
          id: 3,
          name: 'Deployment XT',
          createdAt: '2023-01-02T08:30:00Z',
          msgs: [
            {
              id: 1,
              content: 'Hey everyone! Excited to join this chat.',
              sender: 'newuser1@yopmail.com',
              timestamp: '2023-01-02T08:35:00Z',
              likes: 0
            },
          ],
        },
      ],
    }
  };
  const getUserInfo = {
    status: 200,
    data: {
      data: "Logged In Successfully"
    },
  };
  
  export { chats, getUserInfo };
  