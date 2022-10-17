<template>
  <div class='container'>
    <el-card>
      <!-- 搜索/新增/总条数灰色提示栏目组件 -->
      <tags-headers :totalCount='listData.counts'>
        <template #addBtn>
          <el-button class="addBtn" type="primary" icon="el-icon-edit" @click="addTag">新增标签</el-button>
        </template>
        <template #label>
            <span>标签名称</span>
        </template>
        <template #sarchInput>
          <el-input class="elInput" v-model="searchList.tagName"  placeholder="请输入名称"></el-input>
        </template>
        <template #selectIput>
          <el-select class="elSelect" v-model="searchList.state" placeholder="请选择">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template #ClearAndSearch>
          <el-button class="elBtn" size="small" @click="clearData">清除</el-button>
          <el-button class="elBtn" size="small" @click="searchBtn" type="primary">搜索</el-button>
        </template>
      </tags-headers>
      <!-- 表单 -->
      <el-table
        v-loading='loading'
        :data='listData.items'
        style="width: 100%"
        >

        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>

        <el-table-column
          prop="subjectName"
          label="所属学院"
          >
        </el-table-column>

        <el-table-column
          prop="tagName"
          label="标签名称">
        </el-table-column>

        <el-table-column
          prop="username"
          label="创建者">
        </el-table-column>

        <el-table-column
          prop="addDate"
          label="创建日期">
          <template slot-scope="{row}">
            <span>{{handleDate(row.addDate).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="状态">
          <template slot-scope="{row}">
              {{row.state ? '已启用' : '已禁用'}}
          </template>
        </el-table-column>

        <el-table-column
          prop=""
          label="操作"
          width="150"
          >
          <template slot-scope="{row}">
              <el-button
                class="elButton"
                type="text"
                @click="active(row)"
              >
                {{ row.state ? '禁用' : '启用' }}
              </el-button>

              <el-button
                class="elButton"
                type="text"
                :class="{ 'activeBtn':row.state }"
                :disabled='row.state ? true : false'
                @click="handleEdit(row)"
                >
                修改</el-button>

              <el-button
                class="elButton"
                type="text"
                :class="{ 'activeBtn':row.state }"
                :disabled='row.state ? true : false'
                @click="deletData(row)"
              >
              删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
    <tags-paging
      :page='page'
      :total='listData.counts'
      :loadingList='loadingList'
    />
    </el-card>

    <!-- 修改按钮弹出层组件 -->
    <editDialog
      :visible.sync='showVisible'
      :loadingList='loadingList'
      :currentData='currentData'
    >
    </editDialog>
  </div>
</template>

<script>
import { list, changeState, remove } from '@/api/hmmm/tags'
import dayjs from 'dayjs'
import editDialog from '../components/tags-edit-dialog.vue'
import tagsPaging from '../components/tags-pagination.vue'
import tagsHeaders from '../components/tags-headers'
export default {
  name: 'tags',
  components: {
    editDialog,
    tagsPaging,
    tagsHeaders
  },
  data () {
    return {
      page: {
        page: 1,
        pagesize: 10
      },
      searchList: {
        state: '',
        page: 1,
        pagesize: 10,
        tagName: ''
      },
      status: [
        { label: '禁用', value: 0 },
        { label: '启用', value: 1 }
      ],
      listData: [],
      showVisible: false,
      currentData: [],
      loading: false
    }
  },
  created () {
    this.loadingList()
  },
  computed: {
    handleDate () {
      return dayjs
    }
  },
  methods: {
    // 获取列表
    async loadingList () {
      this.loading = true
      const { data } = await list(this.page)
      this.listData = data
      this.loading = false
    },
    // 状态(禁用/启用)
    async active (data) {
      data.state = data.state === 1 ? data.state - 1 : data.state + 1
      await changeState(data)
      this.$message.success('操作成功')
    },
    // 修改
    handleEdit (row) {
      this.showVisible = true
      this.currentData = row
      this.$children[1].newCurrentData = { ...row }
    },
    // 删除数据
    async deletData (row) {
      try {
        await this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.loading = true
        await remove(row)
        await this.loadingList()
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.loading = false
      }
    },
    // 新增按钮
    async addTag () {
      this.showVisible = true
      this.$children[1].newCurrentData = { }
    },
    // 清除按钮
    clearData () {
      this.searchList = {
        state: '',
        page: 1,
        pagesize: 10,
        tagName: ''
      }
    },
    // 搜索按钮
    async searchBtn () {
      this.loading = true
      // 标签名称输入框有字时进入这个条件
      if (this.searchList.tagName !== '') {
        const { data } = await list({
          tagName: this.searchList.tagName,
          page: this.searchList.page,
          pagesize: this.searchList.pagesize
        })
        this.listData = data
      // 状态输入框有字时进入这个条件
      } else if (this.searchList.state !== '') {
        const { data } = await list({
          page: this.searchList.page,
          pagesize: this.searchList.pagesize,
          state: this.searchList.state
        })
        this.listData = data
      } else {
        const { data } = await list(this.page)
        this.listData = data
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 10px;
}

::v-deep .is-leaf {
  background-color: #fafafa !important;
  border-bottom: 2px solid #e8e8e8 !important;
}
::v-deep .el-table__row {
  height: 57px;
}
.elButton {
  width: 30px;
  height: 36px;
  border: none;
  background-color: transparent;
  color: #399ffe;
}
.activeBtn {
  color: #c0c9db;
}
.addBtn {
  background-color: #66c141;
  width: 97px;
  height: 32px;
  padding: 9px 15px;
  font-size: 12px;
  border-color: transparent;
}
</style>
