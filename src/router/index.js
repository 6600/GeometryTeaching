import Vue from 'vue'
import Router from 'vue-router'
import origami from '@/components/origami/index'
import cubeOne from '@/components/origami/cube-one'
import cubetwo from '@/components/origami/cube-two'
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
      path: '/origami',
      name: 'origami',
      component: origami,
      children: [
        {
          path: '/origami/cubeTwo',
          name: 'cube-two',
          component: cubetwo
        },
        {
          path: '/origami/cubeOne',
          name: 'cube-one',
          component: cubeOne
        }
      ]
    }
  ]
})
