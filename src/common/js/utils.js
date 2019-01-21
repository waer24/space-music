function randomInt(min, max) {
    return Math.floor((Math.random() * max - min ) + min)
}
// slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。 不标注前后则返回完全相同的数组
export function shuffle(arr) {
    let _arr = arr.slice() 
    for(let i = 0 ; i < _arr.length; i++) {
        let j = randomInt(0 ,i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}