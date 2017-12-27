<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html{
    font: 12px Tahoma,Helvetica,Arial,"Microsoft YaHei","SimSun";
  }
  body{
    padding:0;margin:0;
    background-color: #f7fafd;
  }
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
