<template>
  <div class='container'>
    <el-card class="box-card">
      <el-row>
        <el-col :span="22"> <span>说明：目前支持学科和关键字条件筛选</span></el-col>
        <el-col :span="2">
          <el-button type="success"
                     icon="el-icon-edit"
                     @click="addQuestions">新增试题</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    addQuestions () {

    }
  }
}
</script>

<style scoped lang='less'>
.box-card {
  margin: 10px 10px;
}
</style>
