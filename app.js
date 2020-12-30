const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('it works')
})

app.listen(PORT, () => {
  console.log(`This server is listening to http://localhost:${PORT}`)
})