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
            unique: true,
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
        },
    },
    { timestamps: true }
)

nodeSchema.index(
    { label: 1, _ref: 1 },
    { unique: true, partialFilterExpression: { _ref: { $exists: true } } }
)
const Node = mongoose.model('Node', nodeSchema)
module.exports = Node
