<template>
  <el-row class="main">
    <el-col :span="24" class="header">
      <el-col :span="4" class="logo">
        <img src="../assets/logo.png" height="50" alt="">
      </el-col>
      <el-col :span="16">
        <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/index">门户</el-menu-item>
          <el-menu-item index="/list">管理</el-menu-item>
          <el-menu-item index="3">报表</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" class="user-config">
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
    background-color: white;
    height:60px;
  }
  .header .el-col{
    height:60px;
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
    padding:20px;
  }
</style>
<style>
  @import '../style/global.css';
  @import '../style/card.css';
</style>
