<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <span>试题录入</span>
      </div>
      <div>
        <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
          <el-form-item label="学科" label-width="120px" prop="subjectID">
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
          <el-form-item label="目录" label-width="120px" prop="catalogID">
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
          <el-form-item label="企业" label-width="120px" prop="enterpriseID">
            <el-select
              v-model="formData.enterpriseID"
              placeholder="请选择"
              size="medium"
              style="width: 400px"
            >
              <el-option
                v-for="item in enterpriseOptions"
                :key="item.id"
                :label="item.company"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" label-width="120px" prop="province">
            <el-select
              v-model="formData.province"
              placeholder="请选择"
              style="width: 198px"
              @change="formData.city = ''"
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
              v-model="formData.city"
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
          <el-form-item label="方向" label-width="120px" prop="direction">
            <el-select
              v-model="formData.direction"
              placeholder="请选择"
              size="medium"
              style="width: 400px"
            >
              <el-option
                v-for="item in directionOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型" label-width="120px" prop="questionType">
            <div>
              <el-radio-group v-model="formData.questionType">
                <el-radio
                  v-for="item in questionType"
                  :key="item.label"
                  :label="item.value + ''"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="难度" label-width="120px" prop="difficulty">
            <div>
              <el-radio-group v-model="formData.difficulty">
                <el-radio
                  v-for="item in difficulty"
                  :key="item.label"
                  :label="item.value + ''"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="题干" label-width="120px" prop="question">
            <quill-editor
              v-model="formData.question"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange"
            ></quill-editor>
          </el-form-item>
          <!-- 单选 -->
          <el-form-item
            v-if="formData.questionType === '1'"
            label="选项单选"
            label-width="120px"
          >
            <el-radio-group v-model="radio">
              <div v-for="item in singleOptions" :key="item.code">
                <el-radio
                  :label="item.code"
                  class="options"
                  @change="item.isRight=(item.code===radio)"
                >
                  {{ item.code }}:
                  <el-input
                    v-model="item.title"
                    placeholder="请输入内容"
                    style="width: 240px"
                  ></el-input>
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-change="onChange"
                    :http-request="onHttpRequest"
                    :limit="1"
                    class="uploadIMG"
                    :before-upload="beforeUpload"
                    ><div class="imgTxt">上传图片</div>
                  </el-upload>
                  <i class="el-icon-circle-close imgIcon"> </i>
                </el-radio>
              </div>
              <el-button type="danger" size="small" disabled
                >+增加选项与答案</el-button
              >
            </el-radio-group>
          </el-form-item>
          <!-- 多选 -->
          <el-form-item
            v-if="formData.questionType === '2'"
            label="选项多选"
            label-width="120px"
          >
            <el-checkbox-group v-model="checkList" >
              <div v-for="item in mulOptions" :key="item.code">
                <el-checkbox class="options" :label="item.code " @change="item.isRight=checkList.includes(item.code)">
                  {{item.code}} :
                  <el-input
                    v-model="item.title"
                    placeholder="请输入内容"
                    style="width: 240px"

                  ></el-input>
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-change="onChange"
                    :http-request="onHttpRequest"
                    :limit="1"
                    class="uploadIMG"
                    :before-upload="beforeUpload"
                    ><div class="imgTxt">上传图片</div>
                  </el-upload>
                  <i class="el-icon-circle-close imgIcon"> </i>
                </el-checkbox>
              </div>

              <el-button type="danger" size="small" @click="addChoice">+增加选项与答案</el-button>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="解析视频" label-width="120px" >
            <el-input
              v-model="formData.videoURL"
              placeholder="请输入内容"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item label="答案解析" label-width="120px" prop="answer">
            <quill-editor
              v-model="formData.answer"
              ref="myQuillEditor"
              :options="editorOption"
            ></quill-editor>
          </el-form-item>
          <el-form-item label="题目备注" label-width="120px">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="formData.remarks"
              style="width: 400px; min-height: 33px"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="试题标签" label-width="120px">
            <el-select
              v-model="tagsValue"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in tagsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="120px">
            <el-button type="primary" @click="submitQ">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { provinces, citys } from '@/api/hmmm/citys.js'
import { difficulty, questionType, direction } from '@/api/hmmm/constants.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { simple } from '@/api/hmmm/subjects.js'
import { simple as getcatalog } from '@/api/hmmm/directorys.js'
import { simple as gettags } from '@/api/hmmm/tags.js'
import { list } from '@/api/hmmm/companys.js'
import { add, update } from '@/api/hmmm/questions.js'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      formData: {
        subjectID: '',
        catalogID: '',
        enterpriseID: '',
        province: '',
        city: '',
        direction: '',
        questionType: '2',
        difficulty: '1',
        question: '',
        options: [],
        videoURL: '',
        answer: '',
        remarks: '',
        tags: ''
      },
      subjectOptions: [],
      catalogOptions: [],
      enterpriseOptions: [],
      provinces: provinces(),
      directionOptions: direction,
      questionType: questionType,
      difficulty: difficulty,
      tagsOptions: [],
      tagsValue: [],
      singleOptions: [
        {
          code: 'A',
          title: '',
          img: '',
          isRight: false
        },
        {
          code: 'B',
          title: '',
          img: '',
          isRight: false
        },
        {
          code: 'C',
          title: '',
          img: '',
          isRight: false
        },
        {
          code: 'D',
          title: '',
          img: '',
          isRight: false
        }
      ],
      radio: '',
      mulOptions: [
        {
          code: 'A',
          title: '',
          img: '',
          isRight: false
        },
        {
          code: 'B',
          title: '',
          img: '',
          isRight: false
        },
        {
          code: 'C',
          title: '',
          img: '',
          isRight: false
        },
        {
          code: 'D',
          title: '',
          img: '',
          isRight: false
        }
      ],
      checkList: [],
      dialogImageUrl: '',
      fileList: [],
      editorOption: {
        placeholder: '请在这里输入'
      },
      asciiCount: 69,
      rules: {
        subjectID: [{ required: true, message: '请选择学科', trigger: 'change' }],
        catalogID: [{ required: true, message: '请选择目录', trigger: 'change' }],
        enterpriseID: [{ required: true, message: '请选择企业', trigger: 'change' }],
        province: [{ required: true, message: '请选择地区', trigger: 'change' }],
        direction: [{ required: true, message: '请选择方向', trigger: 'change' }],
        questionType: [{ required: true, message: '请选择题型', trigger: 'change' }],
        difficulty: [{ required: true, message: '请选择难度', trigger: 'change' }],
        question: [{ required: true, message: '请输入题干', trigger: 'blur' }],
        answer: [{ required: true, message: '请输入答案解析', trigger: 'blur' }]

      }
    }
  },
  computed: {
    citys () {
      return citys(this.formData.province)
    }
  },
  created () {
    this.getsubject()
    this.getEnterprise()
  },
  methods: {
    async getsubject () {
      const { data } = await simple()
      this.subjectOptions = data
    },
    async getcatalog (id) {
      this.formData.catalogID = ''
      const data = {
        subjectID: id
      }
      const res = await getcatalog(data)
      const res1 = await gettags(data)
      this.catalogOptions = res.data
      this.tagsOptions = res1.data
    },
    async getEnterprise () {
      const res = await list()
      this.enterpriseOptions = res.data.items
    },
    onEditorChange (e) {
      // 富文本编辑器内容改变的事件
      // console.log(this.formData.question)
    },
    // 传图请求
    handleRemove (file, fileList) {},
    handlePictureCardPreview (file) {},
    onChange (file, fileList) {},
    onHttpRequest () {
      // 请求成功回显缩略图
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
      return true
      // 需改善
      // return new Promise((resolve, reject) => {
      //   reject(file)
      // })
    },
    // 增加选项
    addChoice () {
      console.log(String.fromCharCode(this.asciiCount))
      this.asciiCount++
      this.mulOptions.push({
        code: String.fromCharCode(this.asciiCount),
        title: '',
        img: '',
        isRight: false
      })
    },
    // 提交/修改事件  修改事件未写
    async submitQ () {
      await this.$refs.form.validate()
      console.log(111)
      // console.log(this.mulOptions)
      if (this.formData.questionType === '1') {
        this.formData.options = [...this.singleOptions]
      }
      if (this.formData.questionType === '2') {
      }
      this.formData.tags = this.tagsValue.join(',')
      console.log(this.formData)
      const res = await add(this.formData)
      if (res.status === 200) return this.$message.success('试题录入成功')
      console.log(res)
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 20px;
  :deep(.ql-editor) {
    height: 200px;
  }
  :deep(.uploadIMG) {
    width: 100px;
    height: 60px;
    overflow: hidden;
    position: relative;
    line-height: 30px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    .el-upload-list__item {
      width: 100px;
      height: 60px;
    }
    .el-upload--picture-card {
      width: 100px;
      height: 60px;
      line-height: 60px;
      position: relative;
      // .imgIcon {
      //   position: absolute;
      //   right: 0;
      //   top: 0;
      //   -webkit-transform: translate(50%, -50%);
      //   transform: translate(50%, -50%);
      //   background: #fff;
      //   font-size: 18px;
      //   color: #999;
      // }
      .imgTxt {
        color: #333;
      }
    }
    .uploadIMG-icon {
      line-height: 60px;
      text-align: center;
    }
  }
  .options {
    position: relative;
    height: 80px;
  }
  :deep(.imgIcon) {
    position: absolute;
    right: -6px;
    top: -6px;
  }
}
</style>
