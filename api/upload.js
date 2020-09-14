const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

router.post('/upload', async (req, res, next) => {
  const cwd = process.cwd()
  const form = formidable({ multiples: true })
  const uploadDir = path.join(cwd, 'public/images')
  form.uploadDir = uploadDir
  form.keepExtensions = true
 
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({
        error: 1000,
        msg: '上传失败！'
      })
    }

    try {
      if (!fs.existsSync(path.join(uploadDir, `${fields.from}`))) {
        fs.mkdirSync(path.join(uploadDir,`${fields.from}`))
      }
      let fileExtname = path.extname(files.images.name)
      let newFileName = `${fields.from}_${new Date().getTime()}${fileExtname}`
      let newFilePath = path.join(uploadDir, `${fields.from}`, newFileName)
      fs.renameSync(files.images.path, newFilePath)
      res.json({ url: `http://localhost:3000/static/images/${fields.from}/${newFileName}` })
    } catch (error) {
      res.json({
        error: 1000,
        msg: '上传失败！'
      })
    }
  })
})

module.exports = router