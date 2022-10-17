<template>
  <el-dialog :title="title" :visible="dialogVisible" width="50%" :before-close="handleClose"
    :close-on-click-modal="false">
    <el-form class="form" label-width="120px" :rules="formDataRules" ref="formRef" :model="formData">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!formData.id">
        <el-input v-model="formData.password" ></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input  v-model="formData.role"></el-input>
      </el-form-item>
      <el-form-item label="权限组名称">
        <el-select v-model="formData.permission_group_id" placeholder="请选择">
          <el-option
            v-for="item in simples"
            :key="item.id"
            :label="item.title"
            :value="item.id"
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formData.introduction"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { add, update } from '@/api/base/users'
import { simple } from '@/api/base/permissions'
export default {
  data () {
    return {
      formData: {
        email: '',
        introduction: '',
        password: '',
        phone: '',
        role: '',
        username: '',
        permission_group_id: ''
      },
      formDataRules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }]
      },
      simples: []
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    curUser: {
      type: Object,
      required: true
    }
  },
  watch: {
    async dialogVisible (val) {
      if (val === true) {
        const { data } = await simple()
        this.simples = data
        console.log(data)
      }
    },
    curUser (val) {
      this.formData = val
    }
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
  methods: {
    handleClose () {
      this.$emit('update:dialogVisible', false)
      setTimeout(() => {
        this.$refs.formRef.resetFields()
        this.formData = {
          email: '',
          introduction: '',
          password: '',
          phone: '',
          role: '',
          username: '',
          permission_group_id: ''
        }
      }, 500)
    },
    async  onSubmit () {
      try {
        await this.$refs.formRef.validate()
        if (this.formData.id) {
          await update(this.formData)
          this.$message.success('修改成功')
        } else {
          await add(this.formData)
          this.$message.success('添加成功')
        }
        this.$parent.getUserList()
        this.handleClose()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  width: 400px;
  margin-left: 120px;
}
/deep/.el-dialog__footer{
  text-align: center !important;
}
</style>
