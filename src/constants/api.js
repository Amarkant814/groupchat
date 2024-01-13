const devAssignment = "https://userChats/";
export default {
  auth:{
    signin:'/auth/login',
    signup: '/auth/signup',
  },
  chat:{
    getAllUsers: '/api/getusers',
    createGroup: '/api/addgroup',
  },
  messageBoard: {
    setUserNames: devAssignment + "userInfo/",
    getAllChats: devAssignment + "getAllChats/",
  },
};
