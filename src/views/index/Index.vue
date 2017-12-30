<template>
    <el-row :gutter="20">
      <!--新建线索客户弹窗-->
      <el-dialog title="添加新的线索客户" :visible.sync="createClues">
        <el-form label-width="120px">
          <el-form-item label="姓名">
            <el-input style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="电话号">
            <el-input style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="下次访问时间">
            <el-date-picker v-model="date1" style="width:200px;" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createClues = false">取 消</el-button>
          <el-button type="primary" @click="createClues = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--新建客户弹窗-->
      <el-dialog title="新建客户" :visible.sync="customerDialog">
        <el-form label-width="120px">
          <el-form-item label="姓名">
            <el-input style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="电话号">
            <el-input style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="客户等级">
            <el-select v-model="customerType" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参会次数">
            <el-input style="width:200px;"></el-input>
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="customerDialog = false">取 消</el-button>
          <el-button type="primary" @click="customerDialog = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-col :span="10">
        <el-col :span="24">
          <el-card class="box-card custom-card" :body-style="{ padding: '0' }">
            <div slot="header" class="clearfix card-header-custom">
              <h2>会议信息
                <!--<i class="el-icon-circle-plus click-icon" @click="a"></i>-->
              </h2>
              <!--<el-button icon="el-icon-circle-plus">添加会议</el-button>-->
              <i class="el-icon-arrow-down card-icon" v-show="showCalendar" @click="showCalendar = false"></i>
              <i class="el-icon-arrow-left card-icon" v-show="!showCalendar" @click="showCalendar = true"></i>
            </div>
            <transition name="fade">
              <calendar :meetingDate="meetingDate" v-show="showCalendar" @click-day="clickDay"></calendar>
            </transition>
          </el-card>
        </el-col>
        <el-col :span="24" class="table-container">
          <el-card class="box-card custom-card" :body-style="{ position: 'relative' }">
            <h2>线索客户<i class="el-icon-circle-plus click-icon" @click="createClues = true"></i></h2>
            <el-input class="search-input" placeholder="请输入客户姓名" size="mini" suffix-icon="el-icon-search"></el-input>
            <el-table :data="cluesData" highlight-current-row style="width: 100%;margin-top:10px;">
              <el-table-column prop="name" label="姓名">
              </el-table-column>
              <el-table-column prop="phone" label="电话号">
              </el-table-column>
              <el-table-column prop="nextTime" label="下次访问时间">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card custom-card" :body-style="{ position: 'relative' }">
          <h2>客户列表<i class="el-icon-circle-plus click-icon" @click="customerDialog = true"></i></h2>
          <el-input class="search-input" placeholder="请输入客户姓名" size="mini" suffix-icon="el-icon-search"></el-input>
          <!--<Timeline>-->
            <!--<TimelineItem>-->
              <!--<p class="time">1976年</p>-->
              <!--<p class="content">Apple I 问世</p>-->
            <!--</TimelineItem>-->
            <!--<TimelineItem>-->
              <!--<p class="time">1984年</p>-->
              <!--<p class="content">发布 Macintosh</p>-->
            <!--</TimelineItem>-->
            <!--<TimelineItem>-->
              <!--<p class="time">2007年</p>-->
              <!--<p class="content">发布 iPhone</p>-->
            <!--</TimelineItem>-->
            <!--<TimelineItem>-->
              <!--<p class="time">2010年</p>-->
              <!--<p class="content">发布 iPad</p>-->
            <!--</TimelineItem>-->
            <!--<TimelineItem>-->
              <!--<p class="time">2011年10月5日</p>-->
              <!--<p class="content">史蒂夫·乔布斯去世</p>-->
            <!--</TimelineItem>-->
          <!--</Timeline>-->
          <el-table :data="tableData" highlight-current-row style="width: 100%;margin-top:10px;">
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="phone" label="电话号">
            </el-table-column>
            <el-table-column prop="level" label="客户等级">
            </el-table-column>
            <el-table-column prop="meetings" label="参会次数">
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
        createClues:false,
        customerDialog:false,
        date1:'',
        customerType:"",
        options: [
          {value: '选项1', label: '全款会员'},
          {value: '选项2', label: '期费会员'},
          {value: '选项3', label: '龙弟子'},
          {value: '选项4', label: '全球创办人'},
        ],
        value: [20, 50],
        showCalendar:true,
        meetingDate:{
          "2017-12-20":{
            date:"2017-12-20",
            detail:"会议详情"
          }
        },
        cluesData:[{
          name: '线索客户1',
      phone: '13672658193',
        nextTime: '2018-01-02',
    },{
        name: '线索客户2',
        phone: '13672658193',
          nextTime: '2018-01-05',
      },{
        name: '线索客户3',
        phone: '13672658193',
          nextTime: '2018-02-02',
      },{
        name: '线索客户4',
        phone: '13672658193',
          nextTime: '2018-02-05',
      },{
        name: '线索客户5',
        phone: '13672658193',
          nextTime: '2018-02-12',
      },{
        name: '线索客户6',
        phone: '13672658193',
          nextTime: '2018-02-22',
      },{
        name: '线索客户7',
        phone: '13672658193',
          nextTime: '2018-03-12',
      },{
        name: '线索客户8',
        phone: '13672658193',
          nextTime: '2018-03-22',
      },{
        name: '线索客户9',
        phone: '13672658193',
          nextTime: '2018-03-28',
      },{
        name: '线索客户10',
        phone: '13672658193',
          nextTime: '2018-04-02',
      },{
        name: '线索客户11',
        phone: '13672658193',
          nextTime: '2018-04-12',
      },{
        name: '线索客户12',
        phone: '13672658193',
          nextTime: '2018-05-12',
      },{
        name: '线索客户13',
        phone: '13672658193',
          nextTime: '2018-06-02',
      },{
        name: '线索客户14',
        phone: '13672658193',
          nextTime: '2018-07-02',
      },{
        name: '线索客户15',
        phone: '13672658193',
          nextTime: '2018-08-12',
      }],


      tableData: [{
        name: '客户1',
        phone: '13672658193',
        level: '全款会员',
        meetings:'146',
      },{
        name: '客户2',
        phone: '13672658193',
        level: '期费会员',
      meetings:"1",
    },{
        name: '客户3',
        phone: '13672658193',
          level: '龙弟子',
        meetings:'56',
      },{
        name: '客户4',
        phone: '13672658193',
          level: '全款会员',
          meetings:'22',
      },{
        name: '客户5',
        phone: '13672658193',
          level: '全款会员',
          meetings:'15',
      },{
        name: '客户6',
        phone: '13672658193',
          level: '龙弟子',
        meetings:"10",
      },{
        name: '客户7',
        phone: '13672658193',
          level: '全球创办人',
        meetings:'45',
      },{
        name: '客户8',
        phone: '13672658193',
          level: '全款会员',
          meetings:'30',
      },{
        name: '客户9',
        phone: '13672658193',
          level: '龙弟子',
        meetings:'3',
      },{
        name: '客户10',
        phone: '13672658193',
          level: '龙弟子',
        meetings:'5',
      },{
        name: '客户11',
        phone: '13672658193',
          level: '期费会员',
        meetings:'2',
      },{
        name: '客户12',
        phone: '13672658193',
          level: '期费会员',
        meetings:"1",
      },{
        name: '客户13',
        phone: '13672658193',
          level: '全款会员',
          meetings:'11',
      },{
        name: '客户14',
        phone: '13672658193',
          level: '龙弟子',
        meetings:'87',
      },{
        name: '客户15',
        phone: '13672658193',
          level: '全球创办人',
        meetings:'21',
      }]
      };
    },
    methods: {
      clickDay:function(date){
        console.log(date);
      },
      a:function(){
        this.meetingDate['2017-12-21']={date:'2017-12-21',detail:'会议详情'};
        console.log(this.meetingDate);
      }
    },
    created: function() {
    },
    mounted(){
    }
  }
</script>

<style scoped>
  .search-input{
    position:absolute;
    right:15px;
    top:15px;
    width:200px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
  }
</style>
