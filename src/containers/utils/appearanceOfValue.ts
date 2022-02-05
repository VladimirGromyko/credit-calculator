export const appearanceOfValue = (value: number) => {
    let newValue = value.toString().split('.')

    if (newValue.length === 2) {
        if (newValue[1].length === 0) newValue[1] = newValue[1] + '.00'
        if (newValue[1].length === 1) newValue[1] = '.'+newValue[1] + '0'
        if (newValue[1].length === 2) newValue[1] = '.'+newValue[1]
    }
    if (newValue.length < 2) {
        newValue = [...newValue, '.00']
    }
    return newValue
}