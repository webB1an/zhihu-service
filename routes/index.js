const express = require('express')
const router = express.Router()

const sortRouter = require('../api/sort')
const itemRouter = require('../api/item')
const uploadRouter = require('../api/upload')

router.use('/sort', sortRouter)
router.use('/item', itemRouter)
router.use('/common', uploadRouter)

router.get('/test', (req, res) => {
  res.send('test')
})

module.exports = router
