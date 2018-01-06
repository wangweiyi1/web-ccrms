<template>
  <el-row>
    <el-card class="box-card custom-card">
      <div id="map" style="height:400px;"></div>
    </el-card>
  </el-row>
</template>

<script>
  import geoMap from './options/map-option'
  require('echarts/map/js/china.js')
  export default {
    data() {
      return {};
    },
    methods: {},
    mounted(){
      let chart = this.$echarts.init(document.getElementById('map'));
      chart.setOption(geoMap);
    }
  }
</script>

<style scoped>

</style>
