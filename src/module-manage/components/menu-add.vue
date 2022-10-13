<template>
  <el-dialog :title="title" :visible="dialogVisible" width="50%" :before-close="handleClose" :close-on-click-modal="false"	>
    <el-form class="form" label-width="120px" :rules="formDataRules" ref="formRef" :model="formData">
      <el-form-item label="权限组名称" >
        <el-radio-group v-model="formData.is_point" @change="changeRadio">
          <el-radio :label="false" :disabled="!!formData.id">菜单</el-radio>
          <el-radio :label="true" :disabled="!!formData.id">权限点</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限组名称">
        <el-select v-model="formData.pid" placeholder="请选择">
          <el-option
            label="主导航"
            :value="0">
          </el-option>
          <el-option
            v-for="(item,index) in filterData"
            :key="index"
            :label="item.title"
            :value="item.id"
            :disabled="(formData.is_point && !!item.childs) || (!formData.is_point && !!item.points)"
            :style="{'text-indent': item.index*14+'px'}"
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限代码" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="权限标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { list, add, update } from '@/api/base/menus'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    currForm: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      formData: {
        is_point: false,
        code: '',
        title: '',
        pid: 0
      },
      formDataRules: {
        code: [{ required: true, message: '代码不能为空', trigger: 'blur' }],
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }]
      },
      initialMenuList: [],
      filterData: []
    }
  },
  async created () {
    this.getMenuList()
  },
  computed: {
    title () {
      if (this.formData.id) {
        if (this.formData.is_point) return '编辑权限'
        return '编辑菜单'
      }
      return '创建菜单'
    }
  },
  watch: {
    dialogVisible (val) {
      if (val === true) {
        this.filterData = []
        this.getMenuList()
      }
    },
    currForm (val) {
      this.formData = val
    }
  },
  methods: {
    async getMenuList () {
      const { data } = await list()
      this.initialMenuList = data
      this.deepData(this.initialMenuList)
    },
    handleClose () {
      this.$emit('update:dialogVisible', false)
      setTimeout(() => {
        this.$refs.formRef.resetFields()
        this.formData = {
          is_point: false,
          code: '',
          title: '',
          pid: 0
        }
      }, 500)
    },
    deepData (data, i = 1) {
      data.forEach(item => {
        this.filterData.push({ ...item, index: i })
        if (item.childs) {
          this.deepData(item.childs, i + 1)
        }
      })
    },
    async onSubmit () {
      try {
        await this.$refs.formRef.validate()
        if (this.formData.id) {
          await update(this.formData)
          this.$message.success('修改成功')
        } else {
          await add(this.formData)
          this.$message.success('添加成功')
        }
        this.$parent.getMenuList()
        this.handleClose()
      } catch (error) {
        console.log(error)
      }
    },
    changeRadio () {
      this.formData.pid = 0
    }
  }
}
</script>

<style lang="less" scoped>
.form{
  width: 400px;
  margin-left: 120px;
}

</style>
