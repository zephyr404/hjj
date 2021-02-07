<template>
  <div class="wrapper">
    <!-- 父级 begin -->
    <el-card
      class="box-card"
      shadow="never"
      v-if="data.fields && data.fields.length > 0"
    >
      <div slot="header" class="clearfix">
        <span>{{ data.tableName }}</span>
      </div>

      <el-form
        :model="dataCopy.fields"
        :rules="rules"
        ref="ruleForm"
        label-position="right"
        :label-width="labelWidth"
      >
        <el-row :gutter="20">
          <el-col
            :span="span"
            v-for="(item, index) in data.fields"
            :key="index"
          >
            <el-form-item
              :prop="item.field"
              v-if="isSelect(selects, item.field)"
              :label="isNm(item)"
              :name="item.field"
            >
              <el-select
                class="w100"
                v-if="!isMultiSelect(selects, item.field)"
                v-model="dataCopy.fields[item.field]"
              >
                <el-option
                  v-for="_item in isSelect(selects, item.field)"
                  :key="_item[`${item.field}`]"
                  :label="_item.mc"
                  :value="_item[`${item.field}`]"
                ></el-option>
              </el-select>

              <el-cascader
                class="w100"
                v-else
                v-model="dataCopy.fields[item.field]"
                :show-all-levels="false"
                :options="isSelect(selects, item.field)"
                :props="
                  handleSetCascaderProps(
                    isSelect(selects, item.field),
                    item.field
                  )
                "
                clearable
              ></el-cascader>
            </el-form-item>

            <div v-else>
              <el-form-item
                :prop="item.field"
                v-if="item.field == 'lsyg'"
                :label="isNm(item)"
                :name="item.field"
              >
                <el-upload
                  :show-file-list="false"
                  accept=".doc,.docx"
                  class="upload-demo"
                  :action="$axios.defaults.baseURL + $api.fileUpload.url"
                  :on-change="handleFileChange"
                  :on-success="onFileUploadSuccess"
                  :on-error="onFileUploadFaild"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary"
                    >文件上传(doc/docx)</el-button
                  >
                </el-upload>
              </el-form-item>

              <el-form-item
                :prop="item.field"
                v-else-if="item.field !== 'bdnm'"
                :label="isNm(item)"
                :name="item.field"
              >
                <el-date-picker
                  style="width: 100%"
                  v-if="item.fieldType.indexOf('Date') != -1"
                  v-model="dataCopy.fields[item.field]"
                  @change="
                    handleDateFormat(dataCopy.fields[item.field], item.field)
                  "
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>

                <el-cascader
                  class="w100"
                  v-else-if="item.field === 'gldwnm'"
                  v-model="dataCopy.fields[item.field]"
                  :show-all-levels="false"
                  :options="$store.getters.origin.troops.children"
                  :props="
                    handleSetCascaderProps(
                      $store.getters.origin.troops.children,
                      item.field,
                      'zbbz'
                    )
                  "
                  clearable
                ></el-cascader>

                <el-cascader
                  class="w100"
                  v-else-if="item.field === 'lsdwnm'"
                  v-model="dataCopy.fields[item.field]"
                  :show-all-levels="false"
                  :options="$store.getters.origin.troops.children"
                  :props="
                    handleSetCascaderProps(
                      $store.getters.origin.troops.children,
                      item.field,
                      'zbbz'
                    )
                  "
                  clearable
                ></el-cascader>

                <el-input
                  v-else
                  v-model="dataCopy.fields[item.field]"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 父级 end -->

    <!-- 子级 begin -->
    <el-tabs
      type="border-card"
      style="margin: 10px 0"
      v-model="activeTabName"
      v-if="data.tables && data.tables.length > 0"
    >
      <el-tab-pane
        v-for="(item, index) in data.tables"
        :key="index"
        :name="item.tableName"
        :label="item.tableName"
      >
        <el-form
          :model="dataCopy.tables[index]"
          :rules="rules"
          ref="ruleForm"
          label-position="right"
          :label-width="labelWidth"
        >
          <el-row :gutter="20">
            <el-col
              :span="span"
              v-for="(item2, index2) in item.fields"
              :key="index2"
            >
              <div v-if="!isSelect(selects, item2.field)">
                <el-form-item
                  :prop="item2.field"
                  v-if="item2.field !== 'bdnm'"
                  :label="isNm(item2)"
                  :name="item2.field"
                >
                  <el-date-picker
                    class="w100"
                    v-if="item2.fieldType.indexOf('Date') != -1"
                    v-model="dataCopy.tables[index][item2.field]"
                    @change="
                      handleDateFormat(
                        dataCopy.tables[index][item2.field],
                        item2.field,
                        index
                      )
                    "
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>

                  <el-input
                    v-else
                    v-model="dataCopy.tables[index][item2.field]"
                  ></el-input>
                </el-form-item>
              </div>

              <el-form-item
                :prop="item2.field"
                v-else
                :label="isNm(item2)"
                :name="item2.field"
              >
                <!-- 导弹型号 -->
                <div v-if="item2.field === 'ddxhnm'">
                  <el-select
                    class="w100"
                    v-model="dataCopy.tables[index][item2.field]"
                  >
                    <el-option
                      v-for="_item2 in isSelect(selects, item2.field)"
                      :key="_item2[`${item2.field}`]"
                      :label="_item2.qc"
                      :value="_item2[`${item2.field}`]"
                    ></el-option>
                  </el-select>
                </div>
                <!-- 导弹型号 -->

                <div v-else>
                  <el-select
                    class="w100"
                    v-if="!isMultiSelect(selects, item2.field)"
                    v-model="dataCopy.tables[index][item2.field]"
                  >
                    <el-option
                      v-for="_item2 in isSelect(selects, item2.field)"
                      :key="_item2[`${item2.field}`]"
                      :label="_item2.mc"
                      :value="_item2[`${item2.field}`]"
                    ></el-option>
                  </el-select>

                  <el-cascader
                    class="w100"
                    v-else
                    v-model="dataCopy.tables[index][item2.field]"
                    :show-all-levels="false"
                    :options="isSelect(selects, item2.field)"
                    :props="
                      handleSetCascaderProps(
                        isSelect(selects, item2.field),
                        item2.field
                      )
                    "
                    clearable
                  ></el-cascader>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 子级 end -->

    <div class="btns-add-dialog">
      <el-button @click="handleCloseDialog()">取 消</el-button>
      <el-button
        type="primary"
        @click.stop="handleOnSubmit($store.getters.tabInner)"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  isNm,
  refresh,
  isSelect,
  isMultiSelect,
  dateParse,
  getSelectUrl,
  getRequestUrl,
  findObj,
} from "@/utils/common";

export default {
  name: "addDialog",
  props: ["data", "pkey", "skey", "zbSelects"],
  components: {},
  data() {
    return {
      span: 8,
      labelWidth: "150px",
      dataCopy: "",
      activeTabName: "",
      selects: "",
      fileList: [],
      fileResponse: "",
      rules: {},
    };
  },
  methods: {
    isNm,
    refresh,
    isSelect,
    isMultiSelect,
    dateParse,
    getRequestUrl,
    findObj,

    // 文件上传成功
    onFileUploadSuccess(res, file, fileList) {
      console.log(res.data);
      this.data.key = res.data;
      this.$message.success("文件上传成功");
    },

    // 文件变化
    handleFileChange() {},

    // 文件上传失败
    onFileUploadFaild(res, file, fileList) {
      this.$message.error("文件上传失败");
    },

    // 关闭dialog
    handleCloseDialog(status) {
      this.$emit("closeDialog", "add", status);
    },

    // 日期格式转换
    handleDateFormat(value, field, index) {
      if (index != undefined) {
        this.dataCopy.tables[index][field] = new Date(String(value)).getTime();
      } else {
        this.dataCopy.fields[field] = new Date(String(value)).getTime();
      }
    },

    // 生成多选Cascader组件的props
    handleSetCascaderProps(data, field, type) {
      if (type === "zbbz") {
        try {
          let props = {
            value: `bdnm`,
            label: `label`,
            children: `children`,
            emitPath: false,
          };
          return props;
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          let props = {
            value: `${field}`,
            label: "mc",
            children: "children",
            emitPath: false,
          };
          return props;
        } catch (err) {
          console.log(err);
        }
      }
    },

    // 生成表单的v-model依赖
    handleGenerateForm() {
      const _obj = {};

      _obj.fields = {};
      _obj.tables = [];

      if (this.data.fields && this.data.fields.length > 0) {
        this.data.fields.forEach((item) => {
          _obj.fields[`${item.field}`] = "";
        });
      }

      if (this.data.tables && this.data.tables.length > 0) {
        this.data.tables.forEach((item, index) => {
          let _i = {};
          item.fields.forEach((item) => {
            _i[`${item.field}`] = "";
          });
          _obj.tables.push(_i);
        });
      }

      this.dataCopy = _obj;
    },

    // 生成验证规则
    handleGenerateRules() {
      if (this.data.fields && this.data.fields.length > 0) {
        this.data.fields.forEach((item) => {
          if (item.require === "1") {
            let _arr = [];
            _arr.push({
              required: true,
              message: "必填项",
              trigger: "blur",
            });
            this.rules[`${item.field}`] = _arr;
          }
        });
      }

      if (this.data.tables && this.data.tables.length > 0) {
        this.data.tables.forEach((item, index) => {
          item.fields.forEach((item2, index2) => {
            for (let i in this.dataCopy.tables[index]) {
              if (item2.require === "1") {
                let _arr = [];
                _arr.push({
                  required: true,
                  message: "必填项",
                  trigger: "blur",
                });
                this.rules[`${item2.field}`] = _arr;
              }
            }
          });
        });
      }
    },

    // 提交表单
    handleOnSubmit(nm) {
      if (this.data.fields && this.data.fields.length > 0) {
        this.data.fields.forEach((item) => {
          for (let i in this.dataCopy.fields) {
            if (item.field === i) {
              item.fieldValue = this.dataCopy.fields[i];
            }
            // 手动添加部队内码
            if (item.field == "bdnm") {
              item.fieldValue = JSON.parse(
                sessionStorage.getItem("_force")
              ).bdnm;
            }
          }
        });
      }

      if (this.data.tables && this.data.tables.length > 0) {
        this.data.tables.forEach((item, index) => {
          item.fields.forEach((item2, index2) => {
            for (let i in this.dataCopy.tables[index]) {
              if (item2.field === i) {
                item2.fieldValue = this.dataCopy.tables[index][i];
              }
            }
          });
        });
      }

      // 正式提交
      this.$http
        .post(this.$api[this.pkey].url, this.data)
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success("新增成功");
            this.handleCloseDialog(1);
          } else {
            this.$message.error(`新增失败`);
          }
        })
        .catch((err) => {
          this.$message.error(`新增失败`);
          console.log(err);
        });
    },

    // 设置默认tab
    handleSetDefaultTab() {
      if (this.data.tables && this.data.tables.length > 0) {
        this.activeTabName = this.data.tables[0].tableName;
      }
    },

    // 如果pageData为空就请求新增模板
    getTemp() {
      if (this.data === "") {
        this.$http
          .get(this.$api[this.pkey].url, {
            bdnm: JSON.parse(sessionStorage.getItem("_force")).bdnm,
            currentPage: 1,
            pageSize: 10,
          })
          .then((res) => {
            this.$emit("setTempData", res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  computed: {},
  created() {
    this.selects = this.$store.getters.selects;

    for (let i in this.zbSelects) {
      if (this.zbSelects[i] != null) {
        Object.assign(this.selects, this.zbSelects[i]);
      }
    }

    this.handleGenerateForm();

    this.handleGenerateRules();
  },
  mounted() {
    this.handleSetDefaultTab();

    this.getTemp();
  },
  watch: {},
};
</script>

<style>
.btns-add-dialog {
  text-align: right;
  margin-top: 30px;
}

.required:before {
  content: "*";
  color: red;
}

.w100 {
  width: 100% !important;
}
</style>