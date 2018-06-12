/**
 * 工具函数
 */
let util = {}
/**
 * 设置标题
 * @param {string} title 标题
 */
util.title = function(title) {
  title = title || '贪玩DSP投放后台'
  window.document.title = title
}
/**
 * 在源数组查找元素，返回在查找数组首次出现索引
 * @param {Array} arr 源数组
 * @param {Array} targetArr 需查找数组
 */
util.inOf = function(arr, targetArr) {
  let res = 0
  for (let i = 0; i < arr.length; i++) {
    for (let t = 0; t < targetArr.length; t++) {
      if (arr[i] === targetArr[t]) {
        res = t
        return res
      }
    }
  }
  return res
}
