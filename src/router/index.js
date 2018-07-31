import Vue from 'vue'
import Router from 'vue-router'
import pay from '@/components/pay'
import ios_pay from '@/components/ios_pay'
import aboutUs from '@/components/aboutUs'
import home from '@/components/home'
import draw from '@/components/draw'
import feedback from '@/components/feedback'
import yuanbi from '@/components/yuanbi'
import yuandou from '@/components/yuandou'
import approve from '@/components/approve'
import bindzh from '@/components/bindzh'
import bind_zfb from '@/components/bindzfb'
import privacy from '@/components/privacy'
import newPay from '@/components/newPay'
import pullRefresh from '@/components/pull-refresh'
import ios_approve from '@/components/ios/ios_approve'

import scroll from '@/components/scroll'

import ios_bindzh from '@/components/ios/ios_bindzh'
import ios_draw from '@/components/ios/ios_draw'
import ios_feedback from '@/components/ios/ios_feedback'

import ios_bindzfb from '@/components/ios/ios_bindzfb'


Vue.use(Router)
export default new Router({
  routes: [
    {path: '/',name: 'pay',component: pay},
    {path: '/ios_pay',name: 'ios_pay',component: ios_pay},
    {path: '/newPay',name: 'newPay',component: newPay},
    {path: '/home',name: 'home',component: home},
    {path: '/draw',name: 'draw',component: draw},
    {path: '/feedback',name: 'feedback', component: feedback},
    {path: '/yuanbi',name: 'yuanbi', component: yuanbi},
    {path: '/yuandou',name: 'yuandou', component: yuandou},
    {path: '/approve',name: 'approve', component: approve},    
    {path: '/bindzh',name: 'bindzh', component: bindzh},  
    {path: '/pullRefresh',name: 'pullRefresh', component: pullRefresh},  
    {path: '/scroll',name: 'scroll', component: scroll},  
    {path: '/ios_approve',name: 'ios_approve', component: ios_approve}, 
    {path: '/ios_bindzh',name: 'ios_bindzh', component: ios_bindzh}, 
    {path: '/ios_draw',name: 'ios_draw', component: ios_draw}, 
    {path: '/ios_feedback',name: 'ios_feedback', component: ios_feedback}, 
    {path: '/bind_zfb',name: 'bind_zfb', component: bind_zfb},
    {path: '/ios_bindzfb',name: 'ios_bindzfb', component: ios_bindzfb},
    {path: '/privacy',name: 'privacy', component: privacy},
    {path: '/aboutUs',name: 'aboutUs', component: aboutUs}
  ]
})
