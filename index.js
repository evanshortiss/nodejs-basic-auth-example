'use strict'

const { join } = require('path')
const express = require('express')
const app = express()
const log = require('barelog')
const auth = require('express-basic-auth')
const exphbs  = require('express-handlebars')
const { HTTP_PORT } = require('./lib/config')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Basic authentication
app.use(auth({
  challenge: true,
  users: require('./lib/users')
}))

app.get('/', (req, res) => {
  // auth.user is appended by the basic auth module
  res.render('index.handlebars', {
    username: req.auth.user,
    characters: require('./lib/characters')
  })
})

// Serve files, e.g style.css from public directory
app.use(express.static(join(__dirname, 'public')))

app.use((err, req, res, next) => {
  log(`ERROR: An error occurred processing a request to: ${req.method} ${req.originalUrl}`)
  log('ERROR:', err)
  res.status(500).end('Internal Server Error')
})

app.listen(HTTP_PORT, (err) => {
  if (err) {
    throw err
  }

  log(`🚀 basic application listening on port ${HTTP_PORT}`)
})
