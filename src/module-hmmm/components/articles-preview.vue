<template>
  <div>
    <el-dialog
      title="预览文章"
      :visible="showVisible"
      width="800px"
      @close='handleClose()'
    >
      <div class="title">
        <h2>{{currentData.title}}</h2>
        <div style="margin-top:10px;">
          <span>{{handleTime(currentData.creteTime).format('YYYY-MM-DD HH:mm:ss')}} &nbsp; </span>
          <span> {{currentData.username}} &nbsp; </span>
          <span class="el-icon-view">&nbsp; {{ currentData.visits }}</span>
          <span></span>
        </div>
      </div>
      <div class="content" v-html="currentData.articleBody"></div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'articlePreview',
  props: {
    showVisible: Boolean,
    currentData: Object
  },
  methods: {
    handleClose () {
      this.$emit('update:showVisible', false)
    },
    handleConfirm () {}
  },
  computed: {
    handleTime () {
      return dayjs
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.title {
  border-bottom: 1px dashed #ccc;
  padding-bottom: 10px;
}
.content {
  background: #f5f5f5;
  padding: 10px;
}
</style>
