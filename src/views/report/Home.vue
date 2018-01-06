<template>
  <el-row :gutter="20" style="position: relative;margin:-20px;">
    <div style="position: absolute;">
      <el-menu :default-active="$route.path" router class="el-menu-vertical-demo">
        <el-menu-item index="/report/list">客户列表</el-menu-item>
        <el-menu-item index="/report/geo">地域分布</el-menu-item>
        <el-menu-item index="/report/meeting-list">会议统计</el-menu-item>
        <el-menu-item index="/report/financial-list">财务统计</el-menu-item>
        <el-menu-item index="/report/trading-list">交易流水</el-menu-item>
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
