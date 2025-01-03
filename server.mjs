import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()


app.prepare().then(() => {
  const httpServer = createServer(handler)
  const io = new Server(httpServer)


  io.use((socket, next) => {
    const username = socket.handshake.auth.username
    if (!username) {
      return next(new Error('invalid username'))
    }
    socket.username = username
    next()
  })

  io.on('connection', (socket) => {
    const users = []

    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userID: id,
        username: socket.username
      })
    }

    socket.emit('users', users)

    socket.broadcast.emit('user connected', {
      userID: socket.id,
      username: socket.username
    })

    socket.on('private message', (message) => {
      const { content, type, introduce, url, tel, to, file } = message
      
      socket.to(to).emit('private message', {
        content,
        introduce,
        type,
        url,
        tel,
        file,
        from: socket.id
      })
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('user disconnected', socket.id)
    })
  })


  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})