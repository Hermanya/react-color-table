import React, { Component } from 'react'
import {ColorTable} from 'react-color-table'
import BootstrapExamples from './BootstrapExamples'
// import bootstrapColors from './data/bootstra-colors.json'
const bootstrapColors = require('./data/bootstrap-colors.json')
const l = 'm-0 text-uppercase font-weight-bold'
const tableStyle = {
  marginBottom: '25vh',
  // transform: 'scale(0.75)',
  maxWidth: '100%',
  scrollSnapType: 'x mandatory',
  overflowX: 'scroll'
}
const columnStyle = {
  scrollSnapAlign: 'center'
}
export default class App extends Component {
  render () {
    return (
      <div className="container" style={{overflowX: 'hidden'}}>
        <h1 className="display-4 text-center">Colors in Bootstrap<span className="text-muted">@4.1.3</span></h1>
        <ColorTable colors={bootstrapColors}
          title={<label className={l}>Default</label>} style={tableStyle} columnStyle={columnStyle}/>
        <ColorTable colors={bootstrapColors} averageDuplicates
          title={<label className={l}>Normalized</label>} style={tableStyle} columnStyle={columnStyle}/>
        <ColorTable colors={bootstrapColors} averageDuplicates inferBlanks
          title={<label className={l}>Augmented</label>} style={tableStyle} columnStyle={columnStyle}/>

        <p className="lead text-center mb-4">
          <a href={'https://hermanya.github.io/palette/bootstrap'}>Make a bootstrap palette</a>{' '}
          copy the CSS variables into your css file.
        </p>
        <BootstrapExamples/>
      </div>
    )
  }
}
