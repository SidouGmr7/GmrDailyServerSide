const Player = require('../models/player')
const { generateTemplate } = require('../script/generate')
const _ = require('lodash')
// const playerData = require('../script/json/countryGoals.json')

const players_get = async (req, res) => {
    try {
        const result = await Player.find().sort({ 'country.goals': -1 }).lean()
        res.json(result)
    } catch (err) {
        res.status(500).json({ err })
    }
}

const players_create = async (req, res) => {
    let playerNameUpdated = []
    let playerNameAdded = []
    try {
        const playerData = await generateTemplate()
        const allData = playerData.map(async (playerItem) => {
            try {
                const findPlayer = await Player.findOne({ name: playerItem.name })
                if (findPlayer) {
                    const oldPlayer = { name: findPlayer.name, country: findPlayer.country }
                    if (!_.isEqual(JSON.stringify(oldPlayer), JSON.stringify(playerItem))) {
                        await Player.updateOne({ name: playerItem.name }, { $set: playerItem })
                        playerNameUpdated.push(playerItem.name)
                    }
                } else {
                    const player = new Player(playerItem)
                    await player.save()
                    playerNameAdded.push(playerItem.name)
                }
            } catch (innerErr) {
                res.status(500).json({ innerErr })
                console.error(`Error processing player ${playerItem.name}:`, innerErr)
            }
        })
        await Promise.all(allData)
        res.json({ playerNameUpdated, playerNameAdded, messege: `players successfully processed` })
    } catch (err) {
        console.error(`Main error:`, err)
        res.status(500).json({ err })
    }
}

module.exports = {
    players_get,
    players_create,
    // players_update,
}
