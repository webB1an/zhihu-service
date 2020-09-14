const express = require('express')
const router = express.Router()
const sortModal = require('../models/sort')

router.post('/save', async (req, res, next) => {
  try {
    /*
      name
      des
    */
    let { name, des } = req.body
    let result = await sortModal.findOneAndUpdate({ name }, { name, des }, { upsert: true, setDefaultsOnInsert: true, rawResult: true, new: true }).exec()
    res.json({
      code: 200,
      msg: '成功！',
      data: {
        name: result.value.name,
        des: result.value.des
      }
    })
  } catch (err) {
    res.json({
      error: 1000,
    })
  }
})

router.post('/list', async (req, res) => {
  try {
    let sort = await sortModal.aggregate([
      {
        $project: {
          sortId: '$id',
          sortName: '$name',
          sortDes: '$des',
          _id: 0
        }
      }
    ])
    res.json(sort)
  } catch (error) {
    res.json({
      error: 1000,
    })
  }
})

router.post('/listtable', async (req, res) => {
  try {
    let { sortName } = req.body.requestData
    let { pageSize, pageNow } = req.body

    let total = await sortModal.find({
      name: sortName ? new RegExp(sortName) : { $exists: true}
    }).count().exec()
    
    let result = await sortModal.aggregate([
      {
        $match: {
          name: sortName ? new RegExp(sortName) : { $exists: true}
        }
      },
      {
        $project: {
          _id: 0,
          sortId: '$id',
          sortName: '$name',
          sortDes: '$des'
        }
      }, 
      { $skip: (pageNow - 1) * pageSize },
      { $limit: pageSize },
    ])

    res.json({
      code: 200,
      msg: '成功！',
      data: {
        list: result,
        total
      }
    })
  } catch (error) {
    res.json({
      error: 1000,
    })
  }
})

module.exports = router
