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

export const bootstrapHueName = (h:number, s:number,
    l:number
    ) => {
    const i = Math.round(h) % 360

    if (s < 0.05 || (l < 0.12 && s < 0.18) || (l > 0.95)) {
        return 'gray'
    }

    // dark | light

    if (i < 14) {
        return 'red / danger'
    } else if (i < 44) {
        return 'orange'
    } else if (i < 60) {
        return 'yellow / warning'
    } else if (i < 90) {
        return 'lime'
    } else if (i < 120) {
        return 'green / success'
    } else if (i < 150) {
        return 'green / success'
    } else if (i < 180) {
        return 'teal'
    } else if (i < 210) {
        if (s < 0.2) {
            return 'gray / secondary'
        }
        return 'info / cyan'
    } else if (i < 240) {
        if (s < 0.2) {
            return 'gray / secondary'
        }
        return 'blue / primary'
    } else if (i < 270) {
        if (s < 0.6) {
            return 'purple'
        }
        return 'indigo'
    } else if (i < 300) {
        return 'fuschia'
    } else if (i < 335) {
        return 'pink'
    } else {
        return 'red / danger'
    }
}