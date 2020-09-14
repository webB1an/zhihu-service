const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const chalk = require('chalk')
const router = require('./routes')

require('dotenv').config({ path: '.env' })
require('./db/mongo')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(router)

app.listen(3000, () => {
  console.log(chalk.cyan(`server is running at port ${3000}`))
})
