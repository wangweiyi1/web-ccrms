// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Timeline , TimelineItem} from 'iview'
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'

import Calendar from './components/calendar/calendar.vue'


Vue.component(Calendar.name, Calendar);
Vue.component('Timeline', Timeline);
Vue.component('TimelineItem', TimelineItem);
Vue.use(ElementUI,{ size: 'small' });
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next({ path: '/index' })
  }else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
