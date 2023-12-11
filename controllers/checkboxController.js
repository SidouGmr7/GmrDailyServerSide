const Checkbox = require('../models/checkbox')
const f = require('../utils/index')

const chechboxs_get = async (req, res) => {
    try {
        const result = await Checkbox.find().lean()
        const oneObject = f.generateCheckBoxObject(result)
        res.json(oneObject)
    } catch (err) {
        res.status(500).json({ err })
    }
}

const chechbox_create = async (req, res) => {
    if (!req?.body?.key) {
        res.status(404).json({ message: 'there is no key in body' })
    }
    if (!req?.body?.checked) {
        res.status(404).json({ message: 'there is no checked in body' })
    }
    if (!req?.body?.partialChecked) {
        res.status(404).json({ message: 'there is no partialChecked in body' })
    }
    const node = new Checkbox(values)
    node.save()
        .then((result) => {
            res.json({ result })
            console.log('node added succesfully')
        })
        .catch((err) => {
            res.status(500).json({ err })
        })
}

const chechbox_update = (req, res) => {
    const id = req.params.id
    const data = req.body
    Checkbox.findByIdAndUpdate(id, data)
        .then((result) => {
            if (result) {
                res.json({ oldData: result, dataUpdated: data })
                console.log('node updated succesfully')
            } else {
                res.status(404).json({ message: 'this item is not exist' })
            }
        })
        .catch((err) => {
            res.status(500).json({ err })
        })
}

const chechbox_remove = (req, res) => {
    const id = req.params.id
    Checkbox.findByIdAndDelete(id)
        .then((result) => {
            if (result) {
                res.json({ removedData: result, messege: 'node removed succesfully' })
                console.log('node removed succesfully')
            } else {
                res.status(404).json({ message: 'this item is not exist' })
            }
        })
        .catch((err) => {
            res.status(500).json({ err })
        })
}

module.exports = {
    chechbox_create,
    chechboxs_get,
    chechbox_remove,
    chechbox_update,
}
