import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Index from '@/views/index/Index'
import managementHome from '@/views/management/Home'
import List from '@/views/management/list'
import reportHome from '@/views/report/Home'
import reportList from '@/views/report/list'
import reportGeo from '@/views/report/geo'
import reportMeeting from '@/views/report/meetingList'
import reportFinancial from '@/views/report/financialList'
import reportTrading from '@/views/report/tradingList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {path:'/index',name:'index',component:Index},
        {
          path:'/management',
          name:'management',
          component:managementHome,
          children:[
            {path:'/management/list',name:'list',component:List},
          ],
        },
        {
          path:'/report',
          name:'report',
          component:reportHome,
          children:[
            {path:'/report/list',name:'report-list',component:reportList},
            {path:'/report/geo',name:'geo',component:reportGeo},
            {path:'/report/meeting-list',name:'meeting-list',component:reportMeeting},
            {path:'/report/financial-list',name:'financial-list',component:reportFinancial},
            {path:'/report/trading-list',name:'trading-list',component:reportTrading},
          ],
        },
      ]
    }
  ]
})
