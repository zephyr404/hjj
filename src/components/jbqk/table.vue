<template>
  <div>
    <el-button
      v-if="showAdd ? showAdd : false"
      type="primary"
      plain
      size="mini"
      @click="addTableRow"
      >新增</el-button
    >
    <el-button v-if="false" type="primary" plain size="mini">删除</el-button>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showIndex ? showIndex : false"
        type="index"
        width="50"
        align="left"
      >
      </el-table-column>

      <el-table-column v-if="false" type="selection" width="55" align="left">
      </el-table-column>

      <el-table-column
        v-for="(item, index) in this.item[0].fields"
        :key="index"
        :prop="item.field"
        :label="isNm(item)"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <!-- 是下拉框 -->
          <div v-if="isSelect(selects, item.field)">
            <el-select
              class="w100"
              :disabled="canEdit ? false : true"
              v-if="!isMultiSelect(selects, item.field)"
              v-model="scope.row[item.field]"
            >
              <!-- v-model="formData[scope.$index][item.field]" -->
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
              v-model="scope.row[item.field]"
              :disabled="canEdit ? false : true"
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
          </div>
          <!-- 是下拉框 -->

          <!-- 非下拉框 -->
          <div v-else>
            <el-date-picker
              class="w100"
              :disabled="canEdit ? false : true"
              v-if="item.fieldType.indexOf('Date') != -1"
              v-model="scope.row[item.field]"
              @change="
                handleDateFormat(
                  scope.row[item.field],
                  item.field,
                  scope.$index
                )
              "
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>

            <el-input
              v-else-if="item.field == 'bdnm'"
              v-model="scope.row[item.field]"
              :disabled="true"
            ></el-input>

            <el-input
              v-else
              v-model="scope.row[item.field]"
              :disabled="canEdit ? false : true"
            ></el-input>
          </div>
          <!-- 非下拉框 -->
        </template>
      </el-table-column>

      <el-table-column
        align="right"
        width="100"
        v-if="showDelete ? showDelete : false"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  isNm,
  refresh,
  isSelect,
  isMultiSelect,
  getRequestUrl,
  dateParse,
  findObj,
  generateDeleteData,
} from "@/utils/common";

export default {
  props: [
    "canEdit",
    "type",
    "item",
    "showSelect",
    "showAdd",
    "showIndex",
    "showDelete",
    "pkey",
    "skey",
  ],
  data() {
    return {
      selects: "",
      tableData: [],
      tableItem: "",
      multipleSelection: [],
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
    generateDeleteData,

    // 日期格式转换
    handleDateFormat(value, field, index) {
      this.tableData[index][field] = new Date(String(value)).getTime();
    },

    // 新增行
    addTableRow() {
      if (this.tableData.length > 0) {
        let reset = (obj) => {
          const _obj = JSON.parse(JSON.stringify(obj));
          for (let i in _obj) {
            if (i === "bdnm") {
              _obj[i] = JSON.parse(sessionStorage.getItem("_force")).bdnm;
            } else {
              _obj[i] = "";
            }
          }
          return _obj;
        };
        this.tableData.push(reset(this.tableData[0]));
      } else {
        this.tableData.push(this.tableItem);
      }
    },

    // 删除行
    handleDelete(index) {
      this.tableData.splice(index, 1);
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

    // 生成表格数据
    generateTableData() {
      const arr = [];
      this.item.forEach((i) => {
        if (i.fields && i.fields.length > 0) {
          let _obj = {};
          i.fields.forEach((j) => {
            //  _obj[j.field] = j.fieldValue; // 新增value为空  修改为fieldValue
            if (j.field === "bdnm") {
              _obj[j.field] = sessionStorage.getItem("_force")
                ? JSON.parse(sessionStorage.getItem("_force")).bdnm
                : "";
            } else {
              _obj[j.field] = "";
            }
          });
          arr.push(_obj);
        }
      });
      this.tableData = arr;

      // tableItem存入模板以防全删了无法新增
      this.tableItem = arr[0];
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
  },
  created() {
    this.selects = this.$store.getters.selects;

    this.generateTableData();
  },
  computed: {
    getTableData() {
      let _arr = [];
      this.item[0].fields.forEach((i) => {
        _arr.push(i);
      });
      console.log(_arr);
      console.log(this.item[0].fields);
      return _arr;
    },
  },
};
</script>

<style>
.w100 {
  width: 100% !important;
}
</style>