var express = require('express')
var router = express.Router()
var Mock = require('mockjs')
import { Request, Response } from 'express'

/* 用户信息 */
router.get('/', (req: Request, res:Response ) => {
  //  console.log(req.params)
  //  console.log(req.body)
  //  console.log(req.query)
  const num = 40
  const roles = ['admin', 'member', 'default']
  var data = []
  for (let i = 0; i < num; i++) {
    data.push(Mock.mock({
      'id': '@guid',
      'name': '@cname',
      'gender': '@boolean(1, 9, true)',
      'birth': '@date',
      'entry_time': '@date',
      'mail': '@email',
      'phone': /^1[385][1-9]\d{8}/,
      'level': '@string("number", 1)',
      'salary': '@string("number", 4, 6)',
      'roles': [{
        name: roles[Mock.mock({ 'number|0-2': 0 }).number],
        action: []
      }]
    }))
  }
  //  res.sendStatus(404)

  res.send({
    total: 155,
    data: data
  })
})

export default router
