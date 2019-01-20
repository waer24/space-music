function randomInt(min, max) {
    return Math.floor((Math.random() * max - min ) + min)
}
export function shuffle(arr) {
    for(let i = 0 ; i < arr.length; i++) {
        let j = randomInt(0 ,i)
        let t = arr[i]
        arr[i] = arr[j]
        arr[j] = t
    }
    return arr
}