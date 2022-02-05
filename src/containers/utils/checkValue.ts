export const checkValue = (value: string): boolean => {
    let isSuit = true

    if (!isFinite(+value)) isSuit = false
    if ((+Number(value).toFixed(2) < +Number(value))) isSuit = false
    if ((+Number(value).toFixed(2) < Math.floor(+Number(value)))) isSuit = false
    let l = value.split('.').pop()?.length

    if (value.indexOf('.', 0) > 0) {
        if (l && l > 2) isSuit = false
    }

    return isSuit
}