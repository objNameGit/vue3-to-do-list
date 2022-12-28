export function getRandomInt(minVal: number, maxVal: number): number {
    const min = Math.ceil(minVal);
    const max = Math.floor(maxVal);

    return Math.floor(Math.random() * (max - min) + min);
}