<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 搜索 -->
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-row type="flex" justify="end">
          <el-col :span="12">
            <el-form-item label="关键词">
              <el-input
                placeholder="根据编号搜索"
                v-model="formData.keywords"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item class="btn">
              <el-button @click="formData.keywords = ''">清除</el-button>
              <el-button type="primary" @click="goSearch">搜索</el-button>
            </el-form-item></el-col
          >
        </el-row>
      </el-form>
      <!-- 警告框 -->
      <el-alert :title="alertTitle" type="info" show-icon> </el-alert>
      <!-- 表格 -->
      <el-table v-loading="loading" style="width: 100%" :data="randomsList">
        <el-table-column prop="id" label="编号" width="220"> </el-table-column>
        <el-table-column
          prop="questionType"
          label="题型"
          width="80"
          :formatter="formatterFn"
        >
        </el-table-column>
        <el-table-column prop="questionIDs" label="题目编号" width="220">
          <template slot-scope="{ row }">
            <div v-for="item in row.questionIDs" :key="item.number">
              <a
                href=""
                style="color: #0099ff"
                @click.prevent="getDetails(item)"
                >{{ item.number }}</a
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="录入时间" width="160">
        </el-table-column>
        <el-table-column prop="totalSeconds" label="答题时间(s)" width="165">
        </el-table-column>
        <el-table-column prop="accuracyRate" label="正确率(%)" width="165">
        </el-table-column>
        <el-table-column prop="userName" label="录入人" width="165">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="80">
          <template slot-scope="{ row }">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="deleteRandoms(row.id)"
            ></el-button>
            <!-- <el-button type="text" size="small" @click="deleteRandoms(row.id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        class="page"
        background
        @size-change="getRandoms"
        @current-change="getRandoms"
        :current-page.sync="page.page"
        :page-sizes="[20, 30, 50, 100]"
        :page-size.sync="page.pagesize"
        layout="prev, pager, next,sizes, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 弹出框 -->
    <questionspreview
      :dialog-visible.sync="dialogVisible"
      ref='questionspreview'
    ></questionspreview>
  </div>
</template>

<script>
import { randoms, removeRandoms, detail } from '@/api/hmmm/questions.js'
import questionspreview from '../components/questions-preview9.vue'
// 点击打开题库dialog组件
export default {
  components: {
    questionspreview
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      formData: {
        keywords: ''
      },
      alertTitle: '数据一共0条',
      currentPage4: 4,
      page: {
        page: 1,
        pagesize: 20
      },
      total: 0,
      randomsList: [],
      questionDetail: {}
    }
  },
  created () {
    this.getRandoms()
  },
  methods: {
    goSearch () {
      this.page.keyword = this.formData.keywords
      this.getRandoms()
    },
    async getDetails (item) {
      // console.log(item.id)
      // const data = { id: item.id }
      // 测试多选
      const data = { id: 19 }

      const res = await detail(data)
      console.log(res.data)
      this.questionDetail = res.data
      this.$refs.questionspreview.questionDetail = { ...this.questionDetail }
      this.dialogVisible = true
    },
    async getRandoms () {
      this.loading = true
      const { data } = await randoms(this.page)
      this.loading = false
      this.randomsList = data.items
      this.total = data.counts
      this.alertTitle = `数据一共${data.counts}条`
      // console.log(data)
    },
    deleteRandoms (id) {
      this.$confirm('此操作将永久删除该题组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = { id: id }
          // console.log(data)
          removeRandoms(data)
        })
        .then(() => {
          this.getRandoms()
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {})
    },
    formatterFn (row, column, cellvalue) {
      if (cellvalue === '1') {
        return '单选'
      }
      if (cellvalue === '2') {
        return '多选'
      }
      if (cellvalue === '3') {
        return '简答'
      }
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 0 10px;
  margin: 10px 0;
  .box-card {
    // padding: 20px;
    padding-bottom: 20px;
    .btn {
      float: right;
    }
    .page {
      float: right;
      margin-top: 20px;
    }
  }
}
</style>
