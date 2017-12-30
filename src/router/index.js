import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Index from '@/views/index/Index'
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
        {path:'/list',name:'list',component:List},
      ]
    }
  ]
})
