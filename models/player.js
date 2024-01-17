const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        country: {
            name: {
                type: String,
                required: true,
            },
            goals: {
                type: String,
                required: true,
            },
            match: {
                type: String,
                required: true,
            },
            ratio: {
                type: String,
                required: true,
            },
            start: {
                type: String,
                required: true,
            },
        },
    },
    { timestamps: true }
)

// nodeSchema.index(
//     { label: 1, _ref: 1 },
//     { unique: true, partialFilterExpression: { _ref: { $exists: true } } }
// )
const Player = mongoose.model('Player', playerSchema)
module.exports = Player
