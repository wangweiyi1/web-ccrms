<template>
  <el-row :gutter="20" style="position: relative;margin:-20px;">
    <div style="float: left;">
      <el-menu :default-active="$route.path" router class="el-menu-vertical-demo">
        <el-menu-item index="/management/list">我的销售线索</el-menu-item>
        <el-menu-item index="2">我的客户</el-menu-item>
        <el-menu-item index="/index">客户公司</el-menu-item>
        <el-menu-item index="/index">客户供求信息</el-menu-item>
        <el-menu-item index="/index">会议安排</el-menu-item>
        <el-menu-item index="/index">讲师信息</el-menu-item>
        <el-menu-item index="3">员工花名册</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {},
    mounted(){

    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo{
    width: 240px;
    min-height: 1200px;
  }
  .content{
    /*position: absolute;*/
    /*width: 100%;*/
    /*float: left;*/
    padding:20px;
    z-index:0;
    padding: 20px 20px 20px 260px;
  }
</style>
