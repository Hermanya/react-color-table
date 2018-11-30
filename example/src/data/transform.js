// I escaped octal sequences on line 479
const fs = require('fs')
const chroma = require('chroma-js')
const {
    categorizeLightness, categorizeHue, enrich, averageColor, inferColor
} = require('react-color-table')

const bootstrap = fs.readFileSync('./bootstrap.css', {encoding: 'utf8'})

const matches = [...new Set([
    ...bootstrap.match(/#([^,;\s]+)/g),
    ...bootstrap.match(/rgba[^)]+\)/g)
])]
fs.writeFileSync(
    './bootstrap-colors.json',
    JSON.stringify(matches, undefined, 2),
    'utf8'
);

const enrichedColors = matches.map(enrich)
const hueBins = Array.from(new Set(enrichedColors.map(_ => _.hueBin)))
const lightnessBins = Array.from(new Set(enrichedColors.map(_ => _.lightnessBin)))

let variables = []
// let variableColors = {
//     primary: 'blue',
//     secondary: 'gray',
//     success: 'green',
//     danger: 'red',
//     warning: 'yellow',
//     info: 'cyan'
// }
let bootstrapWithVariables = bootstrap
hueBins.forEach((hueBin) =>
    lightnessBins.forEach((lightnessBin) => {
        const variable = `--${hueBin}_${lightnessBin}`
        const binMatches = enrichedColors.filter(_ => _.hueBin === hueBin && _.lightnessBin === lightnessBin)
        const value = chroma(binMatches.length === 0
            ? inferColor(hueBin, lightnessBin, enrichedColors)
            // : binMatches.length === 1 ? binMatches[0].original
            : averageColor(binMatches)
         ).rgb().join(', ')
        variables.push(`${variable}: ${value};`)
        binMatches.forEach(_ => {
            bootstrapWithVariables = bootstrapWithVariables.split(_.original).join(`rgba(var(${variable}), ${_.alpha})`)
        })
    })
)

bootstrapWithVariables = `
:root {
    ${variables.join('\n    ')}
}
${bootstrapWithVariables}
`

fs.writeFileSync('../../public/bootstrap-with-variables.css', bootstrapWithVariables,'utf8');
