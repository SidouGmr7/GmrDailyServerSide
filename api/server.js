const express = require('express')
const nodeRoutes = require('../routes/nodeRoutes')
const checkBoxRoutes = require('../routes/checkBoxRoutes')
const app = express()
const connection = require('../db')
const cors = require('cors')

connection()

if (process.env.NODE_ENV === 'development') {
    app.listen(3001)
    app.use(cors())
}
app.use(express.json())

app.use('/api/node', nodeRoutes)
app.use('/api/checkbox', checkBoxRoutes)

module.exports = app
