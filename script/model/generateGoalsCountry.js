const { replaceHtmlByText, parserHtmlToJSON } = require('../helpers/functionHelpers')

function html($) {
    // selected table data
    const $selectedTable = $('.wikitable.sortable').first()
    $selectedTable.find('tr:first-child').remove()
    // remove first td if has just text
    $selectedTable.find('tr').each((index, row) => {
        const $firstTd = $(row).find('td:first-child')
        $(row).find('td:last-child').remove()

        if ($firstTd.children().length === 0) {
            $firstTd.remove()
        }
        $(row).find('td:nth-child(3)').remove()

        // remove unused information
        const $nameTd = $(row).find('td:first-child')
        if ($nameTd.text().includes('Vivian Woodward[b]')) {
            $(row).remove()
        }
    })
    $selectedTable.find('tr').each((index, row) => {
        replaceHtmlByText($(row).find('td:first-child'), 'a', 'name')
        replaceHtmlByText($(row).find('td:nth-child(2)'), 'a', 'country')
        replaceHtmlByText($(row).find('td:nth-child(3)'), 'a', 'goals')
        replaceHtmlByText($(row).find('td:nth-child(4)'), false, 'match')
        replaceHtmlByText($(row).find('td:nth-child(5)'), false, 'ratio')
        replaceHtmlByText($(row).find('td:nth-child(6)'), false, 'start')
        replaceHtmlByText($(row).find('td:nth-child(7)'), false, 'fifth')
    })

    return $selectedTable.html()
}

function json(html) {
    const playerName = parserHtmlToJSON(html, 'name')
    const country = parserHtmlToJSON(html, 'country', 'name')
    const goals = parserHtmlToJSON(html, 'goals')
    const match = parserHtmlToJSON(html, 'match')
    const ratio = parserHtmlToJSON(html, 'ratio')
    const start = parserHtmlToJSON(html, 'start')
    return playerName.map(function (item, index) {
        const merged = Object.assign(item, {
            country: { ...country[index], ...goals[index], ...match[index], ...ratio[index], ...start[index] },
        })
        return merged
    })
}

module.exports = { html, json }