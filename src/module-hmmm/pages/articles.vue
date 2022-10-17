<template>
  <div class='container'>
    <el-card>
      <!-- 搜索/新增/总条数灰色提示栏目组件 -->
      <tags-headers :totalCount='listData.counts'>
        <!-- 添加按钮 -->
        <template #addBtn>
          <el-button class="addBtn" type="primary" icon="el-icon-edit" @click="addArticle">新增技巧</el-button>
        </template>
        <!-- 左侧文字 -->
        <template #label>
            <span>关键字</span>
        </template>
        <!-- 关键字搜索框 -->
        <template #sarchInput>
          <el-input class="elInput" v-model="searchList.keyword"  placeholder="请输入名称"></el-input>
        </template>
        <!-- 下拉框 -->
        <template #selectIput>
          <el-select class="elSelect" v-model="searchList.state" placeholder="请选择">
            <el-option
              v-for="(item, index) in status" :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <!-- 清除按钮 -->
        <template #ClearAndSearch>
          <el-button class="elBtn" size="small" @click="clearData">清除</el-button>
          <el-button class="elBtn" size="small" @click="searchBtn" type="primary">搜索</el-button>
        </template>
      </tags-headers>

      <!-- 表单 -->
      <el-table
        v-loading='loading'
        :data='listData.items'
        style="width: 100%"
        >
        <!--序号列  -->
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <!-- 文章标题列 -->
        <el-table-column
          label="文章标题"
          width="400"
        >
          <template slot-scope="{row}">
              <span>{{row.title}}</span>
              <i v-show="row.videoURL" class="el-icon-film" @click="showVideo(row)"></i>
          </template>
        </el-table-column>
        <!-- 阅读数列 -->
        <el-table-column
          prop="visits"
          label="阅读数"
        />
        <!-- 录入人列 -->
        <el-table-column
          prop="username"
          label="录入人"
        />
        <!-- 录入时间列 -->
        <el-table-column
          prop="creteTime"
          label="录入时间"
        >
          <template slot-scope="{row}">
            <span>{{handleDate(row.addDate).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <!--状态列 -->
        <el-table-column
          prop="state"
          label="状态"
          width="100"
        >
          <template slot-scope="{row}">
              {{row.state ? '已启用' : '已禁用'}}
          </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column
          label="操作"
          width="180"
          >
          <template slot-scope="{row}">
            <!-- 预览 -->
            <el-button
              class="elButton"
              type="text"
              @click="preview(row)"
            >
              预览
            </el-button>
            <!-- 禁用/启用 -->
            <el-button
              class="elButton"
              type="text"
              @click="active(row)"
            >
              {{ row.state ? '禁用' : '启用' }}
            </el-button>
            <!-- 修改 -->
            <el-button
              class="elButton"
              type="text"
              :class="{ 'activeBtn':row.state }"
              :disabled='row.state ? true : false'
              @click="handleEdit(row)"
              >
              修改
            </el-button>
            <!-- 删除 -->
            <el-button
              class="elButton"
              type="text"
              :class="{ 'activeBtn':row.state }"
              :disabled='row.state ? true : false'
              @click="deletData(row)"
            >
             删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部分页 -->
      <paging
        :loadingList='loadListData'
        :page='page'
        :total="listData.counts"
      >
      </paging>
    </el-card>

    <!-- 预览框 -->
    <preview-dialog
      :showVisible.sync='showVisible'
      :currentData='currentData'
    />

    <!-- 修改组件 -->
    <articles-edit  ref='editForm' :editDialog.sync='editDialog' :currentData='currentData' />

    <!-- 视频 -->
    <div class="vide-preview" v-if="isVideo" @click="isVideo = false">
      <div class="close" @click="isVideo = false">
        <i class="el-icon-close"></i>
      </div>
      <div class="box">
        <video
          loop
          v-errorUrl='defaultURL'
          autoplay
          controls
          pixels
          class="isVideo"
          :src="newVideoURL"
        >
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import tagsHeaders from '../components/tags-headers.vue'
import previewDialog from '../components/articles-preview.vue'
import articlesEdit from '../components/articles-edit.vue'
import paging from '../components/tags-pagination.vue'
import { list, changeState, remove } from '@/api/hmmm/articles'
import dayjs from 'dayjs'
export default {
  name: 'articles',
  components: {
    tagsHeaders,
    previewDialog,
    articlesEdit,
    paging
  },
  data () {
    return {
      defaultURL: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      isVideo: false,
      loading: false,
      showVisible: false,
      editDialog: false,
      newVideoURL: '',
      page: {
        page: 1,
        pagesize: 10
      },
      searchList: {
        state: '',
        page: 1,
        pagesize: 10,
        keyword: ''
      },
      status: [
        { label: '禁用', value: 0 },
        { label: '启用', value: 1 }
      ],
      listData: [],
      currentData: {}
    }
  },
  created () {
    this.loadListData()
  },
  methods: {
    // 获取列表
    async loadListData () {
      this.loading = true
      const { data } = await list(this.page)
      this.listData = data
      this.loading = false
    },

    // 新增技巧
    async addArticle () {
      this.editDialog = true
      this.$children[2].newCurrentData = {}
    },

    // 清除按钮
    clearData () {
      this.searchList = {}
    },
    // 搜索
    async searchBtn () {
      this.loading = true
      // 关键字输入框和下拉框有字时进入这个条件
      if (this.searchList.keyword !== '' && this.searchList.state !== '') {
        const { data } = await list({
          keyword: this.searchList.keyword,
          page: this.searchList.page,
          pagesize: this.searchList.pagesize,
          state: this.searchList.state
        })
        this.listData = data
      // 状态输入框有字时进入这个条件
      } else if (this.searchList.state !== '') {
        const { data } = await list({
          page: this.searchList.page,
          pagesize: this.searchList.pagesize,
          state: this.searchList.state
        })
        this.listData = data
      // 关键字输入框有字时进入这个条件
      } else if (this.searchList.keyword !== '') {
        const { data } = await list({
          keyword: this.searchList.keyword,
          pagesize: this.searchList.pagesize,
          page: this.searchList.page
        })
        this.listData = data
      } else {
        const { data } = await list(this.page)
        this.listData = data
      }
      this.loading = false
    },

    // 预览
    preview (row) {
      this.showVisible = true
      this.currentData = row
    },

    // 状态(禁用/启用)
    async active (data) {
      data.state = data.state === 1 ? data.state - 1 : data.state + 1
      await changeState(data)
      this.$message.success('操作成功')
    },

    // 修改
    handleEdit (row) {
      this.currentData = row
      this.editDialog = true
      this.$children[2].newCurrentData = { ...row }
    },

    // 删除数据
    async deletData (row) {
      try {
        await this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.loading = true
        await remove(row)
        await this.loadListData()
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.loading = false
      }
    },

    // 展示视频播放
    showVideo ({ videoURL }) {
      this.newVideoURL = videoURL
      this.isVideo = true
    }
  },
  directives: {
    errorUrl: {
      inserted: (el, binding, vnode) => {
        el.onerror = function () {
          el.src = binding.value
        }
      }
    }
  },
  computed: {
    handleDate () {
      return dayjs
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 10px;
}

.addBtn {
  background-color: #66c141;
  width: 97px;
  height: 32px;
  padding: 9px 15px;
  font-size: 12px;
  border-color: transparent;
}

::v-deep .is-leaf {
  background-color: #fafafa !important;
  border-bottom: 2px solid #e8e8e8 !important;
}
.el-icon-film {
  color:#001cfd;
  font-size:18px;
  margin-left: 15px;
}
.vide-preview {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.3);
  overflow: hidden;
  z-index: 9999;
}
.box {
  width: 800px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.isVideo {
  width: 100%;
  height: 100%;
}
.close {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
  background: rgba(0,0,0,.4);
  box-shadow: 0 0 5px rgb(0 0 0 / 40%);
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  z-index: 100;
}
::v-deep .el-icon-close {
  font-size: 20px;
  color: white;
}
</style>
