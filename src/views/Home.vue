<template>
  <el-row class="main">
    <el-col :span="24" class="header">
      <el-col :span="4" class="logo">
        <img src="../assets/logo.png" height="30" alt="">
      </el-col>
      <el-col :span="14">
        <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/index">门户</el-menu-item>
          <el-menu-item index="/management/list">资本管理</el-menu-item>
          <el-menu-item index="/report/list">报表中心</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6" class="user-config">
        <el-button type="text">新增订单</el-button>
        <el-button type="text">新增交易</el-button>
        <img src="../assets/icon/user.svg" width="40" height="40" alt="">
      </el-col>
    </el-col>
    <el-col :span="24" class="content-wrapper">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {},
    mounted(){

    }
  }
</script>

<style scoped>
  .header{
    position: fixed;
    background-color: white;
    height:40px;
    z-index:1000;
  }
  .header .el-col{
    height:40px;
    border-bottom: solid 1px #e6e6e6;
  }
  .header .logo{
    display         : flex;
    justify-content : flex-start;
    align-items     : center;
    padding-left:40px;
  }
  .header .user-config{
    display         : flex;
    /*控制水平排版*/
    justify-content : flex-end;
    /*控制垂直排版*/
    align-items     : center;
    padding-right:40px;
  }
  .main .content-wrapper{
    position: relative;
    overflow: hidden;
    padding:10px;
    margin-top:40px;
  }
  .el-menu--horizontal .el-menu-item{
    height:40px;
    line-height:40px;
  }
</style>
<style>
  @import '../style/global.css';
  @import '../style/card.css';
</style>
