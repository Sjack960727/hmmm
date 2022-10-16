<template>
  <div class="block">
    <el-pagination
      class="pagin"
      background
      :total="total"
      :current-page.sync="page.page"
      :page-size.sync="page.size"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 5, 10]"
      layout="prev, pager,  next, sizes, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'page',
  props: {
    page: Object,
    total: Number,
    loadingList: Function
  },
  data () {
    return {
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(val)
      this.page.pagesize = val
      this.loadingList()
    },
    handleCurrentChange (val) {
      console.log(val)
      this.loadingList()
    }
  }
}
</script>

<style scoped>
.pagin {
  margin-top: 20px;
  text-align: right;
}
</style>
