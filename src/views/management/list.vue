<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card custom-card">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form class="screening-form" label-width="100px" :model="form">
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
            <el-form-item label="加入时间">
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
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="24" class="table-container">
      <el-card class="box-card custom-card">
        <el-button type="primary">新增客户 <i class="el-icon-circle-plus-outline"></i></el-button>
        <el-input class="search-input" placeholder="请输入搜索内容" suffix-icon="el-icon-search"></el-input>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="公司姓名" width="180" sortable>
          </el-table-column>
          <el-table-column prop="address" label="公司地址" sortable>
          </el-table-column>
          <el-table-column prop="url" label="网址" width="180" sortable>
          </el-table-column>
          <el-table-column prop="legal_person" label="法人代表" sortable>
          </el-table-column>
          <el-table-column prop="type" label="公司性质" sortable>
          </el-table-column>
          <el-table-column prop="sales" label="销售模式" sortable>
          </el-table-column>
          <el-table-column prop="industry" label="行业" sortable>
          </el-table-column>
          <el-table-column prop="persons" label="员工规模" sortable>
          </el-table-column>
          <el-table-column prop="product" label="主营产品" sortable>
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
          sales:"外销",industry:"服装",persons:"50-200",product:"XX服饰"
        });
      }
    }
  }
</script>

<style scoped>

</style>
