<template>
  <el-row>
    <el-col :span="24" class="table-container">
      <el-card class="box-card custom-card">
        <el-table :data="tableData"  show-summary stripe style="width: 100%">
          <el-table-column prop="id" label="序号">
          </el-table-column>
          <el-table-column prop="date" label="日期">
          </el-table-column>
          <el-table-column prop="name" label="客户姓名">
          </el-table-column>
          <el-table-column prop="course" label="课程名称">
          </el-table-column>
          <el-table-column prop="money" label="金额">
          </el-table-column>
          <el-table-column prop="num" label="出单数">
          </el-table-column>
          <el-table-column prop="management" label="成交总部管理费">
          </el-table-column>
          <el-table-column prop="branch" label="所属分公司">
          </el-table-column>
          <el-table-column prop="consultant" label="资本顾问">
          </el-table-column>
          <el-table-column prop="lecturer" label="讲师">
          </el-table-column>
          <el-table-column prop="compensation" label="课酬">
          </el-table-column>
          <el-table-column prop="detail" label="备注">
          </el-table-column>
          <el-table-column prop="poundage" label="刷卡手续费">
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
          id:i,date:"2017.12.10",name:"XXX",course:"期费会员",money:"6000",num:1,management:900,branch:"XX",
          lecturer:"Z讲师",compensation:2000,detail:"线下成交"
        });
      }
    }
  }
</script>

<style scoped>

</style>
