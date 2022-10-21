<template>
  <div>
     <el-table
    ref="multipleTable"
    :data="getlist"
    tooltip-effect="dark"
    style="width: 100%"
   >
    <el-table-column
      type="selection"
      width="400">
    </el-table-column>

    <el-table-column
      prop="title"
      label="用户名"
      width="400">
    </el-table-column>
    <el-table-column
      prop="update_date"
      label="日期"
      sortable
      width="720">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="110"
      filter-placement="bottom-end">
      <template >
         <el-button type="primary" icon="el-icon-edit" circle></el-button>
         <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  props: {
    getlist: {
      type: [Object, Array]
      // required: true
    }
  },
  data () {
    return {
      page: 1, // 当前页数
      pagesize: 10 // 页尺寸
      // 权限组列表

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style>

</style>
