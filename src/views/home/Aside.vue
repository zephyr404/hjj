<template>
  <div class="main">
    <div class="search-box">
      <el-input
        size="small"
        class="search-input"
        placeholder="输入关键字进行过滤"
        v-model="filterText"
      ></el-input>
    </div>

    <el-tree
      class="tree filter-tree"
      :data="aside"
      :props="defaultProps"
      node-key="bdnm"
      :indent="10"
      @node-click="handleNodeClick"
      :default-expand-all="true"
      :highlight-current="true"
      :expand-on-click-node="true"
      :filter-node-method="filterNode"
      ref="tree"
    ></el-tree>
  </div>
</template>

<script>
export default {
  name: "Aside",
  components: {},
  data() {
    return {
      aside: [],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    getIndexStruct() {
      this.$http
        .get(this.$api.index)
        .then((res) => {
          if (res.data.code === 200) {
            this.$store.commit("SET_LOADED", true);
            this.$store.commit("SET_ORIGIN", res.data.data);
            this.$store.commit("SET_TABDATA", res.data.data);
            this.$store.commit("SET_FORCE", res.data.data.troops.children[0]);
            if (!sessionStorage.getItem("_force")) {
              sessionStorage.setItem(
                "_force",
                JSON.stringify(res.data.data.troops.children[0])
              );
            }
          } else {
            this.$message.error(`${res.data.message}`);
          }
        })
        .catch((err) => {
          this.$message.error(`获取部队列表失败`);
        });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    handleNodeClick(_bd) {
      try {
        this.$store.commit("SET_FORCE", _bd);
        sessionStorage.setItem("_force", JSON.stringify(_bd));

        this.$router.go(0);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    originData() {
      return this.$store.state.app.origin;
    },
  },
  created() {
    this.getIndexStruct();
  },
  mounted() {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    originData: {
      deep: true,
      handler(val) {
        this.aside = val.troops.children;
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.search-box {
  padding: 10px;
}
</style>