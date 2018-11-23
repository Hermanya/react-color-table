const names = [
    'red',      //   0 - 14
    'orange',   //  15 - 44
    'yellow',   //  60
    'lime',     //  90
    'green',    // 120
    'teal',     // 150
    'cyan',     // 180
    'blue',     // 210
    'indigo',   // 240
    'violet',   // 270
    'fuschia',  // 300
    'pink',     // 330
    'red',      // 360
]

export const hueName = (h:number) => {
    const i = Math.round((Math.round(h) % 360) / 30)
    return names[i]
}
