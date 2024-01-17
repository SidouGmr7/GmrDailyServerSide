const express = require('express')
const nodeRoutes = require('../routes/nodeRoutes')
const checkBoxRoutes = require('../routes/checkBoxRoutes')
const footStatRoutes = require('../routes/footStatRoutes')
const app = express()
const connection = require('../db')
const cors = require('cors')
require('dotenv').config()

connection()

app.listen(3001)
app.use(cors())

app.use(express.json())

app.use('/api/node', nodeRoutes)
app.use('/api/checkbox', checkBoxRoutes)
app.use('/api/footstat', footStatRoutes)

module.exports = app
