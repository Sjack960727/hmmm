<template>
  <div class='container'>
    <el-dialog title="题目预览"
               :visible="dialogVisible"
               width="65%"
               @open='onOpen'
               @close="onClose">
      <el-row>
        <el-col :span="6">
          <span>【题型】{{questionsPreview.questionType|formatterquestionType}}</span>
        </el-col>
        <el-col :span="6">
          <span>【编号】{{questionsPreview.number}}</span>
        </el-col>
        <el-col :span="6">
          <span>【难度】{{questionsPreview.difficulty|formatterDifficulty}}</span>
        </el-col>
        <el-col :span="6">
          <span>【标签】{{questionsPreview.tags}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span>【学科】：{{questionsPreview.subject}}</span>
        </el-col>
        <el-col :span="6">
          <span>【目录】：{{questionsPreview.catalogID}}</span>
        </el-col>
        <el-col :span="6">
          <span>【方向】：{{questionsPreview.direction}}</span>
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>
      <hr>
      <div style="padding: 10px 0;">【题干】：<p style="color: blue;">{{questionsPreview.question|formatterquestion}}</p>
      </div>
      <div v-if="+questionsPreview.questionType!==3">{{questionsPreview.questionType|formatterquestionType}}题 选项：（以下选中的选项为正确答案）</div>
      <!-- 单选 -->
      <div v-if="+questionsPreview.questionType===1"
           style="padding: 10px 0;">123456
        <p v-for="item in questionsPreview.options"
           :key="item.id">
          <el-radio v-model="radio"
                    :label="item.isRight"
                    style="padding: 5px 0;"
                    @change="radio=1">{{item.title}}</el-radio>
        </p>

      </div>
      <!-- 多选 -->
      <div v-else-if="+questionsPreview.questionType===2">
        <p v-for="item in questionsPreview.options"
           :key="item.id">
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item.isRight"
                         @change="checkList=[1]">{{item.title}}</el-checkbox>
          </el-checkbox-group>
        </p>
      </div>
      <hr>
      <div style="padding: 10px 0;">【参考答案】：
        <el-button type="danger"
                   @click="videoIsShow=true">视频答案预览</el-button>
        <div style="padding: 10px 0;width: 400px; height: 300px;"
             v-if="videoIsShow">
          <video :controls="videoIsShow"
                 style="width: 100%; height: 100%"
                 :src="questionsPreview.videoURL"></video>
        </div>
      </div>
      <hr>
      <div style="padding: 10px 0;">【答案解析】：{{questionsPreview.answer|formatterquestion}}</div>
      <hr>
      <div style="padding: 10px 0;">【题目备注】：{{questionsPreview.remarks}}</div>
      <hr>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="onClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { detail } from '@/api/hmmm/questions.js'
export default {
  name: 'questionsPreview',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      questionsPreview: {},
      radio: 1,
      checkList: [1],
      videoIsShow: false
    }
  },
  methods: {
    onClose () {
      // this.questionsPreview = {}
      this.videoIsShow = false
      this.$emit('update:dialogVisible', false)
    },
    async onOpen () {
      const { data } = await detail({ id: this.questionsPreview.id })
      this.questionsPreview = data
      console.log(data)
    }
  }
}
</script>

<style scoped lang='less'>
.el-row {
  padding: 10px 0;
}
</style>
