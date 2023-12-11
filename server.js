const express = require('express')
const nodeRoutes = require('./routes/nodeRoutes')
const checkBoxRoutes = require('./routes/checkBoxRoutes')
const app = express()
const connection = require('./db')
const cors = require('cors')

connection()

app.listen(3001)
app.use(express.json())
app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', 'default-src http://localhost:3000')
//     next()
// })

app.use('/api/node', nodeRoutes)
app.use('/api/checkbox', checkBoxRoutes)
