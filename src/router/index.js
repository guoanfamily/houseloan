import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const framePage = resolve => require(['../views/FramePage'], resolve)
const payRate = resolve => require(['@/components/PayRate'], resolve)
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'FramePage',
    component: framePage
  }, {
    path: '/payRate',
    name: 'PayRate',
    component: payRate
  }]
})