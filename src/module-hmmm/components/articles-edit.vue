<template>
  <div>
    <el-dialog
      title="修改文章"
      :visible="editDialog"
      width="800px"
      @close='handleClose()'
    >
      <el-form ref="form" :model="newCurrentData" label-width="80px" :rules="rules">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="newCurrentData.title"></el-input>
        </el-form-item>

        <el-form-item label="文章内容">
          <!-- <el-input v-model="form.name"></el-input> -->
            <quillEditor>

            </quillEditor>
        </el-form-item>

        <el-form-item label="视频地址">
          <el-input v-model="newCurrentData.videoURL"></el-input>
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
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor
  },
  props: {
    editDialog: Boolean,
    currentData: Object
  },
  data () {
    return {
      newCurrentData: {},
      rules: {
        title: [
          { required: true, message: '请输入内容' }
        ]
      }
    }
  },
  // 因为如果直接使用父组件传过来的值的话会直接造成 在编辑的同时直接修改页面的值 所以用浅拷贝
  watch: {
    currentData () {
      this.newCurrentData = { ...this.currentData }
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:editDialog', false)
      this.$refs.form.clearValidate('title')
    },
    handleConfirm () {}
  }
}
</script>

<style>
</style>
