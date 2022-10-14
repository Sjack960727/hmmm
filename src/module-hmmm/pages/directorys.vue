<template>
  <div class='container'>
    <el-card>
      <el-form :inline="true">
        <el-col :span="6">
          <el-form-item label="目录名称">
              <el-input  v-model="muluname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="状态">
            <el-select placeholder="请选择" v-model="condition">
                <el-option label="启用" value="启用"></el-option>
                <el-option label="禁用" value="禁用"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="condition=''">清除</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-col>
        <!-- <el-col>
        </el-col> -->
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <el-button type="success" icon="el-icon-edit" @click="dialog">新增目录</el-button>
          </div>
        </el-col>
      </el-form>
      <!-- 灰色数据统计框 -->
      <el-alert type="info" show-icon :closable="false">
        <template #title> 数据一共{{counts}}条 </template>
      </el-alert>

      <!-- 表格 -->
      <el-table :data="tableList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="subjectName" label="所属学科" width="150">
        </el-table-column>
        <el-table-column prop="directoryName" label="目录名称" width="150">
        </el-table-column>
        <el-table-column prop="username" label="创建者" width="160" >
        </el-table-column>
        <el-table-column prop="addDate" label="创建日期" width="280">
        </el-table-column>
        <el-table-column prop="totals" label="面试题数量" width="120" >
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100">
        </el-table-column>
        <el-table-column  label="操作" >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text"
              >{{scope.row.state==='已禁用'?'启用':'禁用'}}</el-button
            >
            <el-button type="text" :disabled="scope.row.state==='已启用'" @click="changes(scope.row)">修改</el-button>
            <el-button type="text" :disabled="scope.row.state==='已启用'" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
    <!-- 弹出框 -->
    <directorys-add :dialogVisible.sync="isShow" ref="adddirectorys"></directorys-add>
    <!-- <changemulu :dialogVisible.sync="isShow1" :row="currow"></changemulu> -->
  </div>
</template>

<script>
import { list, changeState, remove } from '@/api/hmmm/directorys.js'
import { parseTimeByString } from '@/filters'
import DirectorysAdd from '../components/directorys-add.vue'
export default {
  components: {
    DirectorysAdd
  },
  data () {
    return {
      isShow: false,
      isShow1: false,
      currow: '',
      muluname: '',
      condition: '',
      counts: '',
      use: '',
      page: {
        page: 1,
        size: 10
      },
      tableList: []
    }
  },
  created () {
    this.getTableList(this.page)
  },
  methods: {
    async getTableList (a) {
      const { data } = await list(a)
      this.counts = data.counts
      this.tableList = data.items
      this.tableList.forEach(item => {
        item.addDate = parseTimeByString(item.addDate)
        item.state = item.state === 0 ? '已禁用' : '已启用'
      })
    },
    handleClick (row) {
      // console.log(row)
      /* eslint-disable */
      const data = {
        id: row.id,
        state: row.state = row.state === '已禁用' ? 1 : 0
      }
       changeState(data)
      row.state = row.state === '已禁用' ? '已启用' : '已禁用'
      this.$message.success('操作成功')
      this.getTableList()
    },
    search() {
      const state = this.condition === '禁用' ? 0 : 1
      const searchdata = { state, ...this.page }
      this.getTableList(searchdata)
    //  console.log(searchdata);
    },
    dialog() {
      console.log(123);
      this.isShow=true
    },
   async del(row) {
     await remove(row)
     this.getTableList()
     this.$message.success('删除成功')
    },
    changes(row) {
      console.log(row);
      this.$refs.adddirectorys.form = { ...row }
      this.isShow=true
    }
  }
}
</script>

<style scoped lang='less'></style>
