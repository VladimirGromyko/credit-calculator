export const precisionRound=(number: number, precision: number) => {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}