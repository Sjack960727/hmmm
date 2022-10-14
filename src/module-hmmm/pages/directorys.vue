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
                <el-option label="启用" value="shanghai"></el-option>
                <el-option label="禁用" value="beijing"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button>清除</el-button>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-col>
        <!-- <el-col>
        </el-col> -->
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <el-button type="success" icon="el-icon-edit">新增试题</el-button>
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
            <el-button type="text" :disabled="scope.row.state==='已启用'">修改</el-button>
            <el-button type="text" :disabled="scope.row.state==='已启用'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
import { list } from '@/api/hmmm/directorys.js'
import { parseTimeByString } from '@/filters'
export default {
  data () {
    return {
      muluname: '',
      condition: '',
      counts: 10,
      use: '',
      page: {
        page: 1,
        size: 10
      },
      tableList: []
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    async getTableList () {
      const { data } = await list(this.page)
      this.tableList = data.items
      this.tableList.forEach(item => {
        item.addDate = parseTimeByString(item.addDate)
        item.state = item.state === 0 ? '已禁用' : '已启用'
      })
    },
    handleClick (row) {
      /* eslint-disable */
      row.state = row.state === '已禁用' ? '已启用' : '已禁用'
      this.$message.success('操作成功')
    }
  }
}
</script>

<style scoped lang='less'></style>
