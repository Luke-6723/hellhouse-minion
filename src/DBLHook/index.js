const { dsl } = require('../config.json')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// support parsing of application/json type post data
app.use(bodyParser.json())
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/webhook', async (req, res) => {
  const data = await req.json()
  console.log(data)
})

app.listen(dsl.port, dsl.ip, () => {
  console.log(`Listening on: ${dsl.ip}:${dsl.port}`)
})
