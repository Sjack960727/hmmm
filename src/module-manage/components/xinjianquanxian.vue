<template>
  <div>
    <el-tree
  @check='dianji'
  :data='xinzenshuj'
  :props="props"
  show-checkbox
  >
</el-tree>
  </div>
</template>

<script>
export default {
  props: {
    xinzenshuju: {
      type: [Object, Array]
    }
  },
  data () {
    return {
      xuanzhong: [],
      props: {
        label: 'title',
        children: 'childs'
      },
      count: 1,
      xinzenshuj: [{
        childs: this.xinzenshuju,
        title: '系统菜单和页面权限点'

      }]
    }
  },
  methods: {
    dianji (data, er) {
      this.$emit('changMessage', er.checkedNodes)
    }
  }
}
</script>

<style>

</style>
