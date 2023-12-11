const express = require('express')
const checkboxController = require('../controllers/checkboxController')

const router = express.Router()

router.get('/:id', checkboxController.chechbox_get)
router.patch('/:id', checkboxController.chechbox_update)

module.exports = router
