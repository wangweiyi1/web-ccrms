<template>
    <div id="calendar">
      <!-- 年份 月份 -->
      <div class="month">
        <ul>
          <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
          <li class="year-month" @click="pickYear(currentYear,currentMonth)">
            <span class="choose-year">{{ currentYear }}  {{ currentMonth }}月</span>
            <!--<span class="choose-month"></span>-->
          </li>
          <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
        </ul>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li style="color:red">六</li>
        <li style="color:red">日</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <li @click="pick(day)" v-for="day in days">
          <!--本月-->
          <span v-if="day.date.getMonth()+1 != currentMonth" class="other-month">{{ day.date.getDate() }}</span>
          <span v-else>
            <!--今天-->
            <!--<span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()"-->
                  <!--:class="[meetingDate.indexOf(currentYear + '-' + currentMonth + '-' + day.getDate()) != -1 ? 'meeting today' : 'today']">{{ day.getDate() }}</span>-->

            <!--<span v-if="mainMeetingDate.indexOf(currentYear + '-' + currentMonth + '-' + day.getDate()) != -1" class="meeting-main">{{ day.getDate() }}</span>-->
            <!--<span v-else-if="branchMeetingDate.indexOf(currentYear + '-' + currentMonth + '-' + day.getDate()) != -1" class="meeting-branch">-->
              <!--<el-tooltip effect="dark" content="提示文字" placement="bottom">-->
                <!--<span>{{ day.getDate() }}</span>-->
              <!--</el-tooltip>-->
            <!--</span>-->
            <!--<span v-else>{{ day.getDate() }}</span>-->

            <template v-if="day.meeting">
              <span v-if="day.meeting.type == 'main'" :class="[Number(day.date.getDate()) >= 10 ? 'meeting-main small-active' : 'meeting-main']">
                <el-tooltip effect="dark" :content="day.meeting.detail" placement="bottom">
                  <span>{{ day.date.getDate() }}</span>
                </el-tooltip>
              </span>
              <span v-else-if="day.meeting.type == 'branch'" :class="[Number(day.date.getDate()) >= 10 ? 'meeting-branch small-active' : 'meeting-branch']">
                <el-tooltip effect="dark" :content="day.meeting.detail" placement="bottom">
                  <span>{{ day.date.getDate() }}</span>
                </el-tooltip>
              </span>
              <span v-else-if="day.meeting.type == 'schedule'" :class="[Number(day.date.getDate()) >= 10 ? 'schedule small-active' : 'schedule']">
                <el-tooltip effect="dark" :content="day.meeting.detail" placement="bottom">
                  <span>{{ day.date.getDate() }}</span>
                </el-tooltip>
              </span>
            </template>
            <template v-else>
              <span>{{ day.date.getDate() }}</span>
            </template>
          </span>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: 'calendar',
    props: {
      meetingData: Array,
    },
    data() {
      return {
        mainMeetingDate:[],
        branchMeetingDate:[],
        meetingDate:[],
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
      };
    },
    watch:{
      meetingData:function(val,val2){
        this.initMeetingDate(val2);
      },
    },
    methods: {
      initMeetingDate:function(data){
        var newDates = this.dataScope(data[data.length-1].startDate,data[data.length-1].endDate);
        for(var i=0;i<this.days.length;i++){
          var day = this.formatDate(this.days[i].date.getFullYear(),this.days[i].date.getMonth() + 1,this.days[i].date.getDate());
          if(newDates.indexOf(day) != -1){
            this.days[i].meeting = data[data.length-1];
            console.log(this.days[i]);
          }
        }
      },
      initData: function(cur) {
        var date;
        if (cur) {
          date = new Date(cur);
        } else {
          date = new Date();
        }
        this.currentDay = date.getDate();
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.currentWeek = date.getDay(); // 1...6,0
        if (this.currentWeek == 0) {
          this.currentWeek = 7;
        }
        var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
        this.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个
        for (var i = this.currentWeek - 1; i >= 0; i--) {
//          var d = new Date(str);
//          d.setDate(d.getDate() - i);
//          this.days.push(d);
          var d = new Date(str);
          d.setDate(d.getDate() - i);
          var dString = this.formatDate(d.getFullYear(),d.getMonth() + 1,d.getDate());
          var date = {date:d};
          for(var j=0;j<this.meetingData.length;j++){
            if(this.dataScope(this.meetingData[j].startDate,this.meetingData[j].endDate).indexOf(dString) != -1){
              date.meeting = this.meetingData[j];
            }
          }
          this.days.push(date);
        }
        for (var i = 1; i <= 35 - this.currentWeek; i++) {
//          var d = new Date(str);
//          d.setDate(d.getDate() + i);
//          this.days.push(d);
          var d = new Date(str);
          d.setDate(d.getDate() + i);
          var dString = this.formatDate(d.getFullYear(),d.getMonth() + 1,d.getDate());
          var date = {date:d};
          for(var j=0;j<this.meetingData.length;j++){
            if(this.dataScope(this.meetingData[j].startDate,this.meetingData[j].endDate).indexOf(dString) != -1){
              date.meeting = this.meetingData[j];
            }
          }
          this.days.push(date);
        }
      },
      pick: function(date) {
        //点击天
        date.day = this.formatDate( date.date.getFullYear() , date.date.getMonth() + 1, date.date.getDate());
        this.$emit('click-day',date);
      },
      pickPre: function(year, month) {
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        var d = new Date(this.formatDate(year , month , 1));
        d.setDate(0);
        this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
      },
      pickNext: function(year, month) {
        var d = new Date(this.formatDate(year , month , 1));
        d.setDate(35);
        this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
      },
      pickYear: function(year, month) {
        //点击年
//        alert(year + "," + month);
      },

      // 返回 类似 2016-01-02 格式的字符串
      formatDate: function(year,month,day){
        var y = year;
        var m = month;
        if(m<10) m = m;
        var d = day;
        if(d<10) d = d;
        return y+"-"+m+"-"+d
      },
      dataScope:function(value1, value2) {
        if(value1 == value2){
          return [value1];
        }
        var getDate = function(str) {
          var tempDate = new Date();
          var list = str.split("-");
          tempDate.setFullYear(list[0]);
          tempDate.setMonth(list[1] - 1);
          tempDate.setDate(list[2]);
          return tempDate;
        }
        var date1 = getDate(value1);
        var date2 = getDate(value2);
        if (date1 > date2) {
          var tempDate = date1;
          date1 = date2;
          date2 = tempDate;
        }
        var dateArr = [];
        dateArr.push(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate().toString());
        date1.setDate(date1.getDate() + 1);
        var i = 1;
        while (!(date1.getFullYear() == date2.getFullYear()
        && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
          .getDate())) {
          var dayStr = date1.getDate().toString();
          dateArr[i] = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-"
            + dayStr;
          i++;
          // document.write(dateArr[i] + "<br>");
          date1.setDate(date1.getDate() + 1);
        }
        dateArr.push(date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate().toString());
        return dateArr;
      },
    },
    created: function() {
      this.initData(null);
      this.initMeetingDate(this.meetingData);
      this.pickNext(this.currentYear,this.currentMonth);
      this.pickPre(this.currentYear,this.currentMonth);
    },
    mounted(){
//      console.log(this.meetingDate);
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  ul {
    list-style-type: none;
  }

  body {
    font-family: Verdana, sans-serif;
    background: #E8F0F3;
  }
  #calendar{
    width:100%;
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
  }
  .month {
    width: 100%;
    background: #00B8EC;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }

  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
  }

  .choose-month {
    text-align: center;
    font-size: 1.5rem;
  }

  .arrow {
    padding: 10px 30px;
  }

  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #00B8EC;
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 1.3rem;
    color: #000;
    cursor: pointer;
  }

  .days li .today {
    padding: 6px 10px;
    border-radius: 50%;
    background: #00B8EC;
    color: #fff;
  }

  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }

  .days li:hover {
    background: #e1e1e1;
  }

  .meeting-main{
    padding: 6px 10px;
    border-radius: 50%;
    /*border:1px solid #FF6666;*/
    background: #FF6666;
    color: #fff;
  }
  .meeting-branch{
    padding: 6px 10px;
    border-radius: 50%;
    /*border:1px solid #99CC66;*/
    background: #00B8EC;
    color: #fff;
  }
  .schedule{
    padding: 6px 10px;
    border-radius: 50%;
    background: #fe9223;
    color: #fff;
  }
  .small-active{
    padding: 6px 6px !important;
  }
</style>
