<template>
  <div class="wrapper">
    <div class="login-logo">
      <img src="../assets/logo.png" width="100%" alt="">
    </div>
    <!--<div class="internationalize-info" style="position:absolute; top:0px; right:0px; text-decoration: underline;">-->
      <!--<div class="" style="display:inline-block;width: 120px">-->
        <!--<div class="select" id="J_switch">-->
          <!--<a href="javascript:void(0)" id="test" onclick="var ths = this;require(['chglan'],function(opetra){opetra.chglan(ths);});return;" data-v="chinese" class="active">简体中文</a>-->
          <!--|-->
          <!--<a href="javascript:void(0)" onclick="var ths = this;require(['chglan'],function(opetra){opetra.chglan(ths);});return;" id="J_english" data-v="english">English</a>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div id="J_content" style="position: absolute;bottom: 50%;left: 30px;margin-bottom: -90px;">
      <div class="sys-name">圈人脉 整项目 玩资本</div>
      <div class="login-form">
        <div class="inputs">
          <el-input v-model="username" style="width:200px;" placeholder="账号"></el-input>
          <el-input v-model="password" style="width:200px;" placeholder="密码"></el-input>
          <el-button @click="login" style="width:120px;" type="primary">登录</el-button>
        </div>
        <div class="forget-wrapper"><a class="forget-password">忘记密码？</a></div>
      </div>
    </div>
    <!--<div class="footer"> © Copyright 2009-2017 All Rights Reserved 北京品友互动信息技术股份公司-->
    <!--</div>-->
    </form>
  </div>
</template>

<script>
  import { loginAPI } from '../api/api'
  export default {
    data() {
      return {
        username:'',
        password:'',
      };
    },
    methods: {
      login(){
        let vue = this;
        let username = vue.username;
        let password = vue.password;
        if(username == ''){
          vue.$message({
            showClose: true,
            message: '请输入用户名',
            type: 'error'
          });
        }
        if(password == ''){
          vue.$message({
            showClose: true,
            message: '密码',
            type: 'error'
          });
        }
        loginAPI("username="+username+"&password="+password).then(data=>{
          if(data.retCode == 200){
            vue.$router.push({path:'/index'});
          }else{
            vue.$message({
              showClose: true,
              message: data.retMsg,
              type: 'error'
            });
          }
        })
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
  body{
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    font-family: "Microsoft YaHei" ;
  }
  .wrapper{
    height: 100%;
    width: 100%;
    position: absolute;
    padding-bottom: 110px;
    background:url("/src/assets/public/login-bg.png");
    background-size:cover;
  }
  .wrapper .login-logo{
    display:inline-block;
    vertical-align:middle;
    width: 160px;
  }
  .wrapper .sys-name {
    width: 600px;
    height: 77px;
    margin-bottom: 60px;
    margin-left: 7px;
    background-size: contain !important;
    font-size: 40px;
  }
  .wrapper .logo-text{
    display:inline-block;
    vertical-align:middle;
    font-size: 36px;
    color: #4d4d4f;
    border-left: 3px solid #4d4d4f;
    padding: 5px 0 0 10px;
    margin-left:10px;
  }
  .logo-text span{
    font-size:24px;
  }

  .wrapper .login-form{
    margin: 0 auto;
  }
  .wrapper .login-form input{
    width:200px;
    height: 35px;
    padding: 7px 10px;
    border: 1px solid silver;
    box-sizing: border-box;
  }
  .login-form .inputs{
    display: inline-block;
    vertical-align: top;
  }
  .wrapper .login-form .validate{
    display: inline-block;
    width: 100px;
  }

  .wrapper .login-form span{
    display: inline-block;
    width: 70px;
    text-align: right;
  }
  .wrapper .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 110px;
    line-height: 110px;
    text-align: center;
    color: #666666;
    font-size: 14px;
    background-color: #fefefe;
  }

  .login-button #login{
    display:block;
    width:75px;
    height:75px;
  }

  .forget-psd{
    color:#378dcf;
  }
  .error-info{
    width:200px;
    margin:10px auto;
    color:#be1e2d;
    line-height: 30px;
    font-size: 14px;
    text-align:center;
    background-color:#ffd9d5;
    border:1px solid #ff0000;
  }

  .forget-wrapper{
    text-align:right;
    width:400px;
  }
  .forget-password{
    color:#348dd1;
    line-height:30px;
    cursor:pointer;
  }
  .internationalize-info {
    float: right;
    margin-right: 20px;
  }
  .internationalize-info .children {
    width: 120px !important;
  }
  .internationalize-info .children li {
    width: 100px !important;
  }
  .internationalize-info .select {
    font-size: 12px;
    font-weight: normal;
  }
  .internationalize-info .tab-switch {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .internationalize-info .tab-switch li {
    float: left;
    min-width: 110px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #000000;
    font-weight: bold;
  }
  .internationalize-info .tab-switch li a {
    display: block;
    width: 100%;
    height: 44px;
    line-height: 44px;
  }
  .internationalize-info .tab-switch li a:hover,
  .internationalize-info .tab-switch li a:active {
    text-decoration: none;
    color: #378dcf;
  }
  .internationalize-info .tab-switch li a:hover .icon-earth,
  .internationalize-info .tab-switch li a:active .icon-earth {
    background-position: -35px 0;
  }
  .internationalize-info .tab-switch li a:hover .icon-user,
  .internationalize-info .tab-switch li a:active .icon-user {
    background-position: 0px -35px;
  }
  .internationalize-info .tab-switch li a:hover .icon-report,
  .internationalize-info .tab-switch li a:active .icon-report {
    background-position: -44px -35px;
  }
  .internationalize-info .tab-switch li a:hover .icon-toufang-list,
  .internationalize-info .tab-switch li a:active .icon-toufang-list {
    background-position: -137px -35px;
  }
  .internationalize-info .tab-switch li a:hover .icon-platform-list,
  .internationalize-info .tab-switch li a:active .icon-platform-list {
    background-position: -90px -35px;
  }
  .internationalize-info .tab-switch li a:hover .icon-Desc,
  .internationalize-info .tab-switch li a:active .icon-Desc {
    border-top: 10px solid #378dcf;
  }
  .parent-menu:hover,.parent-menu:active{
    background-color: #dfdfdf;
  }
  .tab-switch .parent-menu:hover .children,
  .tab-switch .parent-menu:active .children {
    display: block !important;
    border-top: 5px solid #378dcf;
    background-color: #ffffff;
  }
  .tab-switch .parent-menu:hover .icon-platform-list,
  .tab-switch .parent-menu:active .icon-platform-list {
    background-position: -90px -35px;
  }
  .tab-switch .parent-menu .children {
    position: absolute;
    z-index: 100;
    width: 130px;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #c0c0c0;
    border-top: none;
  }
  .tab-switch .parent-menu .children li {
    position: relative;
    width: 110px;
    font-size: 12px;
    color: #626262;
    line-height: 30px;
    text-align: left;
    font-weight: normal;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-top: 1px solid #f5f5f5;
  }
</style>
