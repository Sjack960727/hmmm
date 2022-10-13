<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-button type="success" icon="el-icon-edit" class="addMuen" size="small">添加菜单</el-button>
        <el-form inline>
          <el-form-item>
            <el-input placeholder="根据用户名搜索" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small">清空</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-alert title="消息提示的文案" type="info" :closable="false" show-icon class="alert">
      </el-alert>
      <el-table :data="userList" style="width: 100%;margin-bottom: 20px;" ref="tableRef">
        <el-table-column prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="permission_group_title" label="权限组名称">
        </el-table-column>
        <el-table-column prop="role" label="角色">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="100">
          <template slot-scope="{row}">
            <el-button type="primary" plain circle icon="el-icon-edit"></el-button>
            <el-button type="danger" plain circle icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import { list } from '@/api/base/users'
export default {
  data () {
    return {
      userList: []
    }
  },

  created () {
    this.getUserList()
  },

  methods: {
    async getUserList () {
      const { data } = await list()
      this.userList = data.list
      console.log(data)
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
</style>
