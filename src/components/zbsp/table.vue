<template>
  <div>
    <el-button v-if="showAdd ? showAdd : false" type="primary" plain size="mini"
      >新增</el-button
    >
    <el-button
      v-if="showDelete ? showDelete : false"
      type="primary"
      plain
      size="mini"
      >删除</el-button
    >

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
      >
      </el-table-column>

      <el-table-column
        v-if="showSelect ? showSelect : false"
        type="selection"
        width="55"
      >
      </el-table-column>

      <el-table-column
        v-for="(item, index) in getTableData"
        :key="index"
        :prop="item.field"
        :label="item.fieldName"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  isNm,
  refresh,
  isSelect,
  getRequestUrl,
  dateParse,
  findObj,
  generateDeleteData,
} from "@/utils/common";

export default {
  props: ["item", "showSelect", "showAdd", "showIndex", "showDelete"],
  data() {
    return {
      tableData: [],
      multipleSelection: [],
    };
  },
  methods: {
    isNm,
    refresh,
    isSelect,
    dateParse,
    getRequestUrl,
    findObj,
    generateDeleteData,

    generateTableData() {
      // console.log(this.item);

      const arr = [];

      this.item.forEach((i) => {
        if (i.fields && i.fields.length > 0) {
          let _obj = {};
          i.fields.forEach((j) => {
            _obj[j.field] = j.fieldValue;
          });
          arr.push(_obj);
        }
      });

      this.tableData = arr;
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
    },
  },
  created() {
    this.generateTableData();
  },
  computed: {
    getTableData() {
      let _arr = [];
      this.item[0].fields.forEach((i) => {
        if (i.field != "bdnm") {
          _arr.push(i);
        }
      });

      return _arr;
    },
  },
};
</script>

<style>
</style>