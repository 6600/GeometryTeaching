import Vue from 'vue'
import Router from 'vue-router'
import origami from '@/components/origami/index'
// 立方体
import cubeOne from '@/components/origami/cube-one'
import cubetwo from '@/components/origami/cube-two'
// 三角锥
import mitsubishiColumnOne from '@/components/origami/mitsubishi-column-one'
import mitsubishiColumnTwo from '@/components/origami/mitsubishi-column-two'
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
import pyramidConus from '@/components/pyramid/conus-one'
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
        { path: '/origami/cubeTwo', name: '正方体-two', component: cubetwo },
        { path: '/origami/cubeOne', name: '正方体-one', component: cubeOne },
        // 三棱柱
        { path: '/origami/mitsubishiColumnOne', name: '三角柱体-one', component: mitsubishiColumnOne },
        { path: '/origami/mitsubishiColumnTwo', name: '三角柱体-two', component: mitsubishiColumnTwo },
        // 长方体
        { path: '/origami/cuboidOne', name: '长方体-one', component: cuboidOne },
        { path: '/origami/cuboidTwo', name: '长方体-two', component: cuboidTwo },
        { path: '/origami/cuboidThree', name: '长方体-three', component: cuboidThree },
        { path: '/origami/cuboidFour', name: '长方体-four', component: cuboidFour },
        // 五棱柱
        { path: '/origami/pentagonalPrismOne', name: '五角柱体-one', component: pentagonalPrismOne },
        { path: '/origami/pentagonalPrismTwo', name: '五角柱体-two', component: pentagonalPrismTwo },
        // 六棱柱
        { path: '/origami/hexagonalPrismOne', name: '六角柱体-one', component: hexagonalPrismOne },
        { path: '/origami/hexagonalPrismTwo', name: '六角柱体-two', component: hexagonalPrismTwo },
        // 圆柱
        { path: '/origami/cylinderOne', name: '圆柱-one', component: cylinderOne },
        { path: '/origami/cylinderTwo', name: '圆柱-two', component: cylinderTwo },
        // 三棱锥
        { path: '/origami/pyramidThreeOne', name: '三角棱锥-one', component: pyramidThreeOne },
        { path: '/origami/pyramidThreeTwo', name: '三角棱锥-two', component: pyramidThreeTwo },
        // 四棱锥
        { path: '/origami/pyramidFourOne', name: '四角棱锥-one', component: pyramidFourOne },
        { path: '/origami/pyramidFourTwo', name: '四角棱锥-two', component: pyramidFourTwo },
        // 五棱锥
        { path: '/origami/pyramidFiveOne', name: '五角棱锥-one', component: pyramidFiveOne },
        { path: '/origami/pyramidFiveTwo', name: '五角棱锥-two', component: pyramidFiveTwo },
        // 六棱锥
        { path: '/origami/pyramidSixOne', name: '六角棱锥-one', component: pyramidSixOne },
        { path: '/origami/pyramidSixTwo', name: '六角棱锥-two', component: pyramidSixTwo },
        // 圆锥
        { path: '/origami/pyramidConus', name: '圆锥-one', component: pyramidConus }
      ]
    },
    {
      path: '/activityGame',
      name: 'activityGame',
      component: activityGame
    }
  ]
})
