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
// 长方体1
import cuboidOne from '@/components/origami/cuboid-one'
import cuboidTwo from '@/components/origami/cuboid-two'
// 长方体2
import cuboidThree from '@/components/origami/cuboid-three'
import cuboidFour from '@/components/origami/cuboid-four'
// 五棱柱
import pentagonalPrismOne from '@/components/origami/pentagonal-prism-one'
// import pentagonalPrismTwo from '@/components/origami/pentagonal-prism-two'
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
          path: '/origami/cuboidThree',
          name: 'cuboid-three',
          component: cuboidThree
        },
        {
          path: '/origami/cuboidFour',
          name: 'cuboid-four',
          component: cuboidFour
        },
        {
          path: '/origami/pentagonalPrismOne',
          name: 'pentagonal-orism-one',
          component: pentagonalPrismOne
        },
        {
          path: '/origami/cuboidFour',
          name: 'cuboid-four',
          component: cuboidFour
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
