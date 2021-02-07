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
            <!-- 选择框 -->
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
                clearable
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
            <!-- 选择框 -->

            <!-- 非选择框 -->
            <div v-else>
              <el-form-item
                :prop="item.field"
                v-if="item.field !== 'bdnm'"
                :label="isNm(item)"
                :name="item.field"
              >
                <el-date-picker
                  class="w100"
                  v-if="item.fieldType.indexOf('Date') != -1"
                  v-model="dataCopy.fields[item.field]"
                  @change="
                    handleDateFormat(dataCopy.fields[item.field], item.field)
                  "
                  type="date"
                  placeholder="选择日期"
                  clearable
                >
                </el-date-picker>

                <!-- 文件上传 -->
                <el-upload
                  :show-file-list="false"
                  accept=".doc,.docx"
                  v-else-if="item.fieldType === '[B'"
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
                <!-- 文件上传 -->

                <el-input
                  v-else
                  v-model="dataCopy.fields[item.field]"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
            <!-- 非选择框 -->
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
  isObject,
} from "@/utils/common";

export default {
  name: "editDialog",
  props: ["data", "pkey", "skey"],
  components: {},
  data() {
    return {
      span: 8,
      labelWidth: "150px",
      dataCopy: "",
      activeTabName: "",
      selects: "",
      fileList: [],
      rules: {},
    };
  },
  methods: {
    isNm,
    refresh,
    isSelect,
    isMultiSelect,
    dateParse,
    getSelectUrl,
    getRequestUrl,
    findObj,
    isObject,

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
      this.$emit("closeDialog", "edit", status);
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
    handleSetCascaderProps(data, field) {
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
    },

    // 生成表单的v-model依赖
    handleGenerateForm() {
      try {
        const _obj = {};
        _obj.fields = {};
        _obj.tables = [];

        if (this.data.fields && this.data.fields.length > 0) {
          this.data.fields.forEach((item) => {
            if (item.fieldValue == "null") {
              _obj.fields[`${item.field}`] = "";
            } else {
              if (this.isSelect(this.selects, item.field) != false) {
                if (this.isMultiSelect(this.selects, item.field)) {
                  let r = this.findObj(
                    item.fieldValue,
                    this.selects[item.field]
                  );
                  _obj.fields[`${item.field}`] = r[item.field];
                } else {
                  this.selects[item.field].forEach((item2) => {
                    if (item2.mc === item.fieldValue) {
                      _obj.fields[`${item.field}`] = item2[item.field];
                    }
                  });
                }
              } else {
                _obj.fields[`${item.field}`] = item.fieldValue;
              }
            }
          });
        }

        if (this.data.tables && this.data.tables.length > 0) {
          this.data.tables.forEach((item, index) => {
            let _i = {};

            // 判断item为对象
            if (this.isObject(item)) {
              item.fields.forEach((item) => {
                if (item.fieldValue == "null") {
                  _i[`${item.field}`] = "";
                } else {
                  if (this.isSelect(this.selects, item.field) != false) {
                    if (this.isMultiSelect(this.selects, item.field)) {
                      // 多选
                      let r = this.findObj(
                        item.fieldValue,
                        this.selects[item.field]
                      );
                      _i[`${item.field}`] = r[item.field];
                    } else {
                      // 单选
                      this.selects[item.field].forEach((item2) => {
                        if (item2.mc === item.fieldValue) {
                          _i[`${item.field}`] = item2[item.field];
                        }
                      });
                    }
                  } else {
                    _i[`${item.field}`] = item.fieldValue;
                  }
                }
              });
            }
            _obj.tables.push(_i);
          });
        }
        this.dataCopy = _obj;
      } catch (err) {
        console.log(err);
      }
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

      this.$http
        .put(this.$api[this.pkey].url, this.data)
        .then((res) => {
          if (res.data.code === 200) {
            this.$message.success("修改成功");
            this.handleCloseDialog(1);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          this.$message.error(`修改失败`);
          console.log(err);
        });
    },

    // 设置默认tab
    handleSetDefaultTab() {
      if (this.data.tables && this.data.tables.length > 0) {
        this.activeTabName = this.data.tables[0].tableName;
      }
    },
  },
  computed: {},
  created() {
    this.selects = this.$store.getters.selects;

    this.handleGenerateForm();

    this.handleGenerateRules();
  },
  mounted() {
    this.handleSetDefaultTab();
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