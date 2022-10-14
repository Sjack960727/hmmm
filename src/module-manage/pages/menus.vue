<template>
  <div class="app-container">
    <el-card>
      <el-button type="success" icon="el-icon-edit" class="addMuen" size="small" @click="addMenu">添加菜单</el-button>
      <el-table
        :data="menuList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        default-expand-all
        ref="tableRef"
        :tree-props="{children:'childs',hasChildren: 'points'}">
        <el-table-column
          prop="title"
          label="标题"
          width="200">
          <template slot-scope="{row}">
            <svg-icon icon-class="files" v-if="row.childs && !row.childs[0].is_point" class="iconfont"></svg-icon>
            <svg-icon icon-class="eyeo" v-else-if="row.is_point" class="iconfont"></svg-icon>
            <svg-icon icon-class="document" v-else class="iconfont"></svg-icon>
              <!-- <i class="el-icon-folder-opened iconfont" v-if="row.childs && !row.childs[0].is_point"></i>
              <i class="el-icon-setting iconfont" v-else-if="row.is_point"></i>
              <i class='el-icon-document-remove iconfont' v-else ></i> -->
              <span>{{ row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="权限点代码"
       >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="120">
          <template slot-scope="{row}">
            <el-button type="primary"  plain circle icon="el-icon-edit" @click="editList(row)"></el-button>
            <el-button type="danger"  plain circle icon="el-icon-delete" @click="removeList(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <menu-add :dialog-visible.sync="dialogVisible" :currForm="currForm"></menu-add>
  </div>
</template>

<script>
import MenuAdd from '../components/menu-add.vue'
import { list, remove } from '@/api/base/menus'
export default {
  data () {
    return {
      menuList: [],
      dialogVisible: false,
      initialMenuList: [],
      currForm: {}
    }
  },
  components: {
    MenuAdd
  },
  created () {
    this.getMenuList()
  },
  mounted () {
  },
  methods: {
    async getMenuList () {
      const { data } = await list()
      this.initialMenuList = data
      this.menuList = JSON.parse(JSON.stringify(data).replace(/points/g, 'childs'))
      console.log(data)
    },
    async removeList (row) {
      try {
        await this.$confirm('此操作将永久删除用户 , 是否继续?', '提示', ({
          type: 'warning'
        }))
        await remove(row)
        this.$message.success('成功删除了用户!')
        this.getMenuList()
      } catch (error) {
        if (error === 'cancel') {
          this.$message.info('已取消操作!')
        }
      }
    },
    addMenu () {
      this.dialogVisible = true
    },
    editList (row) {
      this.currForm = {
        code: row.code,
        id: row.id,
        is_point: row.is_point || false,
        pid: row.pid || 0,
        title: row.title
      }
      this.dialogVisible = true
    }
  }
}
</script>

<!-- <style lang="less">

.el-table__expand-icon--expanded{
  display: none !important;
}

</style> -->

<style scoped lang='less'>
.addMuen {
  float: right;
  margin-bottom: 20px;
}
.iconfont{
  margin-right: 5px;
  font-size:16px;
}
.el-table thead{
  color: #909399;
  font-weight: 500;
}
/deep/.el-table .el-table__placeholder{
  width: unset;
}
/deep/.el-table th.el-table__cell{
  background-color: #fafafa;
}
/deep/.el-table .el-table__expand-icon--expanded{
  display: none !important;
}
</style>
