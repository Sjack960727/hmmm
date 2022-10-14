<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-button type="success" icon="el-icon-edit" class="addMuen" size="small" @click="addMenu">添加菜单</el-button>
        <el-form inline>
          <el-form-item>
            <el-input placeholder="根据用户名搜索" size="small" v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="sentEmpty">清空</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-alert title="消息提示的文案" type="info" :closable="false" show-icon class="alert">
      </el-alert>
      <el-table :data="userList" style="width: 100%;margin-bottom: 20px;" ref="tableRef">
        <el-table-column prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="permission_group_title" label="权限组名称" align="center">
        </el-table-column>
        <el-table-column prop="role" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="100" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" plain circle icon="el-icon-edit" @click="editUser(row)" ></el-button>
            <el-button type="danger" plain circle icon="el-icon-delete" @click="removeUser(row)" v-if="row.id!=2"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 32px;">
        <page-tool :paginationPage="formData.page" :total="total" @pageSizeChange="pageSizeChange" :paginationPagesize="formData.pagesize" class="page" @pageChange="pageChange" ></page-tool>
       </div>
    </el-card>
    <user-add :dialogVisible.sync="dialogVisible" :curUser="curUser"></user-add>
  </div>
</template>

<script>
import { list, remove } from '@/api/base/users'
import PageTool from '../components/page-tool.vue'
import UserAdd from '../components/user-add.vue'
export default {
  data () {
    return {
      userList: [],
      total: 0,
      formData: {
        page: 1,
        pagesize: 10,
        username: ''
      },
      dialogVisible: false,
      curUser: {}
    }
  },
  components: {
    PageTool,
    UserAdd
  },
  created () {
    this.getUserList()
  },

  methods: {
    async getUserList () {
      const { data } = await list(this.formData)
      this.userList = data.list
      this.formData.page = data.page
      this.total = data.counts
      this.formData.pagesize = data.pagesize
      console.log(data)
    },
    pageChange (val) {
      this.formData.page = val
      this.getUserList()
    },
    pageSizeChange (val) {
      this.formData.pagesize = val
      this.getUserList()
    },
    async removeUser (row) {
      try {
        await this.$confirm('此操作将永久删除用户 , 是否继续?', '提示', ({
          type: 'warning'
        }))
        await remove(row)
        if (this.formData.page > 1 && this.userList.length === 1) {
          console.log(1)
          this.formData.page--
        }

        this.$message.success('成功删除了用户!')
        this.getUserList()
      } catch (error) {
        if (error === 'cancel') {
          this.$message.info('已取消操作!')
        }
      }
    },
    addMenu () {
      this.dialogVisible = true
    },
    editUser (row) {
      this.curUser = {
        id: row.id,
        email: row.email,
        introduction: row.introduction,
        password: row.password,
        phone: row.phone,
        role: row.role,
        username: row.username,
        permission_group_id: row.permission_group_id
      }
      this.dialogVisible = true
    },
    search () {
      this.formData.page = 1
      this.getUserList()
    },
    sentEmpty () {
      this.formData.page = 1
      this.formData.username = ''
      this.getUserList()
    }
  }
}
</script>

<style scoped lang='less'>
.alert{
  margin-bottom: 20px;
}
.addMuen {
  float: right;
}
.el-table thead{
  color: #909399;
  font-weight: 500;
}
/deep/.el-table th.el-table__cell{
  background-color: #fafafa;
}
/deep/.el-table .cell{
  padding-left: unset;
  padding-right: unset;
}
.page{
  float: right;
  }
</style>
