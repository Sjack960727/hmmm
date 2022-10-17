<template>
  <div>
    <el-dialog
      :title="currentData.id ? '修改目录' : '新增目录'"
      :visible="visible"
      @close='handleClose()'>

      <el-form :model="newCurrentData" ref="diaLogForm" :rules="rules">

        <el-form-item label="所属学科" label-width='80px'>
          <el-select v-model="newCurrentData.subjectID" placeholder="请选择" class="elInput">
            <el-option
              v-for="(item,index) in subjectsList"
              :key="index"
              :value="item.value"
              :label="item.label"
              >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="目录名称" label-width='80px' prop="tagName">
          <el-input placeholder="请输入目录名称" v-model="newCurrentData.tagName" class="elInput"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="handleConfirm()">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { subjects, update, add } from '@/api/hmmm/tags'
export default {
  name: 'ediDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentData: {
      type: [Object, Array],
      require: true
    },
    loadingList: {
      type: Function
    }
  },
  data () {
    return {
      newCurrentData: {},
      formLabelWidth: '120px',
      subjectsList: [],
      // options: '',
      rules: {
        tagName: [
          { required: true, message: '请输入内容' }
        ]
      }
    }
  },
  created () {
    this.loadingSubjects()
  },
  watch: {
    currentData () {
      this.newCurrentData = { ...this.currentData }
      // this.pitchOnCurrent()
    }
  },
  methods: {
    // 确定按钮
    async handleConfirm () {
      /* 这里用await还是会往下走,不知道为什么 所以用判断条件打断 */
      // await this.$refs.diaLogForm.validateField('tagName')
      if (!this.newCurrentData.tagName) {
        this.$message.error('请输入内容')
        return
      }
      // console.log(1)
      // 判断如果newCurrentData有id就是修改接口  否则就是添加接口
      if (this.newCurrentData.id) {
        await update(this.newCurrentData)
        this.$message.success('修改标签名称成功')
      } else {
        await add(this.newCurrentData)
        this.$message.success('增加标签成功')
      }
      await this.loadingList()
      this.$emit('update:visible', false)
    },
    // 退出
    async handleClose () {
      this.$emit('update:visible', false)
      this.$refs.diaLogForm.clearValidate('tagName')
    },
    // 获取input下拉内容
    async loadingSubjects () {
      const { data } = await subjects()
      this.subjectsList = data
    }
  }
}
</script>

<style scoped>
::v-deep .el-dialog {
  width: 400px;
}
::v-deep .elInput {
  width: 280px !important;
  height: 32px !important;
}
</style>
