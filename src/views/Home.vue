<template>
  <el-row class="main">
    <el-col :span="24" class="header">
      <el-col :span="4" class="logo">
        <img src="../assets/logo.png" height="50" alt="">
      </el-col>
      <el-col :span="16">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">客户管理</el-menu-item>
          <el-submenu index="2">
            <template slot="title">组织架构</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">财务管理</el-menu-item>
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
        activeIndex:"1"
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
