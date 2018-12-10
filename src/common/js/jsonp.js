/* jsonp的封装 */

import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise(function(resolve, reject) {
    originJsonp(url, option, function(err, data) {
      if(!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
export function param (data) {
  let url = ''
  for(var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
