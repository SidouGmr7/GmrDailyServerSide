const cheerio = require('cheerio')

function parserHtmlToJSON(html, selector, field = false, convert = false) {
    const $ = cheerio.load(html)
    const names = $(`.${selector}`)
        .map((index, element) => {
            const result = convert ? Number($(element).text()) : $(element).text()
            return { [field || selector]: result }
        })
        .get()
    return names
}

function correctionCssSelector(replaces) {
    let initialnot = ''
    let initialreplace = ''
    const not = replaces.reduce(
        (acc, val) => acc + `:not(tr:nth-child(${val}) td:nth-child(5))`,
        initialnot
    )
    const replace = replaces.reduce(
        (acc, val) => acc + `,tr:nth-child(${val}) > td:nth-child(6)`,
        initialreplace
    )
    const base = 'tr td:nth-child(5)'
    return `${base}${not}${replace}`
}

function replaceHtmlByText($targeRow, targetText, className, fixText) {
    if (targetText) {
        let playerNameText = $targeRow.find(targetText).text()
        if (fixText) {
            playerNameText = fixText(playerNameText)
        }
        $targeRow.text(playerNameText)
    }
    if ($targeRow.children().length > 0) {
        const playerNameText = $targeRow.find('span').text()
        $targeRow.text(playerNameText)
    }
    $targeRow.replaceWith(`<div class='${className}'>${$targeRow.text()}</div>`)
    $targeRow.find('sup').remove()
}

module.exports = {
    parserHtmlToJSON,
    correctionCssSelector,
    replaceHtmlByText,
}
