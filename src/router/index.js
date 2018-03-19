import Vue from 'vue'
import Router from 'vue-router'
import cubeOne from '@/components/origami/cube-one'
import activityGame from '@/components/game/activity'

Vue.use(Router)

export default new Router({
  routes: [
    // 程序主入口
    {
      path: '/',
      name: 'activityGame',
      component: activityGame
    },
    {
      path: '/cubeOne',
      name: 'cube-one',
      component: cubeOne
    }
  ]
})
