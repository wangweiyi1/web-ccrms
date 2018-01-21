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
          <!--<el-form-item label="">-->
            <!--<span class="lead">{{activeDate}}</span>-->
          <!--</el-form-item>-->
          <el-form-item label="">
            <el-switch style="display: block" v-model="meetingForm.type"
              active-color="#FFCC99" inactive-color="#0099CC"
              active-text="日程" inactive-text="会议">
            </el-switch>
          </el-form-item>
          <template v-if="!meetingForm.type">
            <el-form-item label="时间">
              <el-date-picker v-model="meetingTime" type="daterange" range-separator="-"
                              start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="会议类型">
              <el-radio-group v-model="meetingForm.meetingType">
                <el-radio label="main">总公司会议</el-radio>
                <el-radio label="branch">分公司会议</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="课程名称">
              <el-input style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="开课地点">
              <el-input style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
              <el-input style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="参会人员">
              <template>
                <el-transfer v-model="personnelValue" :data="personnel" filterable
                             :titles="['可选客户','已选客户']">
                </el-transfer>
              </template>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="时间">
              <el-date-picker v-model="activeDate" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="拜访客户">
              <template v-for="(visitor,index) in meetingForm.visitors">
                <div v-if="index > 0" style="margin-top:10px;"></div>
                <el-input v-model="visitor.name" style="width:200px;"></el-input>
                时间
                <el-time-select v-model="visitor.time" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间">
                </el-time-select>
                <i class="el-icon-circle-plus click-icon" @click="meetingForm.visitors.push({name:'',time:''})"></i>
                <i v-if="index > 0" class="el-icon-circle-close delete-icon" @click="meetingForm.visitors.splice(index,1)"></i>
                <br>
              </template>
            </el-form-item>
          </template>
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
              <h2>日程安排
                <i class="el-icon-circle-plus click-icon"></i>
              </h2>
              <!--<el-button icon="el-icon-circle-plus">添加会议</el-button>-->
              <i class="el-icon-arrow-down card-icon" v-show="showCalendar" @click="showCalendar = false"></i>
              <i class="el-icon-arrow-left card-icon" v-show="!showCalendar" @click="showCalendar = true"></i>
            </div>
            <transition name="fade">
              <calendar style="width: 360px;float:left;" :meetingData="meetingData" v-show="showCalendar" @click-day="clickDay"></calendar>
            </transition>
            <div class="meeting-container">
              <div>
                <div class="meeting-color main"></div>
                <div class="meeting-text">总公司会议</div>
              </div>
              <div>
                <div class="meeting-color branch"></div>
                <div class="meeting-text">分公司会议</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="24" class="table-container">
          <el-card class="box-card custom-card" :body-style="{ position: 'relative' }">
            <h2>线索客户
              <i class="el-icon-circle-plus click-icon" @click="createClues = true"></i>
            </h2>
            <el-input class="search-input" placeholder="请输入客户姓名" size="mini" suffix-icon="el-icon-search"></el-input>
            <el-table :data="cluesData" highlight-current-row height="320" style="width: 100%;margin-top:10px;">
              <el-table-column prop="name" label="姓名">
              </el-table-column>
              <el-table-column prop="phone" label="电话号">
              </el-table-column>
              <el-table-column prop="nextTime" label="下次访问时间">
              </el-table-column>
              <el-table-column label="">
                <template slot-scope="scope">
                  <el-button size="mini" @click="on=false">跟进详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="pagination" small :current-page="1" :page-sizes="[10, 20, 50, 100]"
              :page-size="10" layout="sizes, prev, pager, next" :total="1000">
            </el-pagination>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="14" style="position: relative;">
        <transition name="in-out-translate-fade" mode="out-in">
          <el-card v-if="on" key="on" class="box-card custom-card" :body-style="{ position: 'relative' , paddingTop:'10px' }">
            <h2>
              会议安排 {{activeMeetingDate}}
              <i class="el-icon-edit" style="cursor: pointer;"></i>
            </h2>
            <span class="lead">
              <img src="../../assets/icon/time.svg" width="15"/>&nbsp;2018-1-1 10:00<br>
            </span>
            <span class="lead">
              被长辈看见打PUBG是一种什么样的体验?
            </span>
            <h2>参与客户列表
              <i class="el-icon-circle-plus click-icon" @click="customerDialog = true"></i>
            </h2>
            <el-row :gutter="20">
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
            </el-row>
          </el-card>
          <el-card  v-else key="off" class="box-card custom-card" :body-style="{ position: 'relative' }">
            <!--<Timeline pending>-->
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

            <section id="cd-timeline" class="cd-container">
              <div class="cd-timeline-block">
                <div class="cd-timeline-img cd-picture">
                  <img src="img/cd-icon-picture.svg" alt="Picture">
                </div>

                <div class="cd-timeline-content">
                  <h2>HTML5+CSS3实现的响应式垂直时间轴</h2>
                  <span class="cd-date">2014-12-05</span>
                  <p>网页时间轴一般用于展示以时间为主线的事件，如企业网站常见的公司发展历程等。本文将给大家介绍一款基于HTML5和CSS3的漂亮的垂直时间轴，它可以响应页面布局，适用于HTML5开发的PC和移动手机WEB应用。</p>
                  <a href="http://www.helloweba.com/view-blog-285.html" class="cd-read-more" target="_blank">阅读全文</a>
                </div>
              </div>
              <div class="cd-timeline-block">
                <div class="cd-timeline-img cd-movie">
                  <img src="img/cd-icon-movie.svg" alt="Movie">
                </div>

                <div class="cd-timeline-content">
                  <h2>jQuery+PHP动态数字展示效果</h2>
                  <p>我们在一些应用中需要动态展示数据，比如当前在线人数，当前交易总额，当前汇率等等，前端页面需要实时刷新获取最新数据。本文将结合实例给大家介绍使用jQuery和PHP来实现动态数字展示效果。</p>
                  <a href="http://www.helloweba.com/view-blog-284.html" class="cd-read-more" target="_blank">阅读全文</a>
                </div>
              </div>
              <div class="cd-timeline-block">
                <div class="cd-timeline-img cd-picture">
                  <img src="img/cd-icon-picture.svg" alt="Picture">
                </div>

                <div class="cd-timeline-content">
                  <h2>PHP操作Session和Cookie</h2>
                  <p>我们跟踪用户信息时需要用到Session和Cookie，比如用户登录验证、记录用户浏览历史，存储购物车数据，限制用户会话有效时间等。今天我们来了解下PHP是如何操作Session和Cookie的。</p>
                  <a href="http://www.helloweba.com/view-blog-283.html" class="cd-read-more" target="_blank">阅读全文</a>
                </div>
              </div>
              <div class="cd-timeline-block">
                <div class="cd-timeline-img cd-movie">
                  <img src="img/cd-icon-movie.svg" alt="Movie">
                </div>

                <div class="cd-timeline-content">
                  <h2>jQuery数字加减插件</h2>
                  <p>我们在网上购物提交订单时，在网页上一般会有一个选择数量的控件，要求买家选择购买商品的件数，开发者会把该控件做成可以通过点击实现加减等微调操作，当然也可以直接输入数字件数。本文将介绍常见的几种使用spinner数字微调器来实现数字加减的功能的方法。</p>
                  <a href="http://www.helloweba.com/view-blog-282.html" class="cd-read-more" target="_blank">阅读全文</a>
                </div>
              </div>
              <div class="cd-timeline-block">
                <div class="cd-timeline-img cd-movie">
                  <img src="img/cd-icon-location.svg" alt="Location">
                </div>

                <div class="cd-timeline-content">
                  <h2>收集整理的非常有用的PHP函数</h2>
                  <p>项目中经常会需要一些让人头疼的函数，作为开发者应该整理一个自己的函数库，在需要之时复制过来即可。本文作者收集整理数十个PHP项目中常用的函数，保证能正常运行，你只要复制粘贴到你项目中即可。</p>
                  <a href="http://www.helloweba.com/view-blog-281.html" class="cd-read-more" target="_blank">阅读全文</a>
                </div>
              </div>
            </section>


          </el-card>
        </transition>
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
        activeMeetingDate:"",
        on: true,
        createClues:false,
        customerDialog:false,
        meetingDialog:false,
        date1:'',
        meetingTime:'',
        customerType:"",
        personnel:Personnel,
        personnelValue:[],
        activeMeeting:{
          date:"",
          detail:"",
        },
        meetingForm:{
          type:false,
          visitors:[
            {name:"",time:""},
          ],
          meetingType:"main",
        },
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
            startDate:"2018-1-1",
            endDate:"2018-1-3",
            date:"2018-1-20",
            detail:"会议详情",
            type:"main",
          },
          {
            startDate:"2018-1-6",
            endDate:"2018-1-9",
            date:"2018-1-21",
            detail:"会议详情",
            type:"branch",
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
        if(date.meeting){
          this.on = true;
          this.activeMeetingDate = date.day;
        }else{
          this.activeDate = date.day;
          this.meetingDialog = true;
          this.meetingTime = [date.date,new Date(date.date.getTime() + 1000*60*60*24*3)];
        }
      },
      addMeeting:function(){
        this.meetingData.push({
          startDate:this.formatDate(this.meetingTime[0]),
          endDate:this.formatDate(this.meetingTime[1]),
          detail:"会议详情",
          type:this.meetingForm.meetingType
        });
        this.meetingDialog = false;
        this.on = true;
      },
      formatDate: function(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y+"-"+m+"-"+d
      },
    },
    created: function(){
    },
    mounted(){
    }
  }
</script>

<style scoped>
  @import '../../style/timeline.css';
  .meeting-container{
    padding-top:50px;
    margin-left:360px;
  }
  .meeting-container>div{
    margin-top:10px;
  }
  .meeting-container .meeting-color{
    float:left;
    margin-left:15px;
    width:30px;
    height:20px;
    border-radius:5px;
  }
  .meeting-container .main{
    background-color: #FF6666;
  }
  .meeting-container .branch{
    background-color: #00B8EC;
  }
  .meeting-container .meeting-text{
    margin-left:50px;
  }
  .pagination{
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
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
  .delete-icon{
    color: #FF6666;
    cursor: pointer;
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
