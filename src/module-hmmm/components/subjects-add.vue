<template>
  <div class='container'>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="cancelBtn">
      <el-form ref="subjectForm"
               label-width="80px"
               :model="formData">
        <el-form-item label="学科名称"
                      prop="subjectName">
          <el-input placeholder="请输入学科名称"
                    v-model="formData.subjectName"></el-input>
        </el-form-item>
        <el-form-item label="是否显示"
                      prop="isFrontDisplay">
          <el-switch v-model="formData.isFrontDisplay"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     :active-value='1'
                     :inactive-value='0'>
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary"
                   @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { update, add } from '@/api/hmmm/subjects'
export default {
  name: 'subjectAdd',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      return this.formData.id ? '修改学科' : '新增学科'
    }
  },
  data () {
    return {
      formData: {
        subjectName: '',
        isFrontDisplay: 0
      }
    }
  },
  methods: {
    async confirmBtn () {
      console.log(this.formData)
      try {
        this.formData.id ? await update(this.formData) : await add(this.formData)
        this.$emit('refreshList')
        this.$message.success(`${this.formData.id ? '修改' : '添加'}科目成功`)
      } catch (error) {
        this.$message.error(`${this.formData.id ? '修改' : '添加'}科目失败`)
      }
      this.cancelBtn()
    },
    cancelBtn () {
      this.$refs.subjectForm.resetFields()
      this.formData = {
        subjectName: '',
        isFrontDisplay: 0
      }
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style scoped lang='less'></style>
