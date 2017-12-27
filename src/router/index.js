import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Index from '@/views/index/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {path:'/index',name:'index',component:Index}
      ]
    }
  ]
})
