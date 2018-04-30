import Vue from 'vue'
import Router from 'vue-router'
import origami from '@/components/origami/index'
// 立方体
import cubeOne from '@/components/origami/cube-one'
import cubetwo from '@/components/origami/cube-two'
// 三角锥
import mitsubishiColumnOne from '@/components/origami/mitsubishi-column-one'
import mitsubishiColumnTwo from '@/components/origami/mitsubishi-column-two'
// 三棱锥
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
import pentagonalPrismTwo from '@/components/origami/pentagonal-prism-two'
// 六棱柱
import hexagonalPrismOne from '@/components/origami/hexagonal-prism-one'
import hexagonalPrismTwo from '@/components/origami/hexagonal-prism-two'
// 圆柱
import cylinderOne from '@/components/origami/cylinder-one'
import cylinderTwo from '@/components/origami/cylinder-two'
// --------------------------棱锥区域--------------------------
import pyramidThreeOne from '@/components/pyramid/three-one'
import pyramidThreeTwo from '@/components/pyramid/three-two'
import pyramidFourOne from '@/components/pyramid/four-one'
import pyramidFourTwo from '@/components/pyramid/four-two'
import pyramidFiveOne from '@/components/pyramid/five-one'
import pyramidFiveTwo from '@/components/pyramid/five-two'
import pyramidSixOne from '@/components/pyramid/six-one'
import pyramidSixTwo from '@/components/pyramid/six-two'

// 活动页面
import activityGame from '@/components/game/activity'

Vue.use(Router)

export default new Router({
  routes: [
    // 程序主入口
    {
      path: '/',
      name: 'root',
      redirect: '/origami/mitsubishiColumnOne'
    },
    {
      path: '/origami',
      name: 'origami',
      component: origami,
      children: [
        // 立方体
        { path: '/origami/cubeTwo', name: 'cube-two', component: cubetwo },
        { path: '/origami/cubeOne', name: 'cube-one', component: cubeOne },
        // 三棱柱
        { path: '/origami/mitsubishiColumnOne', name: 'mitsubishi-column-one', component: mitsubishiColumnOne },
        { path: '/origami/mitsubishiColumnTwo', name: 'mitsubishi-column-two', component: mitsubishiColumnTwo },
        // 长方体
        { path: '/origami/cuboidOne', name: 'cuboid-one', component: cuboidOne },
        { path: '/origami/cuboidTwo', name: 'cuboid-two', component: cuboidTwo },
        { path: '/origami/cuboidThree', name: 'cuboid-three', component: cuboidThree },
        { path: '/origami/cuboidFour', name: 'cuboid-four', component: cuboidFour },
        // 五棱柱
        { path: '/origami/pentagonalPrismOne', name: 'pentagonal-orism-one', component: pentagonalPrismOne },
        { path: '/origami/pentagonalPrismTwo', name: 'pentagonal-orism-two', component: pentagonalPrismTwo },
        // 六棱柱
        { path: '/origami/hexagonalPrismOne', name: 'hexagonal-orism-one', component: hexagonalPrismOne },
        { path: '/origami/hexagonalPrismTwo', name: 'hexagonal-orism-two', component: hexagonalPrismTwo },
        // 圆柱
        { path: '/origami/cylinderOne', name: 'cylinder-one', component: cylinderOne },
        { path: '/origami/cylinderTwo', name: 'cylinder-two', component: cylinderTwo },
        // 三棱锥
        { path: '/origami/trigonometricConeOne', name: 'trigonometric-cone-one', component: trigonometricConeOne },
        { path: '/origami/trigonometricConeTwo', name: 'trigonometric-cone-two', component: trigonometricConeTwo },
        // 三棱锥
        { path: '/origami/pyramidThreeOne', name: 'pyramid-three-one', component: pyramidThreeOne },
        { path: '/origami/pyramidThreeTwo', name: 'pyramid-three-two', component: pyramidThreeTwo },
        // 四棱锥
        { path: '/origami/pyramidFourOne', name: 'pyramid-four-one', component: pyramidFourOne },
        { path: '/origami/pyramidFourTwo', name: 'pyramid-four-two', component: pyramidFourTwo },
        // 五棱锥
        { path: '/origami/pyramidFiveOne', name: 'pyramid-five-one', component: pyramidFiveOne },
        { path: '/origami/pyramidFiveTwo', name: 'pyramid-five-one', component: pyramidFiveTwo },
        // 六棱锥
        { path: '/origami/pyramidSixOne', name: 'pyramid-six-one', component: pyramidSixOne },
        { path: '/origami/pyramidSixTwo', name: 'pyramid-six-one', component: pyramidSixTwo }
      ]
    },
    {
      path: '/activityGame',
      name: 'activityGame',
      component: activityGame
    }
  ]
})
