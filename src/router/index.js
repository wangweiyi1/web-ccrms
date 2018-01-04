import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Index from '@/views/index/Index'
import managementHome from '@/views/management/Home'
import List from '@/views/management/list'

Vue.use(Router)

export default new Router({
  routes: [
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
      ]
    }
  ]
})
