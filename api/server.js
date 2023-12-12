const express = require('express')
const nodeRoutes = require('../routes/nodeRoutes')
const checkBoxRoutes = require('../routes/checkBoxRoutes')
const app = express()
const connection = require('../db')
const cors = require('cors')

connection()

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//     // Intercepts OPTIONS method
//     if (req.method === 'OPTIONS') {
//       res.sendStatus(200);
//     } else {
//       next();
//     }
//   });

app.listen(3001)
app.use(cors())

app.use(express.json())

app.use('/api/node', nodeRoutes)
app.use('/api/checkbox', checkBoxRoutes)

module.exports = app
