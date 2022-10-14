<template>
  <div class="app-container">
    <el-card>
      <div  class="addMuen" >
        <el-button type="primary" icon="el-icon-download"  size="small" @click="exportExcel">Excel导出</el-button>
        <el-button type="success" icon="el-icon-edit" size="small" @click="addMenu">添加菜单</el-button>
      </div>
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
      currForm: {},
      filterData: [],
      headers: { title: '标题', is_point: '权限', code: '权限点代码', belong: '所属标题' }
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
    },
    deepData (data, belong = '主导航') {
      data.forEach(item => {
        if (item.is_point) {
          this.filterData.push({ ...item, belong, is_point: item.title, title: '' })
        } else {
          this.filterData.push({ ...item, belong })
        }
        if (item.childs) {
          this.deepData(item.childs, item.title)
        } else if (item.points) {
          this.deepData(item.points, item.title)
        }
      })
    },
    configurationData () {
      return this.filterData.map(item => {
        return Object.keys(this.headers).map(h => {
          return item[h]
        })
      })
    },
    async exportExcel () {
      this.deepData(this.initialMenuList)
      const data = this.configurationData()
      const header = Object.values(this.headers)
      console.log(data)
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: '菜单权限表', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
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
