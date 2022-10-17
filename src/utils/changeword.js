export default {
  choiceType: [
    {
      id: 1,
      value: '单选'
    },
    {
      id: 2,
      value: '多选'
    },
    {
      id: 3,
      value: '简答'
    }
  ],
  difficultys: [
    {
      id: 1,
      value: '简单'
    },
    {
      id: 2,
      value: '一般'
    },
    {
      id: 3,
      value: '困难'
    }
  ],
  questionType: [
    {
      id: 1,
      value: '已审核'
    },
    {
      id: 2,
      value: '已拒绝'
    },
    {
      id: 0,
      value: '待审核'
    }
  ],
  publishState: [
    {
      id: 0,
      value: '已下架'
    },
    {
      id: 1,
      value: '已发布'
    },
    {
      id: 3,
      value: '待发布'
    }

  ]
}
// export const changeword = (list) => {
//   return formatterFn = (row, column, cellValue) => {
//     const res = this.list.find(ele => ele.id === cellValue)
//     return res ? res.value : '未知'
//   },
// }
