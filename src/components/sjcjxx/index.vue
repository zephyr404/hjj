<template>
  <div class="wrapper" style="text-align: left">
    <el-row :gutter="20">
      <el-col
        v-if="pageData.maps && pageData.maps.length > 0"
        :span="pageData != '' ? 4 : 0"
      >
        <div class="grid-content bg-purple">
          <p style="text-align: center">{{ pageData.title }}</p>
          <el-table
            size="small"
            border
            highlight-current-row
            :show-header="false"
            :data="pageData.maps"
            @current-change="handleCurrentChange"
            style="width: 100%"
            :cell-style="cellStyle"
          >
            <el-table-column :prop="pageData.show"></el-table-column>
          </el-table>
        </div>

        <el-pagination
          small
          layout="prev, pager, next"
          :total="pageData.total"
          @current-change="currentPageChange"
          @prev-click="prevPage"
          @next-click="nextPage"
          style="margin-top: 1rem"
        ></el-pagination>
      </el-col>

      <el-col :span="pageData != '' ? 20 : 24" style="margin-top: 10px">
        <div class="grid-content bg-purple">
          <!-- btn group begin -->
          <div class="btn-group" style="text-align: left">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-plus"
              @click="addDialogVisible = true"
              v-if="
                $store.getters.tabInner === '002.001.001.001.001' ||
                data.isModel == true ||
                pageData
              "
              >新增</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-edit"
              v-if="data.isModel == false"
              @click="editDialogVisible = true"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-delete"
              v-if="data.isModel == false"
              @click="handleCloseDeleteDialog(currentBd)"
              >删除</el-button
            >
          </div>
          <!-- btn group begin -->

          <!-- parent begin -->
          <div
            v-if="
              data == '' ||
              (data != '' && data.isModel === true) ||
              (pageData != '' && pageData.maps.length === 0)
            "
            class="grid-content bg-purple"
          >
            <el-row>
              <el-col :span="24">
                <el-card class="box-card" shadow="never">
                  <div
                    class="grid-content bg-purple-dark"
                    style="text-align: center"
                  >
                    <i
                      class="el-icon-warning-outline"
                      style="color: #ddd; font-size: 60px"
                    ></i>
                    <p>无数据，请新增</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <div v-else>
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>{{ data.tableName }}</span>
              </div>

              <el-form label-position="right" :label-width="labelWidth">
                <el-row :gutter="20">
                  <el-col
                    :span="span"
                    v-for="(item, index) of data.fields"
                    :key="index"
                    :name="item.field"
                  >
                    <el-form-item
                      :label="isNm(item)"
                      v-if="item.field !== 'bdnm'"
                    >
                      <el-input
                        v-if="item.fieldType.includes('Date')"
                        :placeholder="
                          item.fieldValue == 'null'
                            ? ''
                            : dateParse(item.fieldValue)
                        "
                        disabled
                      ></el-input>

                      <div v-else>
                        <!-- 特殊的input -->
                        <el-link
                          v-if="item.field === 'lsyg'"
                          type="primary"
                          style="line-height: 1"
                          :underline="true"
                          :href="`${$axios.defaults.baseURL}${item.fieldValue}`"
                          >下载文件</el-link
                        >

                        <el-input
                          v-else
                          :placeholder="
                            item.fieldValue == 'null' ? '' : item.fieldValue
                          "
                          disabled
                        ></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
            <!-- parent end -->

            <!-- child begin -->
            <el-tabs
              v-if="data.tables && data.tables.length > 0"
              type="border-card"
              style="margin-top: 10px"
              v-model="activeTabName"
            >
              <el-tab-pane
                v-for="(item, index) in data.tables"
                :key="index"
                :name="
                  item.tableName
                    ? item.tableName
                    : Array.isArray(item) && item[0].tableName
                    ? item[0].tableName
                    : ''
                "
                :label="
                  item.tableName
                    ? item.tableName
                    : Array.isArray(item) && item[0].tableName
                    ? item[0].tableName
                    : ''
                "
              >
                <!-- table begin -->
                <div v-if="Array.isArray(item)">
                  <tab-inner-table
                    :item="item"
                    :showIndex="true"
                    :showSelect="false"
                    :showDelete="false"
                  ></tab-inner-table>
                </div>
                <!-- table end -->

                <div v-else>
                  <el-form label-position="right" :label-width="labelWidth">
                    <el-row :gutter="20">
                      <el-col
                        :span="span"
                        v-for="(item2, index2) of item.fields"
                        :key="index2"
                      >
                        <el-form-item
                          :label="`${isNm(item2)}`"
                          v-if="item2.field !== 'bdnm'"
                        >
                          <el-input
                            v-if="item2.fieldType.includes('Date')"
                            :placeholder="
                              item2.fieldValue == 'null'
                                ? ''
                                : dateParse(item2.fieldValue)
                            "
                            disabled
                          ></el-input>
                          <el-input
                            v-else
                            :placeholder="
                              item2.fieldValue == 'null' ? '' : item2.fieldValue
                            "
                            disabled
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-tab-pane>
            </el-tabs>
            <!-- child end -->
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- add dialog begin -->
    <el-dialog
      title="新增"
      :visible.sync="addDialogVisible"
      width="80%"
      style="text-align: left"
      :destroy-on-close="true"
    >
      <add-dialog
        :pkey="key"
        :skey="skey"
        :data="JSON.parse(JSON.stringify(data))"
        @closeDialog="handleCloseDialog"
        @setTempData="setTempData"
      ></add-dialog>
    </el-dialog>

    <el-dialog
      title="修改"
      :visible.sync="editDialogVisible"
      width="80%"
      style="text-align: left"
      :destroy-on-close="true"
    >
      <edit-dialog
        :pkey="key"
        :skey="skey"
        :data="JSON.parse(JSON.stringify(data))"
        @closeDialog="handleCloseDialog"
      ></edit-dialog>
    </el-dialog>
    <!-- add dialog end -->
  </div>
</template>

<script>
import {
  isNm,
  refresh,
  isSelect,
  getSelectUrl,
  getRequestUrl,
  dateParse,
  findObj,
  generateDeleteData,
} from "@/utils/common";
import addDialog from "./add-dialog.vue";
import editDialog from "./edit-dialog.vue";
import tabInnerTable from "./table.vue";

export default {
  name: "detail",
  components: { addDialog, editDialog, tabInnerTable },
  data() {
    return {
      key: "sjcjxx",
      skey: "",
      span: 12,
      labelWidth: "200px",
      pages: "",
      pageData: "",
      data: "",
      currentBd: "",
      activeTabName: "",
      addDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      form: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      cellStyle: {
        "text-align": "center",
      },
    };
  },
  methods: {
    isNm,
    refresh,
    isSelect,
    dateParse,
    getRequestUrl,
    getSelectUrl,
    findObj,
    generateDeleteData,

    // 获取页面源数据
    getData() {
      this.$http
        .get(
          this.$api[this.key].hasPage
            ? this.$api[this.key].url + "Page"
            : this.$api[this.key].url,
          {
            bdnm: JSON.parse(sessionStorage.getItem("_force")).bdnm,
            currentPage: 1,
            pageSize: 10,
          }
        )
        .then((res) => {
          if (res.data.code === 200) {
            if (this.$api[this.key].hasPage) {
              this.pageData = res.data.data;
              // 默认第一条
              this.setDefaultPageData();
            } else {
              this.$store.commit("SET_TABDATA", res.data.data);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },

    // 获取分页
    handleGetPage(currentPage = 1, pageSize = 10) {
      this.$http
        .get(this.$api[this.key].url + "Page", {
          bdnm: JSON.parse(sessionStorage.getItem("_force")).bdnm,
          currentPage,
          pageSize,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.pageData = res.data.data;
            // 默认第一条
            this.setDefaultPageData();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },

    // 获取下拉列表
    handleGetSelect() {
      if (this.skey) {
        this.$http
          .get(this.$api[this.skey].url)
          .then((res) => {
            this.$store.commit("SET_SELECTS", res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // 修改当前分页
    currentPageChange(val) {
      this.handleGetPage(val);
    },

    prevPage(val) {
      this.handleGetPage(val);
    },

    nextPage(val) {
      this.handleGetPage(val);
    },

    setTempData(temp) {
      this.data = temp;
    },

    // 默认第一条或者模板
    setDefaultPageData() {
      try {
        if (this.pageData.maps && this.pageData.maps.length > 0) {
          this.handleCurrentChange(this.pageData.maps[0]);
        } else {
          this.$http
            .get(this.$api[this.key].url, {
              bdnm: JSON.parse(sessionStorage.getItem("_force")).bdnm,
              currentPage: 1,
              pageSize: 10,
            })
            .then((res) => {
              this.data = res.data.data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (err) {
        console.log(err);
        this.$message.info("无数据");
      }
    },

    // 点击page item
    handleCurrentChange(val) {
      this.$http
        .get(this.$api[this.key].url, val)
        .then((res) => {
          if (res.data.code === 200) {
            this.$store.commit("SET_TABDATA", res.data.data);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },

    // 关闭删除确认框
    handleCloseDeleteDialog(_bd) {
      this.$confirm("确认删除？")
        .then((_) => {
          this.$http
            .delete(this.$api[this.key].url, this.generateDeleteData(this.data))
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success("删除成功");
                this.refresh();
              } else {
                this.$message.error(`${res.data.message}`);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error(`删除失败`);
            });
        })
        .catch((_) => {
          console.log("err:" + _);
        });
    },

    // 左侧node点击事件
    handleNodeClick(data) {
      // console.log(data);
    },

    handleCloseDialog(val, status) {
      this[`${val}DialogVisible`] = false;
      if (status === 1) {
        this.refresh();
      }
    },

    // 生成左边树
    handleGenerateTree(arr, filed) {
      const res = new Map();
      const top = arr.filter(
        (item) => !res.has(item[filed]) && res.set(item[filed], 1)
      );
      for (let i in top) {
        top[i].label = top[i].zb;
        top[i].child = [];
      }
      const child = arr.forEach((item) => {
        if (item.twsj) {
          top.forEach((item2) => {
            let _arr = [];
            if (item.zbnm === item2.zbnm) {
              _arr.push(item);
            }
          });
        }
      });
      return top;
    },

    // 设置默认tab
    handleSetDefaultTab() {
      if (this.data.tables && this.data.tables.length > 0) {
        this.activeTabName = this.data.tables[0].tableName;
      }
    },
  },
  computed: {
    loaded() {
      return this.$store.state.app.loaded;
    },
    tabData() {
      return this.$store.state.app.tabData;
    },
  },
  created() {
    this.getData();
    this.handleGetSelect();
  },
  mounted() {},
  watch: {
    tabData: {
      deep: true,
      handler(val) {
        this.data = val;
        this.handleSetDefaultTab();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-group {
  margin-bottom: 10px;
}

.require:before {
  content: "*";
  color: red;
}

.nowrap {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
