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
        replaceHtmlByText({
            $targeRow: $(row).find('td:first-child'),
            className: 'name',
            targetText: 'a',
        })
        replaceHtmlByText({
            $targeRow: $(row).find('td:nth-child(2)'),
            className: 'country',
            targetText: 'a',
        })
        replaceHtmlByText({
            $targeRow: $(row).find('td:nth-child(3)'),
            className: 'goals',
            targetText: 'a',
        })
        replaceHtmlByText({ $targeRow: $(row).find('td:nth-child(4)'), className: 'match' })
        replaceHtmlByText({ $targeRow: $(row).find('td:nth-child(5)'), className: 'ratio' })
        replaceHtmlByText({ $targeRow: $(row).find('td:nth-child(6)'), className: 'start' })
        replaceHtmlByText({ $targeRow: $(row).find('td:nth-child(7)'), className: 'fifth' })
    })

    return $selectedTable.html()
}

function json(html) {
    const playerName = parserHtmlToJSON({ html, selector: 'name' })
    const country = parserHtmlToJSON({ html, selector: 'country', field: 'name' })
    const goals = parserHtmlToJSON({ html, selector: 'goals', convert: true })
    const match = parserHtmlToJSON({ html, selector: 'match', convert: true })
    const ratio = parserHtmlToJSON({ html, selector: 'ratio', convert: true })
    const start = parserHtmlToJSON({ html, selector: 'start' })
    return playerName.map(function (item, index) {
        const merged = Object.assign(item, {
            country: {
                ...country[index],
                ...goals[index],
                ...match[index],
                ...ratio[index],
                ...start[index],
            },
        })
        return merged
    })
}

module.exports = { html, json }
