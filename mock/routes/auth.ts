var express = require('express')
var router = express.Router()
import { Request, Response } from 'express'
// var server = require('http').Server(express())
// var io = require('socket.io')(server)

// server.listen(3001)

// let count = 0
// io.on('connection', (socket) => {
//   count++
//   io.emit('news', { count: count })
//   socket.on('disconnect', () => {
//     count--
//     io.emit('news', { count: count })
//   })

//   socket.on('listen:client', (data) => {

//   })
// })

// 登录
router.post('/login', (req: Request, res: Response) => {
  // console.log(req.params)
  // console.log(req.body)
  // console.log(req.query)
  const roles = [['admin'].includes(req.body.username) ? 'admin' : 'member']

  res.send({
    uid: Math.random(),
    username: req.body.username,
    roles: roles,
    mail: '123456@qq.com',
    token: `${req.body.username}--token--`
  })
})

// 登出
router.post('/logout', (req: Request, res: Response) => {
  res.send()
})

router.get('/userinfo', (req: Request, res: Response) => {
  const token = req.headers['authorization'] || ''
  const username = token.replace('--token--', '')
  const roles = [['admin'].includes(username) ? 'admin' : 'member']

  res.send({
    uid: Math.random(),
    username: username,
    roles: roles,
    mail: '123456@qq.com',
    token: token
  })
})

export default router
