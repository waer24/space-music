
#项目总结
svg 不能带class,只能用circle来制定transform-origin

1. scroll组件氟元素有高度，溢出隐藏，还是无法滚动？
	整个组件应该有个总范围可供scroll元素滚动，playlist组件只给出了当前的位置，整个组件都不能向上超出范围，致使无法滚动。
  给playlist的最上级元素一个position：fixed， 上下左右为0，再增加一个div绝对定位，只给指定范围。

2. methods和computed的区别？
数据量大，需要缓存的时候用computed；每次确实需要重新加载，不需要缓存时用methods