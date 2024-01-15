const express = require('express');
const session = require('express-session');
const passport = require('./passport');
const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');
const pool = require('./connection');
const path = require('path')
const cors = require('cors')

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server, {cors: {origin: "*"}});
const db = require('./models')

const authapi = require('./controller/auth');
const apis = require('./controller/apis')
const { SECRET_KEY, PORT_CONFOG } = require('./config/config');
const models = require('./models');
const PORT = process.env.PORT || PORT_CONFOG;





app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.json());
app.use(session({ secret: SECRET_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(cors())


app.use('/auth', authapi);
app.use('/api',passport.authenticate('jwt', {session: false}), apis)




const messages = [];
const users = [];





// Socket.io events
io.use((socket, next) => {
  const token =   socket.handshake.auth.token;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return next(new Error('Authentication error'));
    socket.request.user = decoded;
    next();
  });
});

io.on('connection', (socket) => {
  const user = socket.request.user;



  // Store user information in memory
  // users[user.id] = user;

  io.emit('connection',socket=>{messages.push(socket)})

  // Send existing messages to the connected user
  socket.emit('messages', messages);

  // Listen for new messages
  socket.on('newMessage', (message) => {
    console.log(message)
    messages.push({...message, user :{ displayName: user}});
    io.emit('newMessage', message);
    // io.to(message.groupID).emit('newMessage', message);
  });

  // Listen for message deletion
  socket.on('deleteMessage', (messageId) => {
    const index = messages.findIndex((msg) => msg.id === messageId);
    if (index !== -1) {
      const deletedMessage = messages.splice(index, 1)[0];
      io.emit('deleteMessage', deletedMessage.id);
    }
  });

  socket.on('joinRoom', (room) => {
    socket.join(room.roomId);
    console.log(`User joined room: ${room.roomId}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
