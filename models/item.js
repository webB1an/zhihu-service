const mongoose = require('mongoose')
const shortId = require('shortid')

const Schema = mongoose.Schema

const itemSchema = new Schema({
  id: {
    type: String,
    default: shortId.generate,
    required: true
  },
  sortId: {
    type: String,
    required: true
  },
  sortName: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  des: {
    type: String,
    default: ''
  },
  pros: {
    type: String,
    default: ''
  },
  cons: {
    type: String,
    default: ''
  },
  pictures: {
    type: Array,
    default: []
  },
  createTime: {
    type: Number,
    default: Date.now,
  },
  updateTime: {
    type: Number,
    default: Date.now,
  },
})

module.exports = mongoose.model('item', itemSchema)