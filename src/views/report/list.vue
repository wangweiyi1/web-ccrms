<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card custom-card">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>报表中心</el-breadcrumb-item>
          <el-breadcrumb-item>客户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form class="screening-form" label-width="100px" :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户类型">
                <el-select v-model="form.type" placeholder="请选择">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户行业">
                <el-select v-model="form.type" placeholder="请选择">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户规模">
                <el-select v-model="form.type" placeholder="请选择">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间范围">
                <el-date-picker v-model="form.date" type="daterange">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-col>
            <div style="clear:both;"></div>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="24" class="table-container">
      <el-card class="box-card custom-card">
        <el-button type="primary">新增客户 <i class="el-icon-circle-plus-outline"></i></el-button>
        <el-input class="search-input" placeholder="请输入搜索内容" suffix-icon="el-icon-search"></el-input>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="客户姓名" width="180" sortable>
          </el-table-column>
          <el-table-column prop="type" label="客户类型" sortable>
          </el-table-column>
          <el-table-column prop="industry" label="客户行业" sortable>
          </el-table-column>
          <el-table-column prop="persons" label="客户规模" sortable>
          </el-table-column>
          <el-table-column prop="product" label="数量" sortable>
          </el-table-column>
          <el-table-column prop="rate" label="占比" sortable>
          </el-table-column>
          <el-table-column label="操作列" width="150">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" plain></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  require('echarts/')
  export default {
    data() {
      return {
        form: {
          type:'',
          date:'',
        },
        tableData: [],
      };
    },
    methods: {},
    mounted(){
      for(let i=0;i<10;i++) {
        this.tableData.push({
          name:"XXX传媒公司",address:"北京市朝阳区",url:"http://www.xx.com",legal_person:"陈先生",type:"民营",
          sales:"外销",industry:"服装",persons:"50-200",product:"XX服饰",rate:'20%'
        });
      }
    }
  }
</script>

<style scoped>

</style>
