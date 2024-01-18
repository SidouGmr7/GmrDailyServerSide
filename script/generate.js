const fs = require('fs')
const cheerio = require('cheerio')
const templates = require('./templates')
const axios = require('axios')

async function generateTemplate({ url, dataToJson, dataToHtml, fileName }) {
    try {
        console.log(`  ...wait`)
        const response = await axios(url)
        const $ = cheerio.load(response.data)
        const html = dataToHtml($)
        console.log(`...success`)
        const PlayerData = dataToJson(html)
        // fs.writeFileSync(`script/json/${fileName}.html`, html)
        // fs.writeFileSync(`script/json/${fileName}.json`, JSON.stringify(PlayerData))
        return PlayerData
    } catch (error) {
        console.error(error)
    }
}
// generateTemplate(templates['countryGoals'])

// function fetchCountry() {
//     return templates.map(
//         async ({ dataToJson, fileName, url }) => await generateTemplate(dataToJson, fileName, url)
//     )
// }

module.exports = {
    generateTemplate,
}
