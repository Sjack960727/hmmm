<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <el-row :gutter="20">
          <!-- 标签名称 -->
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form :model="from" label-width="80px">
                <el-form-item label="标签名称" prop="biaoqian">
                  <el-input
                    v-model="from.biaoqian"
                    class="yangshi"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <!-- 状态 -->
                <el-form-item label="状态" prop="region">
                  <el-select
                    v-model="from.region"
                    class="yangshi"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <!-- 城市 -->
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form :model="from" label-width="80px">
                <el-form-item label="城市" prop="chnegshi">
                  <el-select
                    @change="huoqu"
                    v-model="from.chnegshi"
                    class="yangshi"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in provinces"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <!-- 清除和搜索 -->
              <el-form label-width="40px">
                <el-form-item>
                  <el-button @click="qingchu">清除</el-button>
                  <el-button type="primary" @click="sousuo">搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <!-- 地区 -->
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form :model="from" label-width="80px">
                <el-form-item label="地区" prop="diqu">
                  <el-select
                    v-model="from.diqu"
                    class="yangshi"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in diqushuju"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <!-- 企业简称 -->
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form :model="from" label-width="80px">
                <el-form-item label="企业简称" prop="jiancheng">
                  <el-input v-model="from.jiancheng" class="yangshi">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="xingzeng" class="juli" type="success"
                    ><i class="el-icon-edit"></i> 新增用户
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-alert :title="`共 ${shuju} 条记录`" type="info" show-icon>
        </el-alert>
        <!-- 表格渲染 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="number" label="企业编号" width="180">
          </el-table-column>
          <el-table-column prop="shortName" label="企业简称"></el-table-column>
          <el-table-column prop="tags" label="标签"></el-table-column>
          <el-table-column prop="creatorID" label="创建者"></el-table-column>
          <el-table-column prop="addDate" label="创建日期"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
          <el-table-column
            :formatter="formatterFn"
            prop="state"
            label="状态"
          ></el-table-column>
          <el-table-column prop="zhuantai" label="操作">
            <template slot-scope="{ row }">
              <!-- 编辑按钮 -->
              <el-button
                @click="bianji(row.id)"
                type="primary"
                plain
                icon="el-icon-edit"
                circle
              ></el-button>
              <!-- 启用和禁止按钮 -->
              <el-button
                v-if="row.state === 1"
                @click="qidong(row.id)"
                type="warning"
                plain
                icon="el-icon-close"
                circle
              >
              </el-button>
              <el-button
                v-else
                @click="jingzhi(row.id)"
                type="success"
                plain
                icon="el-icon-check"
                circle
              >
              </el-button>
              <!-- 删除按钮 -->
              <el-button
                @click="sahnchu(row.id)"
                type="danger"
                plain
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 新增用户 -->

        <el-dialog
          :title="chuanjianhe"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <div class="yangshijuli">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="150px"
            >
              <el-form-item label="企业名称" prop="mingcheng">
                <el-input v-model="ruleForm.mingcheng"></el-input>
              </el-form-item>
              <el-form-item label="所属公司" prop="gongsi">
                <el-input v-model="ruleForm.gongsi"></el-input>
              </el-form-item>
              <el-form-item label="所属公司" prop="gongsi">
                <span
                  >https://www.tianyancha.com
                  （在此可查询所属公司全称及简称）</span
                >
              </el-form-item>
              <el-form-item label="城市地区" prop="chewngshi">
                <el-select
                  @change="huoqu"
                  v-model="ruleForm.chewngshi"
                  class="yangshi1"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="ruleForm.diquer"
                  class="yangshi1"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in diqushuju1"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="方向（企业标签）" prop="fangxiang">
                <el-input v-model="ruleForm.fangxiang"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="beizhu">
                <el-input type="textarea" v-model="ruleForm.beizhu"></el-input>
              </el-form-item>
            </el-form>
            <div class="juzhong">
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="queding">确 定</el-button>
              </span>
            </div>
          </div>
        </el-dialog>

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            background
            :current-page.sync="page.page"
            :page-size.sync="page.pagesize"
            @size-change="leibiao"
            @current-change="leibiao"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="shuju"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { status } from '@/api/hmmm/constants.js'
import { provinces, citys } from '@/api/hmmm/citys.js'
import { list, add, detail, update, remove, disabled } from '@/api/hmmm/companys.js'
export default {
  data () {
    return {
      addDate: '',
      creatorID: '',
      isFamous: 0,
      number: '',
      state: '',
      bianjiId: 0,
      chuanjianhe: '创建用户',
      ruleForm: {
        mingcheng: '', // 企业名称
        gongsi: '', // 所属公司
        fangxiang: '', // 方向
        chewngshi: '', // 城市
        diquer: '', // 地区
        beizhu: ''// 备注
      },
      rules: {
        mingcheng: [
          { required: true, message: '企业简称不能为空', trigger: 'blur' }
        ],
        gongsi: [
          { required: true, message: '所属公司不能为空', trigger: 'blur' }
        ],
        fangxiang: [
          { required: true, message: '请输入标签', trigger: 'blur' }
        ],
        beizhu: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ]
      },
      dialogVisible: false, // 新增用户的弹出控制
      page: {
        page: 1, // 页数
        pagesize: 10 // 一页多少个数据
      },
      citys, // 地区数据
      shuju: 0, // 记录条数
      status, // 启用和禁止数据
      provinces, // 城市数据
      diqushuju: [], // 地区数据
      diqushuju1: [], // 地区数据
      from: {
        region: '', // 启动和禁用
        chnegshi: null, // 城市
        diqu: '', // 地区
        biaoqian: null, // 标签名称
        jiancheng: null// 企业简称
      },
      // 渲染页面的数据
      tableData: [{
        id: '',
        number: '',
        shortName: '',
        tags: '',
        creatorID: '',
        addDate: '',
        remarks: '',
        state: null
      }]
    }
  },

  created () {
    this.leibiao()
    this.provinces = this.provinces()
  },

  methods: {
    // 渲染页面的数据
    async leibiao () {
      const { data } = await list(this.page)
      this.shuju = data.counts
      this.tableData = data.items
    },
    formatterFn (row, column, cellValue) {
      const res = this.status.find(ele => ele.value === cellValue)
      return res ? res.label : ''
    },
    // 城市失去焦点出发
    huoqu () {
      this.diqushuju = this.citys(this.from.chnegshi)
      this.diqushuju1 = this.citys(this.ruleForm.chewngshi)
    },
    // 清除数据
    qingchu () {
      this.from.region = ''
      this.from.chnegshi = ''
      this.from.diqu = ''
      this.from.biaoqian = ''
      this.from.jiancheng = ''
    },
    // 搜索
    async sousuo () {
      const { data } = await list({
        page: this.page.page,
        pagesize: this.page.pagesize,
        tags: this.from.biaoqian,
        province: this.from.chnegshi,
        city: this.from.chnegshi,
        shortName: this.from.jiancheng,
        state: this.from.region
      })
      this.shuju = data.counts
      this.tableData = data.items
    },
    // 新增用户
    xingzeng () {
      this.ruleForm.mingcheng = ''
      this.ruleForm.gongsi = ''
      this.ruleForm.fangxiang = ''
      this.ruleForm.chewngshi = ''
      this.ruleForm.diquer = ''
      this.ruleForm.beizhu = ''
      this.chuanjianhe = '创建用户'
      this.dialogVisible = true
    },
    // 确定
    async queding () {
      this.dialogVisible = false
      if (this.chuanjianhe === '创建用户') {
        await add({
          city: this.ruleForm.diquer,
          company: this.ruleForm.gongsi,
          isFamous: true,
          province: this.ruleForm.chewngshi,
          shortName: this.ruleForm.beizhu,
          remarks: this.ruleForm.mingcheng,
          tags: this.ruleForm.fangxiang
        })
      } else {
        await update({
          id: this.bianjiId,
          addDate: this.addDate,
          city: this.ruleForm.diquer,
          company: this.ruleForm.gongsi,
          creatorID: this.creatorID,
          isFamous: this.isFamous === 1,
          number: this.number,
          province: this.ruleForm.chewngshi,
          remarks: this.ruleForm.beizhu,
          shortName: this.ruleForm.mingcheng,
          state: this.state,
          tags: this.ruleForm.fangxiang
        })
      }
      this.leibiao()
    },
    // 编辑
    async bianji (id) {
      this.bianjiId = id
      this.chuanjianhe = '编辑用户'
      const { data } = await detail({ id })
      this.ruleForm.mingcheng = data.shortName
      this.ruleForm.gongsi = data.company
      this.ruleForm.fangxiang = data.tags
      this.ruleForm.chewngshi = data.province
      this.ruleForm.diquer = data.city
      this.ruleForm.beizhu = data.remarks

      this.addDate = data.addDate
      this.creatorID = data.creatorID
      this.isFamous = data.isFamous
      this.number = data.number
      this.state = data.state
      this.dialogVisible = true
    },
    // 删除数据
    async sahnchu (id) {
      await remove({ id: id })
      this.leibiao()
    },
    // 切换状态
    async qidong (id) {
      await disabled({ id: id, state: 0 })
      this.leibiao()
    },
    // 切换禁止
    async jingzhi (id) {
      await disabled({ id: id, state: 1 })
      this.leibiao()
    }

  }
}
</script>

<style scoped lang='less'>
.yangshi1 {
  margin-right: 10px;
  width: 285px;
}
.juzhong {
  margin-top: 50px;
  text-align: center;
  margin-left: 20px;
}
.yangshijuli {
  margin-left: 30px;
  margin-right: 150px;
}
.block {
  margin-top: 20px;
  margin-bottom: 20px;
  float: right;
}
.juli {
  margin-left: 213px;
}
.yangshi {
  width: 330px;
}
</style>
