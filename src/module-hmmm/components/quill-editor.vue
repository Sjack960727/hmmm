<template>
  <quill-editor
    v-model="articleDetail.articleBody"
    ref="editorRef"
    :options="editorOption"
    @focus="onEditorFocus($event)"
    @blur="onEditorBlur($event)"
    @change="onEditorChange($event)"
    class="editor"
  />
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 定制toolbar
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
  // [{ header: 1 }, { header: 2 }],
  // [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  // [{ indent: '-1' }, { indent: '+1' }],
  // [{ size: [] }], // 配置字号
  // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  // [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  // [{ font: [] }], // 显示字体选择
  // [{ align: [] }], // 对齐方式-----[{ align: [] }]
  // ['clean'], // 清除文本格式-----['clean']
  ['image', 'link'] // 链接、图片、视频-----['link', 'image', 'video']
]
export default {
  name: 'TestQuillEditor',
  components: { quillEditor },
  props: {
    articleDetail: Object
  },
  data () {
    return {
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: '请输入内容'
      }
    }
  },
  computed: {
    // 当前富文本实例
    editor () {
      return this.$refs.editorRef.quillEditor
    }
  },
  methods: {
    // 准备富文本编辑器
    onEditorReady () {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur () {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus () {},
    // 富文本编辑器 内容改变事件
    onEditorChange ({ html }) {
      // this.$emit('update:articleDetile', html)
      // 内容改变事件
      // console.log('内容改变事件');
    }
  }
}
</script>
<style scoped>
::v-deep .ql-editor {
  height: 200px;
}
</style>
