<template>
  <div>
    <el-row class="elRow">
      <el-col :span="18">
        <!-- 搜索横向表单 -->
        <el-form ref="form" class="elForm"  label-width="80px" :inline="true"   >

          <el-form-item >
            <template #label>
                <slot name='label'></slot>
            </template>
            <slot name="sarchInput"></slot>
          </el-form-item>

          <el-form-item label="状态" >
            <slot name="selectIput"></slot>
          </el-form-item>

          <el-form-item>
            <slot name="ClearAndSearch"></slot>
          </el-form-item>

        </el-form>
      </el-col>
      <!-- 新增按钮 -->
      <el-col :span="6" style="text-align: right;">
        <slot name="addBtn"></slot>
      </el-col>
    </el-row>
    <!-- 灰色警告栏目 -->
    <el-alert
      type="info"
      :closable='false'
      show-icon
      style="margin-bottom: 15px;"
    >
      <template #title>
        <span>数据一共{{totalCount || 0}} 条</span>
      </template>
    </el-alert>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: Number
  },
  data () {
    return {
      searchList: {
        state: '',
        page: 1,
        pagesize: 10,
        tagName: ''
      },
      status: [
        { label: '禁用', value: 0 },
        { label: '启用', value: 1 }
      ]
    }
  },
  methods: {
    // 清除按钮
    clearData () {
    },
    addTag () {},
    searchBtn () {}
  }
}
</script>

<style scoped>
::v-deep .elForm {
  height: 51px;
}

::v-deep .elInput {
  width: 200px;
  height: 32px;
}

::v-deep .elSelect {
  width: 215px;
  height: 32px;
}

.elBtn {
  width: 56px;
}

</style>
