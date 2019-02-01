export function addClass(el, className) {
  if(hasClass(el, className)) {
    return 
  }
  let newClass = el.className.split('')
  newClass.push(className)
  el.className = newClass.join('')
  // console.log(el.className)
}

export function hasClass(el, className) {
  /* 查找空白字符 + className + 空白字符结尾 */
  let reg = new RegExp( '(^|\\s)' + className + '(\\s|$)') // 字符串，前面要加\转义
 /* test: 检索字符串中指定的值。返回 true 或 false。 */
  return reg.test(el.className)
}

export function getData(el, name, val) { // 添加属性的，有属性就获取，没属性就添加
  const prefix = 'data-'  // "data-index data-length之类的"
  if (val ) {
    return el.setAttribute(prefix + name, val) // setAttribute() 方法添加指定的属性，并为其赋指定的值。
  }
  return el.getAttribute(prefix + name)
}

/* 函数自执行， 加上prefixStyle */
 let elementStyle = document.createElement('div').style
  var vendor = (() => {
    let transformNames = {
      webkit: 'webkitTransform', // key: webkit, value: 'webkitTransform'
      moz: 'MozTransform',
      O: 'OTransform',
      ms: 'msTransform',
      standard: 'transform'
    }
    for ( let key in transformNames) {
      if ( elementStyle[transformNames[key]] !== undefined ) {
         return key // 不返回值就是没触发
      }
    }
    return false
  })()

  export function prefixStyle(style) {
    if ( vendor === false ) {
      return false
    }
    if ( vendor === 'standard' ) {
      return style
    }
   
    let res = vendor + style.charAt(0).toUpperCase() + style.substr(1) // webkit + T + ransform
    return res
  }
 

