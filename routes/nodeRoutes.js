const express = require('express')
const nodeController = require('../controllers/nodeController')

const router = express.Router()

router.get('/', nodeController.nodes_get)
router.get('/:id', nodeController.node_get)
router.post('/', nodeController.node_create)
router.delete('/:id', nodeController.node_remove)
router.patch('/:id', nodeController.node_update)

module.exports = router
