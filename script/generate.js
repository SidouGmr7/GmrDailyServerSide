const fs = require('fs')
const cheerio = require('cheerio')
const templates = require('./templates')
const axios = require('axios')
const generateGoalsCountry = require('./model/generateGoalsCountry.js')

const { COUNTRY_GOALS_TEMPLATE } = require('./config/config')

async function generateTemplate() {
    try {
        console.log(`  ...wait`)
        const response = await axios(COUNTRY_GOALS_TEMPLATE)
        const $ = cheerio.load(response.data)
        const html = generateGoalsCountry.html($)
        console.log(`...success`)
        const PlayerData = generateGoalsCountry.json(html)
        // fs.writeFileSync(`script/json/countryGoals.html`, html)
        // fs.writeFileSync(`script/json/countryGoals.json`, JSON.stringify(PlayerData))
        return PlayerData
    } catch (error) {
        console.error(error)
    }
}
// generateTemplate()

// function fetchCountry() {
//     return templates.map(
//         async ({ dataToJson, fileName, url }) => await generateTemplate(dataToJson, fileName, url)
//     )
// }

module.exports = {
    generateTemplate,
}
