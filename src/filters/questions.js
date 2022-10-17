import { questionType, difficulty } from '@/api/hmmm/constants.js'
// 题型格式化
export function formatterquestionType (cellValue) {
  return questionType.find(item => {
    return item.value === +cellValue
  })?.label
}
// 格式化题干
export function formatterquestion (cellValue) {
  return cellValue?.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
}
// 难度格式化
export function formatterDifficulty (cellValue) {
  return difficulty.find(item => {
    return item.value === +cellValue
  })?.label
}
