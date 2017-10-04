const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const PORT = 8000

app.get('/api/v1/login', function (req, res) {
  setTimeout(() => res.json({ message: 'some server response' }), Math.random() * 20000)
})

app.listen(PORT, () => console.log(`Demo app listening on port ${PORT}!`))