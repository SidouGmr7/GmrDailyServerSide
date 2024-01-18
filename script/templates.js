const generateGoalsCountry = require('./model/generateGoalsCountry')
const { COUNTRY_GOALS_TEMPLATE } = require('./config/config')

const templates = {
    countryGoals: {
        dataToJson: generateGoalsCountry.json,
        dataToHtml: generateGoalsCountry.html,
        fileName: 'countryGoals',
        url: COUNTRY_GOALS_TEMPLATE,
    },
    // {
    //     dataToJson: generate_champions_league_goals,
    //     fileName: "champions_league_goals",
    //     url: CHAMPIONS_LEAGUE_GOALS_TEMPLATE,
    // },
    // {
    //     dataToJson: generate_data_of_all_playares,
    //     fileName: "playersData",
    //     url: FAKE_URL,
    // },
}

module.exports = templates
