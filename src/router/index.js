import Vue from 'vue'
import Router from 'vue-router'
import origami from '@/components/origami/index'
import cubeOne from '@/components/origami/cube-one'
import cubetwo from '@/components/origami/cube-two'
import mitsubishiColumnOne from '@/components/origami/mitsubishi-column-one'
import mitsubishiColumnTwo from '@/components/origami/mitsubishi-column-two'
// 三角锥
import trigonometricConeOne from '@/components/origami/trigonometric-cone-one'
import trigonometricConeTwo from '@/components/origami/trigonometric-cone-two'
import cuboidOne from '@/components/origami/cuboid-one'
import cuboidTwo from '@/components/origami/cuboid-two'
import activityGame from '@/components/game/activity'

Vue.use(Router)

export default new Router({
  routes: [
    // 程序主入口
    {
      path: '/',
      name: 'root',
      redirect: '/origami/cubeOne'
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
        },
        {
          path: '/origami/mitsubishiColumnOne',
          name: 'mitsubishi-column-one',
          component: mitsubishiColumnOne
        },
        {
          path: '/origami/mitsubishiColumnTwo',
          name: 'mitsubishi-column-two',
          component: mitsubishiColumnTwo
        },
        {
          path: '/origami/cuboidOne',
          name: 'cuboid-one',
          component: cuboidOne
        },
        {
          path: '/origami/cuboidTwo',
          name: 'cuboid-two',
          component: cuboidTwo
        },
        {
          path: '/origami/trigonometricConeOne',
          name: 'trigonometric-cone-one',
          component: trigonometricConeOne
        },
        {
          path: '/origami/trigonometricConeTwo',
          name: 'trigonometric-cone-two',
          component: trigonometricConeTwo
        }
      ]
    },
    {
      path: '/activityGame',
      name: 'activityGame',
      component: activityGame
    }
  ]
})
