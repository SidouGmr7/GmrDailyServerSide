const express = require('express')
const checkboxController = require('../controllers/checkboxController')

const router = express.Router()

router.get('/', checkboxController.chechboxs_get)
router.post('/create', checkboxController.chechbox_create)
router.delete('/:id', checkboxController.chechbox_remove)
router.patch('/:id', checkboxController.chechbox_update)

module.exports = router
