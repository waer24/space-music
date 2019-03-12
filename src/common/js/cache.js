import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY =' __favorite__'
const FAVORITE_MAX_LEN = 200

// 在搜索时实时调整列表的顺序
function insertArray(arr, val,compare, maxLen ){
  const index = arr.findIndex(compare) // findIndex 会返回满足条件的索引
  if (index === 0) {
    return 
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val) // 插入到数组最前
  if (maxLen && arr.length > maxLen) {
    arr.pop() // 删除末位元素
  }
}
function deleteFromArray(arr, compare){
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
    
  }
}

// 加载本地缓存的加载历史
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 存储搜索历史
export function saveSearch(query) {
  console.log(query)
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY) // 清除之后再刷新不会有数据
  return []
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  },PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  console.log(storage) // 相关的storage信息
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}