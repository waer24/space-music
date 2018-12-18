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

export function getData(el, name, val) {
  const prefix = 'data-'
  if (val ) {
    return el.setAttribute(prefix + name , val) // setAttribute() 方法添加指定的属性，并为其赋指定的值。
  }
  return el.getAttribute(prefix + name)
}