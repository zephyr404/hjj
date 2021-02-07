<template>
  <el-card class="box-card" shadow="never">
    <el-tabs v-model="activeNav" class="main" @tab-click="handleClickNav">
      <el-tab-pane
        v-for="(item, index) in nav"
        :key="index"
        :label="item.mc"
        :name="item.jdId"
      >
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :default-active="activeIndex"
          :router="true"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(item2, index2) in tabs"
            :key="index2"
            :index="getPath(item2.jdId)"
            :name="item2.jdId"
            >{{ item2.mc }}</el-menu-item
          >
        </el-menu>
      </el-tab-pane>
    </el-tabs>

    <router-view v-if="loaded"></router-view>
  </el-card>
</template>

<script>
import { getPath } from "@/utils/common";

export default {
  name: "",
  data() {
    return {
      nav: [],
      tabs: [],
      activeNav: "",
      activeTab: "",
      activeIndex: "",
      pageData: "",
    };
  },
  methods: {
    getPath,

    // 设置路径
    handleSelect(key) {
      // key, keyPath
      try {
        this.$store.commit("SET_TABINNER", key);
      } catch (err) {
        console.log(err);
      }
    },

    // 点击顶级nav事件
    handleClickNav(tab) {
      this.updateTabs(tab.name);
    },

    // 更新nav数据
    updateNav() {
      this.nav = this.$store.state.app.origin.labs;
      this.activeNav = this.nav[0].jdId;
    },

    // 点击nav后根据被点击nav的jdid更新tabs
    updateTabs(_jdId) {
      function compare(property) {
        return function (a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return (
            Number(value1.substring(value1.length - 3)) -
            Number(value2.substring(value2.length - 3))
          );
        };
      }

      let _t = this.$store.state.app.origin.jds.filter((item) => {
        return item.jdId.indexOf(_jdId) === 0;
      });

      this.tabs = _t.sort(compare("jdId"));

      if (this.$route.path != `/${this.getPath(this.tabs[0].jdId)}`) {
        this.$router.push({ path: this.getPath(this.tabs[0].jdId) });
        this.activeIndex = this.getPath(this.tabs[0].jdId);
      }
    },
  },

  computed: {
    loaded() {
      return this.$store.state.app.loaded;
    },
    origin() {
      return this.$store.state.app.origin;
    },
  },

  created() {},

  mounted() {
    this.activeIndex = this.$route.path.replace(/\//g, "");
  },

  watch: {
    origin: {
      deep: true,
      handler(val) {
        // origin变化后更新nav并初始为第一个tab
        this.updateNav();
        this.updateTabs(this.nav[0].jdId);
      },
    },
  },
};
</script>

<style lang='scss' scoped>
.main {
  text-align: left;
}

.btn-group {
  margin-bottom: 1em;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.no-padding {
  padding: 0 !important;
}
</style>
