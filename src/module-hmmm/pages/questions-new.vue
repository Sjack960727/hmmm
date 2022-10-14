<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <span>试题录入</span>
      </div>
      <div>
        <el-form ref="form" :model="formData" :rules="rules"  label-width="80px">

          <el-form-item label="学科" label-width="120px">
            <el-select
              v-model="formData.subjectID"
              placeholder="请选择"
              size="medium"
              style="width: 400px"
              @change="getcatalog(formData.subjectID)"
            >
              <el-option
                v-for="item in subjectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目录" label-width="120px">
            <el-select
              v-model="formData.catalogID"
              placeholder="请选择"
              size="medium"
              style="width: 400px"
            >
              <el-option
                v-for="item in catalogOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业" label-width="120px">
            <el-select
              v-model="value"
              placeholder="请选择"
              size="medium"
              style="width: 400px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" label-width="120px">
            <el-select
              v-model="value1"
              placeholder="请选择"
              style="width: 198px"
            >
              <el-option
                v-for="item in provinces"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>

            <el-select
              v-model="value2"
              style="margin-left: 4px; width: 198px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in citys"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="方向" label-width="120px">
            <el-select
              v-model="value"
              placeholder="请选择"
              size="medium"
              style="width: 400px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型" label-width="120px">
            <div>
              <el-radio-group v-model="radio">
                <el-radio
                  v-for="item in questionType"
                  :key="item.label"
                  :label="item.value"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="难度" label-width="120px">
            <div>
              <el-radio-group v-model="radio">
                <el-radio
                  v-for="item in difficulty"
                  :key="item.label"
                  :label="item.value"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="题干" label-width="120px">
             <quill-editor v-model="quill1" ref="myQuillEditor" :options="editorOption"></quill-editor>
              </el-form-item>

          <el-form-item label="选项单选" label-width="120px">
            <el-radio-group v-model="radio">
              <div>
                <el-radio :label="3">
                  A:
                  <el-input
                    v-model="input"
                    placeholder="请输入内容"
                    style="width: 240px"
                  ></el-input>
                  <el-upload
                    action="#"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-change="onChange"
                    :http-request="onHttpRequest"
                    :limit="1"
                    class="uploadIMG"
                    :before-upload="beforeUpload"
                    ><div class="imgTxt">上传图片</div>
                    <i class="el-icon-circle-close imgIcon"> </i>
                  </el-upload>
                </el-radio>
              </div>
              <el-button type="danger" size="small" disabled>+增加选项与答案</el-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选项多选" label-width="120px"> </el-form-item>

          <el-form-item label="解析视频" label-width="120px">
            <el-input
              v-model="input"
              placeholder="请输入内容"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item label="答案解析" label-width="120px">
             <quill-editor v-model="quill1" ref="myQuillEditor" :options="editorOption" ></quill-editor>
          </el-form-item>
          <el-form-item label="题目备注" label-width="120px">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="textarea"
              style="width: 400px; min-height: 33px"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="试题标签" label-width="120px">
            <el-select
              v-model="value"
              placeholder="请选择"
              size="medium"
              style="width: 400px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-form-item>
          <el-form-item label-width="120px">
            <el-button type="primary">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { provinces, citys } from '@/api/hmmm/citys.js'
import { difficulty, questionType } from '@/api/hmmm/constants.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { simple } from '@/api/hmmm/subjects.js'
import { simple as getcatalog } from '@/api/hmmm/directorys.js'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      provinces: provinces(),
      // citys: citys(),
      difficulty: difficulty,
      questionType: questionType,
      formData: {
        subjectID: '',
        catalogID: '',
        enterpriseID: '',
        province: '',
        city: '',
        direction: ''
      },
      subjectOptions: [],
      catalogOptions: [],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      value1: '',
      value2: '',
      radio: 3,
      textarea: '',
      dialogImageUrl: '',
      fileList: [],
      input: '111',
      quill1: '',
      editorOption: {
        placeholder: '请在这里输入'
      },
      rules: {}
    }
  },
  computed: {
    citys () {
      return citys(this.value1)
    }
  },
  created () {
    this.getsubject()
  },
  methods: {
    async getsubject () {
      const { data } = await simple()
      this.subjectOptions = data
    },
    async getcatalog (id) {
      const data = {
        subjectID: id
      }
      const res = await getcatalog(data)
      this.catalogOptions = res.data
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      // this.dialogImageUrl = file.url

    },
    onChange (file, fileList) {
      // this.fileList = fileList
      //   this.fileList.push(file)
      //   console.log(this.fileList)
    },
    onHttpRequest () {
      console.log(111)
    },
    beforeUpload (file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return false
      // 需改善
      // return new Promise((resolve, reject) => {
      //   reject(file)
      // })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 20px;
  :deep(.ql-editor){
    height: 200px;
  }
  :deep(.uploadIMG) {
    width: 100px;
    height: 60px;
    // overflow: hidden;
    position: relative;
    line-height: 30px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    .el-upload--picture-card {
      width: 100px;
      height: 60px;
      line-height: 60px;
      position: relative;
      .imgIcon {
           position: absolute;
    right: 0;
    top: 0;
    -webkit-transform: translate(50%,-50%);
    transform: translate(50%,-50%);
    background: #fff;
    font-size: 18px;
    color: #999
      }
      .imgTxt {
        color: #333;
      }
    }
    .uploadIMG-icon {
      line-height: 60px;
      text-align: center;
    }
  }
}
</style>
