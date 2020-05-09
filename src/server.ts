import app from './app'

app.listen(3333, () => {
  console.log(`🚀 Server is listening on port ${process.env.PORT || 3333} 🤯`)
})