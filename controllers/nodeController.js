const Node = require('../models/node')
const f = require('../utils/index')

const nodes_get = async (req, res) => {
    try {
        const result = await Node.find({ _ref: { $exists: false } }).lean()
        const tree = await f.generateTree(result)
        res.json(tree)
    } catch (err) {
        res.status(500).json({ err })
    }
}

const node_get = (req, res) => {
    const id = req.params.id
    Node.findById(id)
        .lean()
        .then((result) => {
            if (result) {
                res.json(result)
            } else {
                res.status(404).json({ err: 'this item is not find' })
            }
        })
        .catch((err) => {
            res.status(500).json({ err })
        })
}

const node_create = async (req, res) => {
    if (!req?.body?.label) {
        res.status(404).json({ err: 'there is no label in body' })
    }
    const values = await f.generateNode(req.body)
    const node = new Node(values)
    node.save()
        .then((result) => {
            res.json(result)
            console.log('node added succesfully')
        })
        .catch((err) => {
            if (err.code === 11000) {
                if (err.keyValue.key) {
                    res.status(500).json({
                        messege: err,
                        err: `Duplicate key error for the key ${err.keyValue.key}`,
                    })
                }
                if (err.keyValue.label && err.keyValue._ref) {
                    res.status(500).json({
                        messege: err,
                        err: `Combination of label and _ref must be unique. for label : ${err.keyValue.label}`,
                    })
                }
                if (err.keyValue.label && !err.keyValue._ref) {
                    res.status(500).json({
                        messege: err,
                        err: `Duplicate label error for the label : ${err.keyValue.label}`,
                    })
                }
            } else {
                res.status(500).json({ err })
            }
        })
}

const node_update = (req, res) => {
    const id = req.params.id
    const data = req.body
    Node.findByIdAndUpdate(id, data)
        .then((result) => {
            if (result) {
                res.json({ oldData: result, dataUpdated: data })
                console.log('node updated succesfully')
            } else {
                res.status(404).json({ err: 'this item is not exist' })
            }
        })
        .catch((err) => {
            res.status(500).json({ err })
        })
}

const node_remove = (req, res) => {
    const id = req.params.id
    Node.findByIdAndDelete(id)
        .then((result) => {
            if (result) {
                res.json({ removedData: result, messege: 'node removed succesfully' })
                console.log('node removed succesfully')
            } else {
                res.status(404).json({ err: 'this item is not exist' })
            }
        })
        .catch((err) => {
            res.status(500).json({ err })
        })
}

module.exports = {
    node_create,
    nodes_get,
    node_get,
    node_remove,
    node_update,
}
