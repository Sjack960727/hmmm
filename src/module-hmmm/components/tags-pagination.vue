<template>
  <div class="block">
    <el-pagination
      class="pagin"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.page"
      :page-size.sync="page.size"
      :page-sizes="[2, 5, 10]"
      layout="prev, pager,  next, sizes, jumper"
      :total="total"
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
      this.page.pagesize = val
      this.loadingList()
    },
    handleCurrentChange () {
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
