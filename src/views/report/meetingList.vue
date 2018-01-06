<template>
    <el-row>
      <el-col :span="24" class="table-container">
        <el-card class="box-card custom-card">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="">
            </el-table-column>
            <el-table-column prop="one" label="1月" sortable>
            </el-table-column>
            <el-table-column prop="two" label="2月" sortable>
            </el-table-column>
            <el-table-column prop="three" label="3月" sortable>
            </el-table-column>
            <el-table-column prop="four" label="4月" sortable>
            </el-table-column>
            <el-table-column prop="five" label="5月" sortable>
            </el-table-column>
            <el-table-column prop="sex" label="6月" sortable>
            </el-table-column>
            <el-table-column prop="seven" label="7月" sortable>
            </el-table-column>
            <el-table-column prop="eight" label="8月" sortable>
            </el-table-column>
            <el-table-column prop="nine" label="9月" sortable>
            </el-table-column>
            <el-table-column prop="ten" label="10月" sortable>
            </el-table-column>
            <el-table-column prop="eleven" label="11月" sortable>
            </el-table-column>
            <el-table-column prop="twelve" label="12月" sortable>
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
          name:'xx会议',one:12,two:1,three:4,four:10,five:0,sex:0,seven:1,eight:1,nine:2,ten:3,
          eleven:1,twelve:2
        });
      }
    }
  }
</script>

<style scoped>

</style>
