<template>
  <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="number" label="试题编号" width="150">
        </el-table-column>
        <el-table-column prop="subject" label="学科" width="150">
        </el-table-column>
        <el-table-column prop="catalog" label="目录" width="150">
        </el-table-column>
        <el-table-column prop="chkState" label="题型" width="50" :formatter="formatterFn">
        </el-table-column>
        <el-table-column prop="question" label="题干" width="280">
        </el-table-column>
        <el-table-column prop="addDate" label="录入时间" width="160">
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="120" :formatter="formatterFn1">
        </el-table-column>
        <el-table-column prop="creator" label="录入人" width="100">
        </el-table-column>
        <el-table-column prop="questionType" label="审核状态" width="120" :formatter="formatterFn2"> </el-table-column>
        <el-table-column prop="chkRemarks" label="审核意见" width="120"> </el-table-column>
        <el-table-column prop="chkUser" label="审核人" width="120"> </el-table-column>
        <el-table-column prop="publishState" label="发布状态" width="120" :formatter="formatterFn3"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >预览</el-button
            >
            <el-button type="text" size="small">审核</el-button>
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">下架</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
</template>

<script>
import Enumberword from '@/utils/changeword.js'
import { parseTimeByString } from '@/filters'
import { choice } from '@/api/hmmm/questions.js'
export default {
  data () {
    return {
      tableData: [],
      choiceType: Enumberword.choiceType,
      difficulty: Enumberword.difficulty,
      questionType: Enumberword.questionType,
      publishState: Enumberword.publishState
    }
  },
  methods: {
    async getTableList () {
      const { data } = await choice(this.page)
      this.tableData = data.items
      this.counts = data.counts
      this.tableData.forEach(item => {
        item.addDate = parseTimeByString(item.addDate)
        item.question = item.question.replace(/<\/?.+?>/g, '')
      })
      console.log(this.tableData)
    },
    formatterFn (row, column, cellValue) {
      const res = this.choiceType.find(ele => ele.id === cellValue)
      return res ? res.value : '未知'
    },
    formatterFn1 (row, column, cellValue) {
      const res = this.difficulty.find(ele => ele.id === +cellValue)
      return res ? res.value : '未知'
    },
    formatterFn2 (row, column, cellValue) {
      const res = this.questionType.find(ele => ele.id === +cellValue)
      console.log(res)
      return res ? res.value : '未知'
    },
    formatterFn3 (row, column, cellValue) {
      const res = this.publishState.find(ele => ele.id === +cellValue)
      console.log(res)
      return res ? res.value : '未知'
    }
  }

}
</script>

<style>

</style>
