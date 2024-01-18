const cheerio = require('cheerio')

function parserHtmlToJSON({html, selector, field, convert}) {
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

function replaceHtmlByText({$targeRow, targetText, className}) {
    $targeRow.find('sup').remove()
    if (targetText) {
        let playerNameText = $targeRow.find(targetText).text()
        $targeRow.text(playerNameText)
    }
    $targeRow.replaceWith(`<div class='${className}'>${$targeRow.text()}</div>`)
}

module.exports = {
    parserHtmlToJSON,
    correctionCssSelector,
    replaceHtmlByText,
}
