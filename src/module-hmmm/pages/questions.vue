<template>
  <div class='container'>
    <el-card class="box-card"
             v-loading='loading'>
      <el-row style="margin:0 15px 15px">
        <el-col :span="22"> <span style="font-size: 12px; color: pink;">说明：目前支持学科和关键字条件筛选</span></el-col>
        <el-col :span="2">
          <el-button type="success"
                     icon="el-icon-edit"
                     @click="$router.push('/questions/new')">新增试题</el-button>
        </el-col>
      </el-row>
      <!-- 头部搜索框 -->
      <el-form ref="form"
               :model="formData"
               label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select v-model.trim="formData.subjectID"
                         placeholder="请选择"
                         @change="selectCatalog">
                <el-option v-for="item in subjectsOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"
                           style="width:100%">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="二级目录">
              <el-select v-model.trim="formData.catalogID"
                         placeholder="请选择">
                <el-option v-for="item in catalogOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签">
              <el-select v-model.trim="formData.tags"
                         placeholder="请选择">
                <el-option v-for="item in tagsOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键字">
              <el-input v-model.trim="formData.keyword"
                        placeholder="根据题干搜索"
                        style="margin-right: 15px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="试题类型">
              <el-select v-model.trim="formData.questionType"
                         placeholder="请选择">
                <el-option v-for="item in questionTypeOption"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="难度">
              <el-select v-model.trim="formData.difficulty"
                         placeholder="请选择">
                <el-option v-for="item in difficultyOption"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="方向">
              <el-select v-model.trim="formData.direction"
                         placeholder="请选择">
                <el-option v-for="item in directionOption"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录入人">
              <el-select v-model.trim="formData.creatorID"
                         placeholder="请选择">
                <el-option v-for="item in usersOption"
                           :key="item.id"
                           :label="item.username"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="题目备注">
              <el-input v-model.trim="formData.remarks"
                        placeholder=""
                        style="margin-right: 15px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input v-model.trim="formData.shortName"
                        placeholder=""
                        style="margin-right: 15px;">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市"
                          style="margin-right: 15px;">
              <el-select v-model.trim="formData.province"
                         placeholder="请选择"
                         style="width: 48%; margin-right: 2%;"
                         @change="selectProvince">
                <el-option v-for="item in provincesOption"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
              <el-select v-model.trim="formData.city"
                         placeholder="请选择"
                         style="width: 50%">
                <el-option v-for="item in citysOption"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6"
                  :push='3'>
            <div style="margin-left: -15px;">
              <el-button @click="formData={
        page: 1,
        pagesize: 10
      }">清除</el-button>
              <el-button type="primary"
                         @click="getQuestionsList">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
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
        <el-table-column prop="number"
                         label="试题编号"
                         width="150">
        </el-table-column>
        <el-table-column prop="subject"
                         label="学科"
                         width="90">
        </el-table-column>
        <el-table-column prop="catalog"
                         label="目录"
                         width="90">
        </el-table-column>
        <el-table-column prop="questionType"
                         label="题型"
                         width="90">
          <template slot-scope="{row}">
            {{row.questionType|formatterquestionType}}
          </template>
        </el-table-column>
        <el-table-column prop="question"
                         label="题干"
                         width="310">
          <template slot-scope="{row}">
            {{row.question|formatterquestion}}
          </template>
        </el-table-column>
        <el-table-column prop="addDate"
                         label="录入时间"
                         width="200">
          <template slot-scope="{row}">
            {{row.addDate|parseTimeByString}}
          </template>
        </el-table-column>
        <el-table-column prop="difficulty"
                         label="难度"
                         width="90">
          <template slot-scope="{row}">
            {{row.difficulty|formatterDifficulty}}
          </template>
        </el-table-column>
        <el-table-column prop="creator"
                         label="录入人"
                         width="90">
        </el-table-column>
        <el-table-column label="操作"
                         width="240">
          <template slot-scope="{row}">
            <el-button type="primary"
                       icon="el-icon-view"
                       circle
                       @click="questionsPreviewBtn(row)"></el-button>
            <el-button type="success"
                       icon="el-icon-edit"
                       circle
                       @click="$router.push('/questions/new/?id='+row.id)"></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       circle
                       @click="removeQuestions(row)"></el-button>
            <el-button type="info"
                       icon="el-icon-check"
                       circle
                       @click="choiceAddQuestions(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 底部分页 -->
    <page-tool class='page-tool'
               :total='counts'
               :paginationPage='formData.page'
               :paginationPagesize='formData.pagesize'
               @pageChange='pageChange'
               @pageSizeChange='pageSizeChange'></page-tool>
    <!-- 题目预览弹出框 -->
    <questions-preview :dialogVisible.sync='quesPrieDialog'
                       ref="questionsPreview"></questions-preview>

  </div>
</template>

<script>
import { list, remove, choiceAdd } from '@/api/hmmm/questions.js'
import { simple } from '@/api/hmmm/subjects.js'
import { simple as directorysSimple } from '@/api/hmmm/directorys.js'
import { simple as tagsSimple } from '@/api/hmmm/tags.js'
import { simple as usersSimple } from '@/api/base/users.js'
import { questionType, difficulty, direction } from '@/api/hmmm/constants.js'
import { provinces, citys } from '@/api/hmmm/citys.js'
import pageTool from '@/module-manage/components/page-tool.vue'
import questionsPreview from '@/module-hmmm/components/questions-preview.vue'
export default {
  name: 'questions',
  components: {
    pageTool,
    questionsPreview
  },
  data () {
    return {
      quesPrieDialog: false,
      loading: false,
      counts: '',
      tableData: [], // 表格数据
      formData: { // 表单数据
        page: 1,
        pagesize: 10,
        subjectID: null, // 学科
        catalogID: null, // 目录
        keyword: null, // 关键字
        questionType: null, // 试题类型
        difficulty: null, // 难度
        direction: null, // 方向
        creatorID: null, // 录入人
        remarks: null, // 题目备注
        shortName: null, // 企业简称
        province: null, // 企业所在地省份
        city: null, // 企业所在城市
        tags: null// 标签名称
      },
      data: {
        page: 1,
        pagesize: 10
      },
      subjectsOptions: [], // 学科
      catalogOptions: [], // 二级目录
      tagsOptions: [], // 标签
      questionTypeOption: questionType, // 试题类型
      difficultyOption: difficulty, // 难度
      directionOption: direction, // 方向
      provincesOption: [], // 所有城市
      citysOption: [], // 城市下地区
      usersOption: [] // 录入人
    }
  },
  created () {
    this.getQuestionsList()
    this.provincesOption = provinces()
  },
  methods: {
    questionsPreviewBtn (row) {
      this.quesPrieDialog = true
      this.$refs.questionsPreview.questionsPreview = row
    },
    async getQuestionsList () {
      try {
        const { data } = await list(this.formData)
        this.counts = data.counts
        this.tableData = data.items
        this.resSubjects()
        this.resTags()
        this.resUsers()
      } catch (error) {
        console.log(error)
      }
    },
    async resSubjects () {
      const { data } = await simple()
      this.subjectsOptions = data
    },
    async resTags () {
      const { data } = await tagsSimple()
      this.tagsOptions = data
    },
    async resUsers () {
      const { data } = await usersSimple()
      this.usersOption = data
    },
    async selectCatalog () {
      this.formData.catalogID = ''
      const { data } = await directorysSimple({ subjectID: this.formData.subjectID })
      this.catalogOptions = data
    },
    selectProvince () {
      this.citysOption = citys(...this.formData.province)
    },
    // 基础题库删除
    removeQuestions (row) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await remove(row)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getQuestionsList()
        this.loading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 精选题库加入取消
    choiceAddQuestions (row) {
      this.$confirm('此操作将该题目加入精选, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(async () => {
        this.loading = true
        await choiceAdd({ ...row, choiceState: 1 })
        this.$message({
          type: 'success',
          message: '加入成功!'
        })
        this.getQuestionsList()
        this.loading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消加入'
        })
        this.loading = false
      })
    },
    pageChange (pageNum) {
      this.formData.page = pageNum
      this.getQuestionsList()
    },
    pageSizeChange (pageSize) {
      this.formData.pagesize = pageSize
      this.getQuestionsList()
    }
  }
}
</script>

<style scoped lang='less'>
.box-card {
  margin: 10px 10px;
}
::v-deep .el-form-item__content {
  display: flex;
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
.el-button--primary {
  color: #409eff;
  background-color: #ecf5ff;
  border-color: #409eff;
}
.el-button--success {
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #67c23a;
}
.el-button--danger {
  color: #f56c6c;
  background-color: #fef0f0;
  border-color: #f56c6c;
}
.el-button--info {
  color: #e8bda8;
  background-color: #fdf6ec;
  border-color: #e8bda8;
}
</style>
