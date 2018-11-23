import * as React from 'react'
import { hueName } from './hue-name'

// import styles from './styles.css'
const chroma = require('chroma-js')

export const enrich = (color: string): EnrichedColor => {
  let _ = chroma(color)
  let [ h, s, l ] = _.hsl()
  h = h || 0

  let hueBin = hueName(h) || 'gray'
  if (s < 0.3) {
    hueBin = 'gray'
  }

  return {
    h, s, l, alpha: _.alpha(),
    hueBin,
    lightnessBin: categorizeLightness(l),
    original: color,
    contrastColor: l  < 0.5 ? '#ffffffff' : '#000000ff'
  }
}

export const lightnessBins = ['0',
'50',
'100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
export const categorizeLightness = (l:number) =>
  (l >= 0.9 && l < 0.975) ? '50' :
  String(1000 - Math.round(l*10) * 100)
export const categorizeHue = hueName
export const averageColor = (colors: EnrichedColor[]) => chroma.average(colors.map((_) =>
  `hsl(${_.h}, ${_.s*100}%, ${_.l*100}%)`))
export const inferColor = (hueBin: string, lightnessBin: string, enrichedColors: EnrichedColor[]) => {
  let sameHue = enrichedColors.find(_ => _.hueBin === hueBin)
  let sameLightness = enrichedColors.find(_ => _.lightnessBin === lightnessBin)
  if (sameHue && sameLightness) {
    return `hsl(${sameHue.h}, ${sameHue.s*100}%, ${sameLightness.l*100}%)`
  }
  throw Error(`Cannot infer for ${hueBin} ${lightnessBin}`)
}

export type EnrichedColor = {
    h: number, s:number, l:number, alpha: number,
    hueBin: string,
    lightnessBin: string,
    original: string,
    contrastColor: '#ffffffff' | '#000000ff'
}

export type Props = {
  colors: string[],
  rowHeight?: string | number,
  columnWidth?: string | number,
  averageDuplicates: boolean,
  inferBlanks: boolean,
  title: string,
  style: React.CSSProperties
}

export const ColorTable: React.SFC<Props> = ({
  colors, rowHeight, columnWidth, averageDuplicates, inferBlanks, title, style, ...otherProps
}) => {
  const enrichedColors = colors.map(enrich)
  const hueBins = Array.from(new Set(enrichedColors.map(_ => _.hueBin)))

  return <div
    style={{
      display: 'flex', flexDirection: 'column', flexFlow: 'column-reverse',
      ...style
    }} {...otherProps}>
    {lightnessBins.map(lightnessBin => <div key={lightnessBin} style={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        width: columnWidth,
        textAlign: 'center'
      }}>{lightnessBin}</div>

      {hueBins.map(hueBin => {
        let colorsInThisQuadrant = enrichedColors.filter(_ => _.hueBin === hueBin && _.lightnessBin === lightnessBin)
        if (colorsInThisQuadrant.length === 0 && inferBlanks) {
          colorsInThisQuadrant = [inferColor(hueBin, lightnessBin, enrichedColors)].map(enrich)
        } else if (colorsInThisQuadrant.length > 1 && averageDuplicates) {
            colorsInThisQuadrant = [averageColor(colorsInThisQuadrant)].map(enrich)
        }
        return <div key={lightnessBin+hueBin} style={{
          display: 'flex',
          height: rowHeight,
          width: columnWidth
        }}>
          {
            colorsInThisQuadrant.map(_ =>
            <div key={_.original} style={{
              display: 'flex',
              flexGrow: 1,
              background:  `hsl(${_.h}, ${_.s*100}%, ${_.l*100}%)`,
              height: rowHeight,
              // boxShadow: `inset 0 0 1px ${_.contrastColor}`
              outline: `1px solid white`
            }} title={JSON.stringify(_)}></div>)}
        </div>
      })}
    </div>)}

    <div key={'hues'} style={{
      display: 'flex',
      alignItems: 'center',
    }}>
     <div key={'h'} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: rowHeight,
        width: columnWidth
      }}>{title}</div>
    {hueBins.map(h => <div key={h} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: rowHeight,
        width: columnWidth
      }}>{h}</div>)}
    </div>
  </div>
}

ColorTable.defaultProps = {
  rowHeight: 64,
  columnWidth: '100%'
}