<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <span>试题录入</span>
      </div>
      <div>
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="学科"> </el-form-item>
          <el-form-item label="学科">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
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
      value: ''
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 20px;
}
</style>
