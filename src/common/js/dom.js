export function addClass(el, className) {
  if(hasClass(el, className)) {
    return 
  }
}

export function hasClass(el, className) {
  /* 查找空白字符 + className + 空白字符结尾 */
  let reg = new RegExp( '(^|\\s)' + className + '(\\s|$)')
 /* test: 检索字符串中指定的值。返回 true 或 false。 */
  return reg.test(el.className)
}