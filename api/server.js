const express = require('express')
const nodeRoutes = require('../routes/nodeRoutes')
const checkBoxRoutes = require('../routes/checkBoxRoutes')
const app = express()
const connection = require('../db')

connection()

app.listen(3001)
app.use(express.json())

app.use('/api/node', nodeRoutes)
app.use('/api/checkbox', checkBoxRoutes)

module.exports = app