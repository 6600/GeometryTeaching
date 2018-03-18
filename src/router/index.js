import Vue from 'vue'
import Router from 'vue-router'
import cubeOne from '@/components/origami/cube-one'
import activityGame from '@/components/game/activity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cube-one',
      component: cubeOne
    },
    {
      path: '/activityGame',
      name: 'activityGame',
      component: activityGame
    }
  ]
})
