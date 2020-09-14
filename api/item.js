const express = require('express')
const router = express.Router()
const itemModel = require('../models/item')

router.post('/save', async (req, res, next) => {
  try {
    let { itemName, itemPrice, itemDes, itemPros, itemCons, itemPictures, sortId, sortName } = req.body.requestData
    await itemModel.findOneAndUpdate(
      { name: itemName }, 
      { name: itemName, price: itemPrice, des: itemDes, pros: itemPros, cons: itemCons, pictures: itemPictures, sortId, sortName }, 
      { upsert: true, setDefaultsOnInsert: true, rawResult: true, new: true }
    ).exec()
    res.json({
      code: 200,
      msg: '成功！',
      data: {}
    })
  } catch (error) {
    res.json({
      error: 1000,
    })
  }
})

router.post('/list', async (req, res, next) => {
  try {
    let { itemName, itemDes, sortId, sort } = req.body.requestData
    let { pageSize, pageNow } = req.body

    let total = await itemModel.find({
      name: itemName ? new RegExp(itemName) : { $exists: true},
      sortId: sortId ? sortId : { $exists: true}
    }).count().exec()
    
    let result = await itemModel.aggregate([
      {
        $match: {
          name: itemName ? new RegExp(itemName) : { $exists: true},
          des: itemDes ? new RegExp(itemDes) : { $exists: true},
          sortId: sortId ? sortId : { $exists: true}
        }
      },
      {
        $project: {
          _id: 0,
          itemId: '$id',
          sortId: 1,
          sortName: 1,
          itemPrice: '$price',
          itemName: '$name',
          itemDes: '$des',
          itemPros: '$pros',
          itemCons: '$cons',
          itemPictures: '$pictures',
        }
      }, 
      { $sort: { itemPrice: sort }},
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

router.post('/delete', async (req, res, next) => {
  let { itemId } = req.body.requestData
  try {
    await itemModel.findOneAndDelete({ id: itemId }).exec()
    res.json({
      code: 200,
      msg: '删除成功！',
      data: {}
    })
  } catch (error) {
    console.log(error)
    res.json({
      error: 1000,
      msg: '删除失败！'
    })
  }
})

module.exports = router