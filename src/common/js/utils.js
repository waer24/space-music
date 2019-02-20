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
/* 函数柯里化 一个函数返回另一个函数，包含多个参数，最终被外面的函数包裹，只显示单个函数，*/
// export function debounce(func, delay) { // 包含一个定时器，用于截流，降低搜索的请求次数，在规定delay的时间中，忽略过快的搜索，删除操作
export function debounce(func, delay) {
    let timer
    return function (...args) {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
 /* 
   func.apply(thisArg, [argsArray]) 
   apply调用的是一个给定this值的函数，以及作为数组提供的参数
   call（）方法接收的参数列表 apply（）接收的是一个参数数组
   */