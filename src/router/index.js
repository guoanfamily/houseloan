import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const framePage = resolve => require(['../views/FramePage'], resolve)
const payRate = resolve => require(['@/components/PayRate'], resolve)
const ringChart = resolve => require(['@/components/RingChart'], resolve)
const paymentPage = resolve => require(['../views/PaymentPage'], resolve)
const ZuhePayment = resolve => require(['../views/ZuhePayment'], resolve)
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'FramePage',
    component: framePage,
    meta: { keepAlive: true }
  }, {
    path: '/ringChart',
    name: 'ringChart',
    component: ringChart
  }, {
    path: "/payment",
    name: "paymentPage",
    component: paymentPage
  },
  {
    path: '/ZuhePayment',
    name: 'ZuhePayment',
    component: ZuhePayment
  },]
})