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
            <el-button
              type="success"
              icon="el-icon-edit"
              @click="$router.push('/questions/new')"
              >新增试题</el-button
            >
          </div>
        </el-col>
      </el-row>
      <!-- 输入框 -->
      <el-form
        :inline="true"
        :label-position="postion"
        label-width="80px"
        ref="form"
        :model="formData"
      >
        <!-- 第一行输入框 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select
                placeholder="请选择"
                v-model="formData.subject"
                @change="changeSelect"
              >
                <el-option
                  :label="item.label"
                  :value="item"
                  v-for="item in subjects"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="二级目录">
              <el-select placeholder="请选择" v-model="formData.catalogID">
                <el-option
                  :label="item.label"
                  :value="item"
                  v-for="item in catalogList"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签">
              <el-select placeholder="请选择" v-model="formData.tags">
                <el-option
                  :label="item.label"
                  :value="item"
                  v-for="item in tagsList"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input
                placeholder="根据题干搜索"
                v-model="formData.keyword"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行输入框 -->
        <el-col :span="6">
          <el-form-item label="试题类型">
            <el-select placeholder="请选择" v-model="formData.questionType">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in questionTypes"
                :key="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="难度">
            <el-select placeholder="请选择" v-model="formData.difficulty">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in difficulty"
                :key="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="方向">
            <el-select placeholder="请选择" v-model="formData.direction">
              <el-option
                :label="item"
                :value="item"
                v-for="item in directions"
                :key="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入人">
            <el-select placeholder="请选择" v-model="formData.creatorID">
              <el-option
                :label="item.username"
                :value="item"
                v-for="item in addpeople"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 第三行输入框 -->
        <el-col :span="6">
          <el-form-item label="题目备注" v-model="formData.remarks">
            <el-input placeholder="请选择"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="企业简称" v-model="formData.shortName">
          <el-input placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item
          label="城市"
          label-width="107px"
          style="margin-right: 100px"
        >
          <el-select
            placeholder="请选择"
            style="width: 150px"
            v-model="formData.province"
            @change="selectCity"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="item in provinces"
              :key="item.city"
            ></el-option>
          </el-select>
          <el-select
            placeholder="请选择"
            style="width: 150px"
            v-model="formData.city"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="item in citys"
              :key="item.citys"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>

      <!-- tab栏切换 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
        <el-tab-pane label="已审核" name="third"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
      </el-tabs>
      <el-alert type="info" show-icon :closable="false">
        <template #title> 数据一共{{ counts }}条 </template>
      </el-alert>

      <!-- 数据表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="number" label="试题编号" width="150">
        </el-table-column>
        <el-table-column prop="subject" label="学科" width="150">
        </el-table-column>
        <el-table-column prop="catalog" label="目录" width="150">
        </el-table-column>
        <el-table-column
          prop="questionType"
          label="题型"
          width="50"
          :formatter="formatterFn"
        >
        </el-table-column>
        <el-table-column prop="question" label="题干" width="280">
        </el-table-column>
        <el-table-column prop="addDate" label="录入时间" width="160">
        </el-table-column>
        <el-table-column
          prop="difficulty"
          label="难度"
          width="120"
          :formatter="formatterFn1"
        >
        </el-table-column>
        <el-table-column prop="creator" label="录入人" width="100">
        </el-table-column>
        <el-table-column
          prop="chkState"
          label="审核状态"
          width="120"
          :formatter="formatterFn2"
        >
        </el-table-column>
        <el-table-column prop="chkRemarks" label="审核意见" width="120">
        </el-table-column>
        <el-table-column prop="chkUser" label="审核人" width="120">
        </el-table-column>
        <el-table-column
          prop="publishState"
          label="发布状态"
          width="120"
          :formatter="formatterFn3"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="{ row }">
            <el-button @click="preview(row)" type="text" size="small"
              >预览</el-button
            >
            <el-button
              type="text"
              size="small"
              :disabled="row.publishState !== 3 || row.chkState === 2"
              @click="checkState(row)"
              >审核</el-button
            >
            <el-button type="text" size="small" @click="changeques(row)"
            :disabled="row.publishState!==0"
              >修改</el-button
            >
            <el-button type="text" size="small" @click="updown(row)">{{row.publishState===0?'上架':'下架'}}</el-button>
            <el-button type="text" size="small" @click="del(row)"
            :disabled="row.publishState!==0"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 题目预览弹出层 -->
    <questiondetail
      :dialog-visible.sync="isShow"
      ref="questiondeatil"
    ></questiondetail>
    <!-- 分页组件 -->
    <el-pagination
      v-if="counts > 0"
      background
      layout=" prev, pager, next,sizes, jumper"
      :total="counts"
      :current-page.sync="page.page"
      :page-size.sync="page.pagesize"
      @current-change="getTableList"
      :page-sizes="[5, 10, 20, 50]"
      @size-change="getTableList"
    />
    <!-- 审核弹出层 -->
    <el-dialog
      title="题目审核"
      :visible.sync="dialogVisibleshehe"
      width="30%"
      :before-close="cancelshehe"
    >
      <input type="radio" name="shehedata" :value="shehedata.chkState" @click="shehedata.chkState=1"/><span style="margin-right: 20px"
        >通过</span
      >
      <input type="radio" name="shehedata" :value="shehedata.chkState" @click="shehedata.chkState=2"/>拒绝
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入审核意见"
        v-model="shehedata.chkRemarks"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelshehe">取 消</el-button>
        <el-button type="primary" @click="sureshe">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { simple1 } from '@/api/hmmm/subjects.js'
import { simple } from '@/api/hmmm/directorys.js'
import { simpleaddpeople } from '@/api/base/users.js'
import { simpletag } from '@/api/hmmm/tags.js'
import { choice, remove, choiceCheck, choicePublish } from '@/api/hmmm/questions.js'
import { provinces, citys } from '@/api/hmmm/citys.js'
import { directions, difficulty, questionTypes } from '@/api/hmmm/constants.js'
import { parseTimeByString } from '@/filters'
import Enumberword from '@/utils/changeword.js'
// import pagination from '@/module-manage/components/page-tool.vue'
import questiondetail from '../mycomps/questiondetail.vue'
export default {
  name: 'detailquestion',
  components: {
    questiondetail
  },
  data () {
    return {
      isShow: false,
      dialogVisibleshehe: false,
      shehedata: {
        chkRemarks: '',
        id: '',
        chkState: ''
      },
      postion: 'right',
      activeName: 'first',
      counts: '',
      shenhebtn: true,
      subjects: [],
      formData: {
        subject: null,
        subjectID: null,
        catalogID: null,
        tags: null,
        keyword: null,
        questionType: null,
        difficulty: null,
        direction: null,
        creatorID: null,
        remarks: null,
        shortName: null,
        province: null,
        city: null,
        page: 1,
        pagesize: 5
      },
      addpeople: [],
      catalogList: [],
      tagsList: [],
      citys: [],
      difficulty: difficulty,
      questionTypes: questionTypes,
      provinces: provinces(),
      directions: directions,
      choiceType: Enumberword.choiceType,
      difficultys: Enumberword.difficultys,
      questionType: Enumberword.questionType,
      publishState: Enumberword.publishState,
      changeData: [],
      page: {
        page: 1,
        pagesize: 5,
        chkState: null
      },
      tableData: []
    }
  },
  created () {
    this.getSubjectsList()
    this.getTableList(this.page)
    this.simpleaddpeople()
  },
  methods: {
    // 录入人
    async simpleaddpeople () {
      const { data } = await simpleaddpeople()
      this.addpeople = data
      // console.log(data)
    },
    async getSubjectsList () {
      const { data } = await simple1()
      // console.log(data)
      this.subjects = data
      // console.log(this.formData.subjects)
    },
    async getTableList (a) {
      const { data } = await choice(a)
      this.tableData = data.items
      this.counts = data.counts
      this.tableData.forEach((item) => {
        item.addDate = parseTimeByString(item.addDate)
        item.question = item.question.replace(/<\/?.+?>/g, '')
        if (item.chkState === 2) {
          item.publishState = 3
        }
        if (item.chkState === 0) {
          item.publishState = 3
        }
      })
      // console.log(this.tableData)
    },
    async changeSelect (e) {
      this.subjectID = e.value
      this.formData.subjectID = e.value
      console.log(this.subjectID)
      const { data } = await simple({ subjectID: this.subjectID })
      const res = await simpletag({ subjectID: this.subjectID })
      this.catalogList = data
      this.tagsList = res.data
      // console.log(data)
      // console.log(res.data)
    },
    // Questype (e) {
    //   this.formData.type = e.value
    // },
    selectCity (e) {
      // console.log(123)
      this.province = e
      // console.log(this.province)
      const res = citys(this.province)
      this.citys = res
      // console.log(res)
    },
    clear () {
      // console.log(1111)
      this.formData = {}
      this.$refs.form.resetFields()
    },
    handleClick ({ index }) {
      // console.log(index)
      if (+index === 1) {
        this.page.chkState = 0
        this.getTableList()
      } else if (+index === 2) {
        this.page.chkState = 1
        this.getTableList()
      } else if (+index === 0) {
        this.page.chkState = null
        this.getTableList()
      } else {
        this.page.chkState = 2
        this.getTableList()
      }
    },
    preview (row) {
      console.log(row.id)
      this.$refs.questiondeatil.id.id = row.id
      // this.$refs.questiondeatil.curRow = row
      this.$refs.questiondeatil.getdetailList()
      this.isShow = true
    },
    async del (row) {
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning'
      })
      await remove({ id: row.id })
      this.getTableList()
      this.$message.success('删除成功')
    },
    changeques (row) {
      this.$router.push(`/questions/new?id=${row.id}`)
    },
    // 搜索
    search () {
      console.log('搜索')
      this.getTableList(this.formData)
      // await choice(this.formData)
    },
    // 审核
    checkState (row) {
      console.log(989)
      this.shehedata.id = row.id
      this.dialogVisibleshehe = true
    },
    cancelshehe () {
      this.dialogVisibleshehe = false
    },
    sureshe () {
      if (this.shehedata.chkRemarks === '') {
        return this.$message.warning('请输入内容')
      }
      choiceCheck(this.shehedata)
      this.getTableList(this.page)
      this.shehedata = {}
      this.$message.success('操作成功')
      this.dialogVisibleshehe = false
    },
    // 上下架
    async updown (row) {
      const upordown = row.publishState === 0 ? '上架' : '下架'
      await this.$confirm(`是否${upordown}此题目?`, '提示', {
        type: 'warning'
      })
      row.publishState = upordown === '上架' ? 1 : 0
      await choicePublish(row)
      this.getTableList(this.page)
      this.$message.success(`${upordown}成功`)
    },

    formatterFn (row, column, cellValue) {
      const res = this.choiceType.find((ele) => ele.id === +cellValue)
      return res.value
    },
    formatterFn1 (row, column, cellValue) {
      const res = this.difficultys.find((ele) => ele.id === +cellValue)
      return res ? res.value : '未知'
    },
    formatterFn2 (row, column, cellValue) {
      const res = this.questionType.find((ele) => ele.id === +cellValue)
      // console.log(res)
      return res ? res.value : '未知'
    },
    formatterFn3 (row, column, cellValue) {
      const res = this.publishState.find((ele) => ele.id === +cellValue)
      // console.log(res)
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
.el-pagination {
  text-align: right;
}
</style>
