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
  averageDuplicates?: boolean,
  inferBlanks?: boolean,
  title?: string,
  style?: React.CSSProperties
  columnStyle?: React.CSSProperties
}

const Cell = ({style, rowHeight, columnWidth, ...props}:any) => <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: rowHeight,
    width: columnWidth,
  ...style
}} {...props}/>

const Column = ({style, rowHeight, columnWidth, ...props}:any) => <div style={{
  display: 'flex',
  flexDirection: 'column',
  ...style
}} {...props}/>


export const ColorTable: React.SFC<Props> = ({
  colors, rowHeight, columnWidth, averageDuplicates, inferBlanks, title, style, columnStyle, ...otherProps
}) => {
  const enrichedColors = colors.map(enrich)
  const hueBins = Array.from(new Set(enrichedColors.map(_ => _.hueBin)))
  const size = {rowHeight, columnWidth}
  return <div
    style={{
      display: 'flex',
      ...style
    }} {...otherProps}>
    <Column key={'hues'}>
      <Cell key={'h'} rowHeight={rowHeight}>{title}</Cell>
      {hueBins.map(h => <Cell key={h}  {...size}>{h}</Cell>)}
    </Column>

    {lightnessBins.map(lightnessBin => <Column key={lightnessBin} style={columnStyle}>
      <Cell key={lightnessBin} {...size}>{lightnessBin}</Cell>

      {hueBins.map(hueBin => {
        let cellColors = enrichedColors.filter(_ => _.hueBin === hueBin && _.lightnessBin === lightnessBin)
        if (cellColors.length === 0 && inferBlanks) {
          cellColors = [inferColor(hueBin, lightnessBin, enrichedColors)].map(enrich)
        } else if (cellColors.length > 1 && averageDuplicates) {
            cellColors = [averageColor(cellColors)].map(enrich)
        }
        return <Cell key={lightnessBin+hueBin} {...size}>
          {
            cellColors.map(_ =>
            <Cell key={_.original} style={{
              background:  `hsl(${_.h}, ${_.s*100}%, ${_.l*100}%)`,
              // boxShadow: `inset 0 0 1px ${_.contrastColor}`
              outline: `1px solid white`
            }} title={JSON.stringify(_)} {...size}></Cell>)}
        </Cell>
      })}
    </Column>)}
  </div>
}

ColorTable.defaultProps = {
  colors: [],
  rowHeight: 64,
  columnWidth: 64,
  columnStyle: {},
  style: {}
}