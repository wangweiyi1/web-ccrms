<template>
  <el-row>
    <el-col :span="24" class="table-container">
      <el-card class="box-card custom-card">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="id" label="序号">
          </el-table-column>
          <el-table-column prop="name" label="摘要">
          </el-table-column>
          <el-table-column prop="money" label="金额(元)">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[]
      };
    },
    methods: {},
    mounted(){
      for(let i=0;i<10;i++) {
        this.tableData.push({
          id:i,name:"成交总额",money:300000
        });
      }
    }
  }
</script>

<style scoped>

</style>
