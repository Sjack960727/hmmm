<template>
  <div class="container">
    <el-card>
      <el-row class="header">
        <el-col :span="21">
          <div class="grid-content bg-purple">
            <p class="content">说明: 目前支持学科和关键字条件筛选</p>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <el-button type="success" icon="el-icon-edit">新增试题</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 输入框 -->
      <el-form :inline="true" :label-position="postion">
        <!-- 第一行输入框 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select placeholder="请选择">
                <el-option
                  :label="item.subjectName"
                  value="shanghai"
                  v-for="item in formData.subjects"
                  :key="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="二级目录">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input placeholder="根据题干搜索"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行输入框 -->
        <el-col :span="6">
          <el-form-item label="试题类型">
            <el-select placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="难度">
            <el-select placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="方向">
            <el-select placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入人">
            <el-select placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 第三行输入框 -->
        <el-form-item label="题目备注">
          <el-input placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="企业简称">
          <el-input placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-select placeholder="请选择">
            <el-option label="区域一" value="shanghai" class="city"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>

      <!-- tab栏切换 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
        <el-tab-pane label="已审核" name="third"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
      </el-tabs>
      <el-alert type="info" show-icon>
        <template #title> 数据一共{{counts}}条 </template>
      </el-alert>

      <!-- 数据表格 -->
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
      <!-- <mytable></mytable> -->
      <pagination :paginationPage="page.page"
      :paginationPagesize="page.pagesize"
      :total="counts" @pageChange="getTableList"
      @pageSizeChange="getTableList">
    </pagination>
    </el-card>
  </div>
</template>

<script>
import { list } from '@/api/hmmm/subjects.js'
import { choice } from '@/api/hmmm/questions.js'
import { parseTimeByString } from '@/filters'
import Enumberword from '@/utils/changeword.js'
import pagination from '@/module-manage/components/page-tool.vue'
// import mytable from '../mycomps/mytable.vue'
export default {
  name: 'detailquestion',
  components: {
    pagination
  },
  data () {
    return {
      postion: 'right',
      activeName: 'first',
      counts: '',
      choiceType: Enumberword.choiceType,
      difficulty: Enumberword.difficulty,
      questionType: Enumberword.questionType,
      publishState: Enumberword.publishState,
      changeData: [],
      page: {
        page: 1,
        pagesize: 5
      },
      formData: {
        subjects: ''
      },
      tableData: []
    }
  },
  created () {
    this.getSubjectsList()
    this.getTableList()
  },
  methods: {
    async getSubjectsList () {
      const { data } = await list()
      this.formData.subjects = data.items
      console.log(this.formData.subjects)
    },
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

<style scoped lang='less'>
.content {
  font-size: 12px;
  color: #ffc5da;
}
.header {
  margin-bottom: 20px;
}
</style>
