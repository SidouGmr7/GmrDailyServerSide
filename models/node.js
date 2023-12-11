const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nodeSchema = new Schema(
    {
        label: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
        expanded: {
            type: Boolean,
            required: false,
        },
        url: {
            type: String,
            required: false,
        },
        _ref: {
            type: String,
            required: false,
        },
        parentKey: {
            type: String,
            required: false,
        }
    },
    { timestamps: true }
)

const Node = mongoose.model('Node', nodeSchema)
module.exports = Node
