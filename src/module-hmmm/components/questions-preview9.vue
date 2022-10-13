<template>
  <div class="container">
    <el-dialog
      title="题目预览"
      :visible="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div>
        <el-row>
          <el-col :span="6" style="padding: 0 10px; height: 36px"
            ><div>
              【题型】：{{ questionDetail.questionType | formatQuestionType }}
            </div></el-col
          >
          <el-col :span="6" style="padding: 0 10px; height: 36px"
            ><div>【编号】：{{ questionDetail.id }}</div></el-col
          >
          <el-col :span="6" style="padding: 0 10px; height: 36px"
            ><div>
              【难度】：{{ questionDetail.difficulty | formatDifficulty }}
            </div></el-col
          >
          <el-col :span="6" style="padding: 0 10px; height: 36px"
            ><div>【标签】：{{ questionDetail.tags }}</div></el-col
          >
          <el-col :span="6" style="padding: 0 10px; height: 36px"
            ><div>【学科】：{{ questionDetail.subjectName }}</div></el-col
          >
          <el-col :span="6" style="padding: 0 10px; height: 36px"
            ><div>【目录】：{{ questionDetail.directoryName }}</div></el-col
          >
          <el-col :span="6" style="padding: 0 10px; height: 36px"
            ><div>【方向】：{{ questionDetail.direction }}</div></el-col
          >
        </el-row>
      </div>
      <hr />
      <div>
        【题干】：
        <div style="color: blue" v-html="questionDetail.question"></div>
        <div v-if="questionDetail.questionType === '1'">
          <div>单选题 选项：（以下选中的选项为正确答案）</div>
          <el-radio-group v-model="radio">
            <div
              v-for="item in questionDetail.options"
              :key="item.id"
              style="padding: 8px 0px"
            >
              <el-radio :label="item.isRight" @change="radio=1">{{item.title}}</el-radio>
            </div>
          </el-radio-group>
        </div>
        <div v-if="questionDetail.questionType === '2'">
          <div>多选题 选项：（以下选中的选项为正确答案）</div>
          <el-checkbox-group v-model="checkList">
            <div v-for="item in questionDetail.options " :key="item.id"  style="padding: 8px 0px">
               <el-checkbox :label="item.title"></el-checkbox>
            </div>
            <!-- <div><el-checkbox v-model="checked">备选项</el-checkbox></div> -->

        </el-checkbox-group>
        </div>
        <div v-if="questionDetail.questionType === '3'">

        </div>
      </div>

      <hr />
      【参考答案】：
      <el-button type="danger" @click="showVideo = true"
        >视频答案预览</el-button
      >
      <div class="video" v-show="showVideo">
        <video controls="controls" :src="questionDetail.videoURL"></video>
      </div>

      <hr />
      <div>
        【答案解析】:
        <div style="display: inline-block" v-html="questionDetail.answer"></div>
      </div>

      <hr />
      【题目备注】: {{ questionDetail.remarks }}

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { questionType, difficulty } from '@/api/hmmm/constants.js'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      questionDetail: {},
      showVideo: false,
      radio: 1,
      checkList: []

    }
  },
  created () {},
  methods: {
    handleClose (done) {
      this.showVideo = false
      this.$emit('update:dialogVisible', false)
    }
  },
  computed: {

  }
}
</script>

<style scoped lang='less'>
.video {
  width: 400px;
  height: 300px;
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
