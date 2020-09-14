const mongoose = require('mongoose')
const shortId = require('shortid')

const Schema = mongoose.Schema

const sortSchema = new Schema({
  id: {
    type: String,
    default: shortId.generate,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  des: {
    type: String,
    default: '',
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

module.exports = mongoose.model('sort', sortSchema)
