<template>
  <div class='container'>
    <el-card class="box-card">
      <!-- 头部搜索框 -->
      <el-row type="flex"
              class="row-bg"
              justify="space-between">
        <el-col :span="6">
          <el-form ref="form"
                   label-width="80px">
            <el-form-item label="学科名称">
              <el-input v-model.trim="data.subjectName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="15">
          <el-button @click="data.subjectName=''">清除</el-button>
          <el-button type="primary"
                     @click="getSubList">搜索</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="success"
                     icon="el-icon-edit"
                     @click="addSubject">新增学科</el-button>
        </el-col>
      </el-row>
      <!-- 数据总条数提示 -->
      <el-alert :title="`数据一共${counts}条`"
                type="info"
                show-icon
                :closable='false'
                style="margin-bottom: 15px;width: 1252px">
      </el-alert>
      <!-- 表格数据 -->
      <el-table :data="tableData"
                style="width: 100%"
                :header-cell-style="{background:'#fafafa'}">
        <el-table-column type="index"
                         label="序号"
                         width="80">
        </el-table-column>
        <el-table-column prop="subjectName"
                         label="学科名称"
                         width="120">
        </el-table-column>
        <el-table-column prop="username"
                         label="创建者"
                         width="130">
        </el-table-column>
        <el-table-column prop="addDate"
                         label="创建日期"
                         width="210"
                         :formatter="parseAddDate">
        </el-table-column>
        <el-table-column prop="isFrontDisplay"
                         label="前台是否显示"
                         width="113"
                         :formatter="parseIsFrontDisplay">
        </el-table-column>
        <el-table-column prop="twoLevelDirectory"
                         label="二级目录"
                         width="113">
        </el-table-column>
        <el-table-column prop="tags"
                         label="标签"
                         width="113">
        </el-table-column>
        <el-table-column prop="totals"
                         label="题目数量"
                         width="113">
        </el-table-column>
        <el-table-column label="操作"
                         width="260">
          <template slot-scope="{row}">
            <el-button type="text"
                       @click="$router.push(`/subjects/directorys?id=${row.id}&name=${row.subjectName}`)">学科分类</el-button>
            <el-button type="text"
                       @click="$router.push(`/subjects/tags?id=${row.id}&name=${row.subjectName}`)">学科标签</el-button>
            <el-button type="text"
                       @click="updateSubject(row)">修改</el-button>
            <el-button type="text"
                       @click="deleteSubject(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页 -->
      <page-tool class='page-tool'
                 :total='counts'
                 :paginationPage='data.page'
                 :paginationPagesize='data.pagesize'
                 @pageChange='pageChange'
                 @pageSizeChange='pageSizeChange'></page-tool>
    </el-card>
    <!-- 新增/修改学科弹窗框 -->
    <subjectAdd ref="subjectAdd"
                :dialogVisible.sync='subjectDialog'
                @refreshList='getSubList'></subjectAdd>
  </div>
</template>

<script>
import pageTool from '@/module-manage/components/page-tool.vue'
import subjectAdd from '@/module-hmmm/components/subjects-add.vue'
import subjectType from '@/api/base/subject.js'
import { parseTimeByString } from '@/filters/index.js'
import { list, remove } from '@/api/hmmm/subjects'
export default {
  name: 'subject',
  data () {
    return {
      counts: '',
      tableData: [], // 表格数据
      subjectDialog: false,
      data: {
        page: 1,
        pagesize: 10,
        subjectName: ''
      }
    }
  },
  created () {
    this.getSubList()
  },
  components: {
    subjectAdd,
    pageTool
  },
  methods: {
    parseAddDate (row, column, cellValue) {
      return parseTimeByString(cellValue)
    },
    parseIsFrontDisplay (row, column, cellValue) {
      return subjectType.isFrontDisplay.find(item => {
        return item.id === cellValue
      }).value
    },
    // 学科详情
    async getSubList () {
      const { data } = await list(this.data)
      this.tableData = data.items
      this.counts = data.counts
    },
    pageChange (pageNum) {
      this.data.page = pageNum
      this.getSubList()
    },
    pageSizeChange (pageSize) {
      this.data.pagesize = pageSize
      this.getSubList()
    },
    // 新增学科
    addSubject () {
      this.subjectDialog = true
    },
    // 修改学科
    updateSubject (row) {
      // if (row.isFrontDisplay === 0) {
      //   row.isFrontDisplay = false
      // } else {
      //   row.isFrontDisplay = true
      // }
      console.log(row)
      this.$refs.subjectAdd.formData = { ...row }
      this.subjectDialog = true
    },
    // 删除学科
    deleteSubject (row) {
      this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await remove(row)
        this.getSubList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang='less'>
.box-card {
  margin: 10px 10px;
}
.page-tool {
  margin-top: 20px;
  text-align: right;
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
}
::v-deep .el-table thead {
  color: #909399;
  font-weight: 500;
}
</style>
