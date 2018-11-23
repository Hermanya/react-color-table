# react-color-table

> Display some colors in a table sorted by hue and lightness

[![NPM](https://img.shields.io/npm/v/react-color-table.svg)](https://www.npmjs.com/package/react-color-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-color-table
```

## Usage

```tsx
import * as React from 'react'

import { ColorTable } from 'react-color-table'

export const Example = () =>
  <ColorTable
    colors={['#123123', 'rgba(123,123,123,12)']}
    averageDuplicates
    inferBlanks
  />
```

## Props

| name              | type          | default |
| ----------------- | ------------- | ------- |
| colors            | string[]      | []      |
| rowHeight?        | string/number | 64      |
| columnWidth?      | string/number | '100%'  |
| averageDuplicates | boolean       | false   |
| inferBlanks       | boolean       | false   |

## License

MIT © [Hermanya](https://github.com/Hermanya)
