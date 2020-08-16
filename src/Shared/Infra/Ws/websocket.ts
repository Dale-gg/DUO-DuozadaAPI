import socketio from 'socket.io'
import MessagesRepository from '@Modules/Chat/Infra/Typeorm/Repositories/MessagesRepository'
const messagesRepository = new MessagesRepository()

let io

export const setupWebSocket = (server: any) => {
  console.log(
    `🚀 [WS] Server is listening on port ${process.env.PORT || 3333} 🤯`,
  )
  io = socketio(server)

  io.on('connection', async socket => {
    const { authenticatedUser, chat_id } = socket.handshake.query

    const previousMessages = await messagesRepository.all(chat_id)
    socket.emit('previousMessages', previousMessages)

    socket.on('sendMessage', async data => {
      const message = await messagesRepository.create({
        user_id: authenticatedUser.id,
        chat_id,
        body: data,
      })

      socket.broadcast.emit('receivedMessage', message)
    })
  })
}
