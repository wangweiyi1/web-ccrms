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
      <!--新建会议弹窗-->
      <el-dialog title="新建会议" width="70%" :visible.sync="meetingDialog">
        <el-form label-width="120px">
          <el-form-item label="">
            <span class="lead">{{activeDate}}</span>
          </el-form-item>
          <el-form-item label="时间">
            <el-time-select v-model="meetingTime"
              :picker-options="{
                  start: '08:00',
                  step: '00:15',
                  end: '20:30'
              }" placeholder="选择时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="会议纪要">
            <el-input type="textarea" style="width:400px;" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="参会人员">
            <template>
              <el-transfer v-model="personnelValue" :data="personnel" filterable
                           :titles="['可选客户','已选客户']">
              </el-transfer>
            </template>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="meetingDialog = false">取 消</el-button>
          <el-button type="primary" @click="addMeeting">确 定</el-button>
        </span>
      </el-dialog>

      <el-col :span="10">
        <el-col :span="24">
          <el-card class="box-card custom-card" :body-style="{ padding: '0' }">
            <div slot="header" class="clearfix card-header-custom">
              <h2>会议信息
                <i class="el-icon-circle-plus click-icon"></i>
              </h2>
              <!--<el-button icon="el-icon-circle-plus">添加会议</el-button>-->
              <i class="el-icon-arrow-down card-icon" v-show="showCalendar" @click="showCalendar = false"></i>
              <i class="el-icon-arrow-left card-icon" v-show="!showCalendar" @click="showCalendar = true"></i>
            </div>
            <transition name="fade">
              <calendar :meetingData="meetingData" v-show="showCalendar" @click-day="clickDay"></calendar>
            </transition>
          </el-card>
        </el-col>
        <el-col :span="24" class="table-container">
          <el-card class="box-card custom-card" :body-style="{ position: 'relative' }">
            <h2>线索客户
              <i class="el-icon-circle-plus click-icon" @click="createClues = true"></i>
            </h2>
            <el-input class="search-input" placeholder="请输入客户姓名" size="mini" suffix-icon="el-icon-search"></el-input>
            <el-table :data="cluesData" highlight-current-row height="200" style="width: 100%;margin-top:10px;">
              <el-table-column prop="name" label="姓名">
              </el-table-column>
              <el-table-column prop="phone" label="电话号">
              </el-table-column>
              <el-table-column prop="nextTime" label="下次访问时间">
              </el-table-column>
              <el-table-column label="">
                <template slot-scope="scope">
                  <el-button size="mini" @click="on=false">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-col>
      <!--<el-button @click="on=!on"></el-button>-->
      <el-col :span="14" style="position: relative;">
        <!--<div class="in-out-translate-demo-wrapper">-->
          <transition name="in-out-translate-fade" mode="out-in">
            <el-card v-if="on" key="on" class="box-card custom-card" :body-style="{ position: 'relative' , paddingTop:'10px' }">
              <h2>
                会议纪要
                <i class="el-icon-edit" style="cursor: pointer;"></i>
              </h2>
              <span class="lead">
                <img src="../../assets/icon/time.svg" width="15"/>&nbsp;2018-1-1 10:00<br>
              </span>
              <span class="lead">
                被长辈看见打PUBG是一种什么样的体验?
              </span>
              <h2>参与客户列表
                <!--<i class="el-icon-circle-plus click-icon" @click="customerDialog = true"></i>-->
              </h2>
              <el-row :gutter="20">
                <!--<transition-group name="list" tag="p">-->
                  <template v-for="(item, index) in tableData">
                    <el-col :span="12" style="margin-top:10px;" :key="index">
                      <el-card class="select-card" :body-style="{ padding: '0px' , position: 'relative' }">
                        <img src="../../assets/icon/unknow-user.svg" class="image-right">
                        <div style="padding: 10px;margin-left:100px;">
                          <span>{{item.name}}</span>
                          <div class="bottom clearfix">
                            <div class="detail">
                              <img src="../../assets/icon/phone.svg" class="iconImage">{{item.phone}}
                            </div>
                            <div class="detail">
                              <img src="../../assets/icon/level.svg" class="iconImage">{{item.level}}
                            </div>
                            <div class="detail">
                              <img src="../../assets/icon/num.svg" class="iconImage">{{item.meetings}}
                            </div>
                            <el-button type="text" icon="el-icon-delete" class="button" @click="tableData.splice(index,1)"></el-button>
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </template>
                <!--</transition-group>-->
                <el-col :span="12" style="margin-top:10px;height:112px;display: flex;align-items: center;">
                  <i class="el-icon-circle-plus-outline add-button"></i>
                </el-col>
              </el-row>
            </el-card>
            <el-card  v-else key="off" class="box-card custom-card" :body-style="{ position: 'relative' }">
              <Timeline pending>
                <TimelineItem>
                  <p class="time">1976年</p>
                  <p class="content">Apple I 问世</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">1984年</p>
                  <p class="content">发布 Macintosh</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2007年</p>
                  <p class="content">发布 iPhone</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2010年</p>
                  <p class="content">发布 iPad</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2011年10月5日</p>
                  <p class="content">史蒂夫·乔布斯去世</p>
                </TimelineItem>
              </Timeline>
            </el-card>
          </transition>
        <!--</div>-->
      </el-col>
    </el-row>
</template>

<script>
  export default {
    data() {
      let Personnel = [];
      for(let i=1;i<=10;i++){
        Personnel.push({key:i,label:"客户"+i});
      }
      return {
        activeDate:"",
        on: true,
        createClues:false,
        customerDialog:false,
        meetingDialog:false,
        date1:'',
        meetingTime:'',
        customerType:"",
        personnel:Personnel,
        personnelValue:[],
        options: [
          {value: '选项1', label: '全款会员'},
          {value: '选项2', label: '期费会员'},
          {value: '选项3', label: '龙弟子'},
          {value: '选项4', label: '全球创办人'},
        ],
        value: [20, 50],
        showCalendar:true,
        meetingData:[
          {
            date:"2018-1-1",
            detail:"会议详情"
          },
          {
            date:"2018-1-2",
            detail:"会议详情"
          },
        ],
        cluesData:[
          {
            name: '线索客户1',
            phone: '13672658193',
            nextTime: '2018-01-02',
          }, {
            name: '线索客户2',
            phone: '13672658193',
            nextTime: '2018-01-05',
          }, {
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
        tableData:[
        {
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
      }],
      };
    },
    methods: {
      clickDay:function(date){
        let hasMeeting = false;
        for(let i=0;i<this.meetingData.length;i++){
          if(this.meetingData[i].date == date){
            hasMeeting = true;break;
          }
        }
        if(hasMeeting){
          this.on = true;
        }else{
          this.activeDate = date;
          this.meetingDialog = true;
        }
      },
      addMeeting:function(){
        this.meetingData.push({
          date:this.activeDate,
          detail:"会议详情"
        });
        this.meetingDialog = false;
        this.on = true;
      },
    },
    created: function(){
    },
    mounted(){
    }
  }
</script>

<style scoped>
  .add-button{
    font-size:80px;
    cursor: pointer;
    color: #666666;
  }
  .add-button:hover{
    color: #999999;
  }
  .click-icon{
    color: #00B8EC;
  }
  .search-input{
    position:absolute;
    right:15px;
    top:15px;
    width:200px;
  }
  .select-card:hover{
    background-color: #e6e6e6;
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
  }

  .in-out-translate-demo-wrapper {
    position: relative;
  }
  .in-out-translate-demo-wrapper button {
    position: absolute;
  }
  .custom-card{
    max-height: 768px;
    overflow-y: auto;
  }
  .in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {
    transition: all .4s;
  }
  .in-out-translate-fade-enter, .in-out-translate-fade-leave-active {
    opacity: 0;
  }
  .in-out-translate-fade-enter {
    transform: translateX(300px);
  }
  .in-out-translate-fade-leave-active {
    transform: translateX(-300px);
  }


  .detail {
    font-size: 13px;
    color: #666666;
    display: flex;
    align-items: center;
    line-height: 24px;
  }

  .bottom {
    line-height: 12px;
  }

  .button {
    position: absolute;
    padding: 0;
    right:10px;
    bottom:10px;
    font-size: 18px;
    color: #CC6666;
  }

  .image {
    width: 100%;
    display: block;
  }
  .image-right{
    position: absolute;
    left:0px;
    width:100px;
    height:100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .iconImage{
    width:15px;
    margin-right:5px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .list-enter-active, .list-leave-active { transition: all 0.5s; }
  .list-enter-to { opacity: 0; transform: translateY(-30px); }

  .list-leave-to { opacity: 0; transform: translateY(30px); }
</style>
