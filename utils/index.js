const Node = require('../models/node')
const _ = require('lodash')

function incremenIndex(inputString) {
    if (!inputString) return null
    const match = inputString.match(/(\d+)$/)
    if (match) {
        const lastNumber = parseInt(match[0], 10) + 1
        return inputString.slice(0, -match[0].length) + lastNumber
    }
    return inputString + '1'
}

async function generateNode(values) {
    try {
        const findQuery = values._ref ? { _ref: values._ref } : { _ref: { $exists: false } }
        const result = await Node.find(findQuery).sort({ createdAt: -1 }).limit(1)

        const lastIndex = !_.isEmpty(result)
            ? result[0].key
            : !values._ref
            ? '0'
            : `${values.parentKey}-0`

        const key = incremenIndex(lastIndex)

        return {
            ...(key && { key }),
            ...values,
            expanded: false,
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function generateTree(parentNodes, recursive = true) {
    try {
        const tree = await Promise.all(
            parentNodes.map(async (parentNode) => {
                const findQuery = { _ref: parentNode._id }
                const result = await Node.find(findQuery).lean()

                return {
                    ...parentNode,
                    children: recursive ? await generateTree(result, false) : result,
                }
            })
        )
        return tree
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function generateCheckBoxObject(checkboxs) {
    return null
}

module.exports = { generateNode, generateTree, generateCheckBoxObject }
