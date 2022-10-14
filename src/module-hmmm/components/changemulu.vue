<template>
  <div class="container">
    <el-dialog title="修改目录" :visible.sync="dialogVisible" width="30%" :before-close="cancel">
      <el-form ref="form" :model="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属学科" >
            <el-select placeholder="请选择" v-model="row.subjectName" style="width:100%" @change="selecChange">
                <el-option :label="item.label" :value="item"
                v-for="item in addLists"
                :key="item.value">
              </el-option>
              </el-select>
          </el-form-item>
        <el-form-item label="目录名称"  prop="directoryName" :rules="[{required:true,trigger:'blur',message:'请输入目录名称'}]">
          <el-input v-model="row.directoryName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { simple } from '@/api/hmmm/subjects.js'
// import { add } from '@/api/hmmm/directorys.js'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    row: {
      type: [Object, String],
      default: () => ({})
    }
  },
  data () {
    return {
      addLists: [],
      form: {
        directoryName: '',
        subjectID: '',
        id: null
      },
      condition: ''
    }
  },
  created () {
    this.addList()
  },
  methods: {
    async addList () {
      const { data } = await simple()
      this.addLists = data
      // console.log(data)
    },
    selecChange (e) {
      console.log(e.value)
      this.form.subjectID = e.value
    },
    async submit () {
      await this.$refs.form.validate()
      // console.log(123)
      // await add(this.form)
      // this.$parent.getTableList()
      this.cancel()
      // this.$message.success('添加成功')
    },
    cancel () {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style scoped lang='less'></style>
