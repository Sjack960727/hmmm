<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 清除和搜索和新增 -->
        <el-form label-width="80px">
          <el-row>
            <el-col :span="3"
              ><div class="grid-content bg-purple yangshi1">
                <el-input
                  v-model="page1.title"
                  label-width="50px"
                  placeholder="根据用户名搜索"
                ></el-input></div
            ></el-col>
            <el-col :span="19"
              ><div class="grid-content bg-purple">
                <el-button @click="qingchu">清除</el-button
                ><el-button type="primary" @click="shousuojian">搜索</el-button>
              </div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">
                <el-button @click="getqyonghu" type="success"
                  ><i class="el-icon-edit"></i>新增权限组</el-button
                >
              </div></el-col
            >
          </el-row>
        </el-form>
        <!-- 新增权限表 -->
        <el-dialog :title="xihuan" :visible.sync="dialogVisible" width="50%">
          <div class="juli">
            <el-form :rules="rules" label-width="100px" class="demo-ruleForm">
              <el-form-item label="活动名称" prop="ruleFormname">
                <el-input v-model="ruleFormname" class="kuang"></el-input>
              </el-form-item>
              <el-form-item label="权限分配">
                <!-- 新增权限组组件 -->
                <!-- <xinjian  :xinzenshuju='xinzenshuju' @changMessage="xuanzhongde.$event(id)"></xinjian> -->
                <el-tree
                  ref="xingde"
                  @check="dianji"
                  :data="xinzenshuj"
                  :props="props"
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="permissions"
                  :default-expanded-keys="permissions"
                >
                </el-tree>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="quding">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 记录 -->
        <div class="yangs">
          <el-alert type="info">
            <i class="el-icon-info"> </i>共 {{ jilu }}条记录
          </el-alert>
        </div>
        <!-- 数据渲染 -->
        <div class="yangs">
          <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="400"> </el-table-column>

            <el-table-column prop="title" label="用户名" width="400">
            </el-table-column>
            <el-table-column
              prop="update_date"
              label="日期"
              sortable
              width="720"
            >
            </el-table-column>
            <el-table-column
              prop="tag"
              label="标签"
              width="110"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="bianji(scope.row)"
                ></el-button>
                <el-button
                  @click="shanchu(scope.row.id)"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            background
            :current-page.sync="page.page"
            :page-size.sync="page.pagesize"
            @size-change="getquxian"
            @current-change="getquxian"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="jilu"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getquanxian, getqyonghu, getpermissions, postpermissions, detail, update } from '../../api/quanxian'
export default {
  components: {
  },
  data () {
    return {
      shujuId: '',
      permissions: [], // 树状图数据
      xihuan: '创建权限组',
      props: {
        label: 'title',
        children: 'childs'
      },
      count: 1,
      xinzenshuju: [], // 新增权限树状图数据
      xinzenshuj: [{
        id: 999999,
        childs: this.xinzenshuju,
        title: '系统菜单和页面权限点'

      }],
      xuanzhongde: [], // 选中的
      ruleFormname: '', // 用户名
      dialogVisible: false, // 权限表开关
      page: {
        page: 1, // 当前页数
        pagesize: 10 // 页数量
      },
      page1: {
        page: 1, // 当前页数
        pagesize: 10, // 页尺寸
        title: '' // 搜索关键字
      },
      jilu: 0, // 记录数
      tableData: [], // 传入子组件的渲染数据
      rules: {
        ruleFormname: [
          // { required: true, message: '用户名不能为空', trigger: 'blur' }

        ]
      }
    }
  },
  created () {
    // 渲染页面的数据的调用
    this.getquxian()
    // 新增权限分配数据的调用
    this.dainjishuju()
  },
  methods: {
    // 渲染页面的数据
    async getquxian () {
      const { data } = await getquanxian(this.page)
      const res1 = []
      data.list.forEach(item => {
        const res = {
          create_date: item.create_date.substring(10, 0),
          id: item.id,
          title: item.title,
          update_date: item.create_date.substring(10, 0)
        }
        res1.push(res)
      })
      this.tableData = res1
      this.jilu = data.counts
    },
    // 搜索清除
    qingchu () {
      this.page1.title = ''
    },
    // 搜索
    async shousuojian () {
      const { data } = await getquanxian(this.page1)

      this.tableData = data.list
    },
    // 新增权限分配数据
    async getqyonghu () {
      this.permissions = []
      this.xihuan = '创建权限组'
      this.ruleFormname = ''
      this.dialogVisible = true
    },
    // 点击新增
    async dainjishuju () {
      const { data } = await getqyonghu()
      this.xinzenshuj[0].childs = JSON.parse(JSON.stringify(data).replace(/points/g, 'childs'))
    },
    // 确定
    async quding () {
      if (this.xihuan === '创建权限组') {
        await getpermissions({ title: this.ruleFormname, permissions: this.xuanzhongde })
      } else {
        this.permissions = this.$refs.xingde.getCheckedKeys()
        await update({ id: this.shujuId, permissions: this.permissions, title: this.ruleFormname })
      }
      // this.ruleFormname, this.xuanzhongde.checkedNodes
      this.dialogVisible = false
      this.getquxian()
    },
    // 权限选中的
    dianji (data, er) {
      const res = []
      er.checkedNodes.forEach(item => {
        res.push(item.id)
      })
      this.xuanzhongde = res
    },
    // 删除
    async shanchu (scope) {
      await postpermissions(scope)
      this.getquxian()
    },
    // 编辑
    async bianji (row) {
      this.shujuId = row.id
      this.zhankai = true
      this.xihuan = '编辑权限组'
      this.ruleFormname = row.title
      const { data } = await detail({ id: row.id })
      this.permissions = data.permissions

      this.dialogVisible = true
    }

  }
}
</script>

<style scoped lang='less'>
.juli {
  padding-left: 180px;
}
.kuang {
  width: 280px;
}
.block {
  margin-top: 20px;
  margin-bottom: 20px;
  float: right;
}
.yangs {
  margin-top: 20px;
}
.yangshi {
  margin-top: 30px;
}
:deep(.yangshi1) {
  width: 200px;
}
</style>
