import socketio from 'socket.io'

let io
const messages: any[] = []

export const setupWebSocket = (server: any) => {
  console.log(
    `🚀 [WS] Server is listening on port ${process.env.PORT || 3333} 🤯`,
  )
  io = socketio(server)

  // connection tem que acontecer de acordo com o chat
  io.on('connection', socket => {
    // const { user } = socket.handshake.query

    // load das mensagens de acordo com o chat escolhido
    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
      // salva no banco
      messages.push(data)
      // manda para todas as connections que estão no chat e mensagem criada
      socket.broadcast.emit('receivedMessage', data)
    })
  })
}
