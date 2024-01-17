const express = require('express')
const footStatController = require('../controllers/footStatController')

const router = express.Router()

router.get('/', footStatController.players_get)
// router.get('/:id', nodeController.node_get)
router.post('/', footStatController.players_create)
// router.patch('/:id', footStatController.players_update)
// router.delete('/:id', nodeController.node_remove)

module.exports = router
