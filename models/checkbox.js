const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nodeSchema = new Schema(
    {
        key:{
            type: String,
            required: true
        },
        checked: {
            type: Boolean,
            required: true,
        },
        partialChecked: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
)

const CheckBox = mongoose.model('Checkbox', nodeSchema)
module.exports = CheckBox
