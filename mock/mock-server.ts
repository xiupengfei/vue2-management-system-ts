import express, { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'

import api from './api'

const app = express()
const port = 3000
// const { connector, summarise } = require('swagger-routes-express')

const accessTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('Authorization')
  if (!accessToken) {
    return res.status(401).json({
      messaege: 'Invalid Access Token'
    })
  }
  next()
}

// Compression
app.use(compression())
// Logger
app.use(morgan('dev'))
// Enable CORS
app.use(cors())
// POST, PUT, DELETE body parser
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: false
}))
// No cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', '-1')
  next()
})
// tsconfig.json "suppressImplicitAnyIndexErrors": true,

Object.keys(api).map(key => {
  if (key === 'auth') {
    app.use('/', api[key])
  } else {
    app.use(`/${key}`, api[key])
  }
})

// Catch 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found')
  res.status(404).json({
    message: err.message,
    error: err
  })
})

// Create HTTP server.
const server = http.createServer(app)

// Listen
server.listen(port)
server.on('error', onError)
console.log(`Mock 服务监听在: http://127.0.0.1: ${port}`)

// Event listener
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error('Express ERROR (app) : %s requires elevated privileges', bind)
      process.exit(1)
    case 'EADDRINUSE':
      console.error('Express ERROR (app) : %s is already in use', bind)
      process.exit(1)
    default:
      throw error
  }
}
