const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nodeSchema = new Schema(
    {
        checkboxs: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
)

const CheckBox = mongoose.model('Checkbox', nodeSchema)
module.exports = CheckBox
