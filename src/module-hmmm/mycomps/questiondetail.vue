<template>
  <div>
    <el-dialog
      title="题目预览"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
    <el-row style="margin-bottom:20px">
      <el-col :span="6">【题型】:{{detailList.questionType | queType}}</el-col>
      <el-col :span="6">【编号】:{{detailList.id}}</el-col>
      <el-col :span="6">【难度】:{{detailList.difficulty | hard}}</el-col>
      <el-col :span="6">【标签】:{{detailList.tags}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">【学科】:{{detailList.subjectName}}</el-col>
      <el-col :span="6">【目录】:{{detailList.directoryName}}</el-col>
      <el-col :span="6">【方向】:{{detailList.direction}}</el-col>
    </el-row>
    <hr>
    <el-row>
      <div class="main">
      <el-col>【题干】:</el-col>
      <el-col ><span class="mians">{{detailList.question}}</span></el-col>
      <div v-show="isShows">
      <el-col>{{questiontype}} 选项:   (以下选项中为正确答案)</el-col>
      <div v-if="questiontype==='单选'">
        <el-col v-for="item in options" :key="item.id">
        <input type="radio" name="sex" :checked="item.isRight===1">{{item.title}}
      </el-col>
      </div>
      <div v-else>
        <el-col v-for="item in options" :key="item.id">
          <input type="checkbox" name="sex" :checked="item.isRight===1">{{item.title}}
        </el-col>
      </div>
      </div>
    </div>
    </el-row>
    <hr>
    <el-row>
      <el-col>【参考答案】:   <el-button type="danger" @click="viewanswer">视频答案预览</el-button></el-col>
    </el-row>
    <div class="video">
      <video v-show="isShow"
      :src=detailList.videoURL
      controls
      pixels
      class="videos"
      autoplay>
    </video>
    </div>
    <hr>
    <el-row style="line-height:40px">
      <el-col>【答案解析】: {{detailList.answer}}</el-col>
    </el-row>
    <hr>
    <el-row >
      <el-col>【题目备注】: {{detailList.remarks}}</el-col>
    </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { detail } from '@/api/hmmm/questions.js'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      i: '798',
      id: {
        id: ''
      },
      isShow: false,
      isShows: '',
      options: [],
      detailList: {

      }
    }
  },
  computed: {
    questiontype () {
      return this.detailList.questionType === '1' ? '单选' : '多选'
    }

  },
  filters: {
    queType (val) {
      if (val === '1') {
        return '单选题'
      }
      if (val === '2') {
        return '多选题'
      }
      if (val === '3') {
        return '简答题'
      }
    },
    hard (val) {
      if (val === '1') {
        return '简单'
      }
      if (val === '2') {
        return '一般'
      }
      if (val === '3') {
        return '困难'
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('update:dialog-visible', false)
      this.isShow = false
    },
    handleClose () {
      this.cancel()
    },

    async getdetailList () {
      const { data } = await detail(this.id)
      this.detailList = data
      this.detailList.question = this.detailList.question.replace(/<\/?.+?>/g, '')
      this.detailList.answer = this.detailList.answer.replace(/<\/?.+?>/g, '')
      console.log(this.detailList.questionType)
      if (this.detailList.questionType === '3') {
        this.isShows = false
      } else {
        this.isShows = true
      }
      this.options = this.detailList.options
      console.log(this.options)
    },
    viewanswer () {
      this.isShow = true
    }
  }
}
</script>

<style scoped lang="less">
.main {
  .el-col {
    margin-bottom: 10px;
  }
  .video {
    .videos{
      width: 50px;
      height: 50px;
    }
  }
  .mians {
    color: #0000ff;
  }

}
</style>
