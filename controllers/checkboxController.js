const Checkbox = require('../models/checkbox')

const chechbox_get = (req, res) => {
    const id = req.params.id
    Checkbox.findById(id)
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

const chechbox_update = (req, res) => {
    const id = req.params.id
    const data = req.body
    Checkbox.updateOne({ id }, { $set: { checkboxs: data } })
        .then((result) => {
            if (result) {
                res.json({ result, dataUpdated: data })
                console.log('node updated succesfully')
            } else {
                res.status(404).json({ err: 'this item is not exist' })
            }
        })
        .catch((err) => {
            res.status(500).json({ err })
        })
}

module.exports = {
    chechbox_get,
    chechbox_update,
}
