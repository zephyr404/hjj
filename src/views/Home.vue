<template>
  <el-container class="app-wrapper">
    <el-aside class="app-aside">
      <app-aside></app-aside>
    </el-aside>

    <el-container>
      <el-container>
        <el-main>
          <app-main></app-main>
          <!-- <router-view></router-view> -->
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import appAside from "@/views/home/Aside.vue";
import appMain from "@/views/home/Main.vue";

export default {
  name: "Home",
  components: { appAside, appMain },
  data() {
    return {
      origin: {},
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: inherit;
}

.app-aside {
  width: 220px !important;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
