const devAssignment = "https://userChats/";
export default {
  auth:{
    signin:'/auth/login',
    signup: '/auth/signup',
  },
  chat:{
    getAllUsers: '/api/getusers',
    createGroup: '/api/addgroup',
    getAllChats: '/api/groups',
    sendChat: '/api/chat',
    groupInfo: '/api/groupinfo',
    newParticipant: '/api/addparticipant',
    deleteParticipant: '/api/deleteparticipant',
    likeMessage: '/api/like',
    likedusers: '/api/likedusers'
  },
  messageBoard: {
    setUserNames: devAssignment + "userInfo/",
    getAllChats: devAssignment + "getAllChats/",
  },
};
