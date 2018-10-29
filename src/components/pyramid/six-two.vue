<template lang="pug">
  .pyramid-six-one
</template>

<script>
import { Order, Fun } from '@/components/Order.js'
const THREE = require('three')
const OrbitControls = require('@puge/three-orbit-controls')(THREE)
const stepSave = require('@/assets/step/six-two.json')
export default {
  name: 'pyramidSixOne',
  data () {
    return {
      camera: null,
      renderer: null,
      spiale: [],
      meshs: [],
      pause: false,
      step: 0,
      controls: null,
      stepCount: 562
    }
  },
  mounted () {
    // 创建3D环境
    Fun.init3D(this.$el, (Object3D) => {
      this.camera = Object3D.camera
      this.renderer = Object3D.renderer
      this.scene = Object3D.scene
      this.creatMitsubishiColumn(Object3D.scene, Object3D.renderer, Object3D.camera)
    })
    // 监听暂停事件
    Order.$on(`pause`, () => {
      this.pause = true
    })
  },
  beforeDestroy () { // 移除监听
    Order.$off('pause')
  },
  methods: {
    animate () {
      requestAnimationFrame(this.animate)
      this.renderScene()
    },
    nextStep (space, callback) {
      // console.log('关闭盒子', auto)
      setTimeout(() => {
        this.step += space
        this.$emit('stepChange', this.step)
        // 判断是否暂停
        if (this.pause) {
          this.pause = false
        } else {
          callback(this.step)
        }
        this.renderScene()
      }, 20)
    },
    renderScene () {
      this.renderer.render(this.scene, this.camera)
    },
    getStep (step) {
      if (step <= 0) {
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      // console.log(step)
      if (step > this.stepCount) {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step === this.stepCount) {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      if (stepSave[step]) {
        this.spiale[1].rotation.set(...stepSave[step].spiale1rotate)
        this.spiale[2].rotation.set(...stepSave[step].spiale2rotate)
        this.spiale[3].rotation.set(...stepSave[step].spiale3rotate)
        this.spiale[4].rotation.set(...stepSave[step].spiale4rotate)
        this.spiale[5].rotation.set(...stepSave[step].spiale5rotate)
        this.spiale[6].rotation.set(...stepSave[step].spiale6rotate)
        this.meshs[2].rotation.set(...stepSave[step].meshs2rotate)
        this.meshs[2].position.set(...stepSave[step].meshs2position)
        this.meshs[4].rotation.set(...stepSave[step].meshs4rotate)
      }
      return true
    },
    close (step) {
      if (this.getStep(step + 2)) this.nextStep(2, this.close)
    },
    open (step) {
      if (step > this.stepCount) step = this.stepCount
      if (this.getStep(step - 2)) this.nextStep(-2, this.open)
    },
    dragClose (step) {
      if (this.getStep(step)) this.renderScene()
    },
    dragOpen (step) {
      if (this.getStep(step)) this.renderScene()
    },
    creatMitsubishiColumn (scene, renderer, camera) {
      this.controls = new OrbitControls(this.camera, this.$el.childNodes[0])
      const ratio = Math.PI / 180
      // 六边形
      let shape5 = new THREE.Shape()
      shape5.moveTo(-Math.cos(30 * ratio), -0.5)
      shape5.lineTo(-Math.cos(30 * ratio), 0.5)
      shape5.lineTo(0, 1)
      shape5.lineTo(Math.cos(30 * ratio), 0.5)
      shape5.lineTo(Math.cos(30 * ratio), -0.5)
      shape5.lineTo(0, -1)
      shape5.lineTo(-Math.cos(30 * ratio), -0.5)
      let hexaGeometry = new THREE.ShapeGeometry(shape5)
      // 三角形
      let shape1 = new THREE.Shape()
      shape1.moveTo(0, 0)
      shape1.lineTo(1, 0)
      shape1.lineTo(0.5, 1.4)
      shape1.lineTo(0, 0)
      let triangleGeometry1 = new THREE.ShapeGeometry(shape1)
      // 定义3个颜色
      const colors = ['#80f2d8', '#6b63ef', '#64e530', '#ccaa1f', '#c9b5ec', '#f6c161', '#f36f4c']
      // 定义3个坐标
      const positions = [
        [0, 0, 0],
        [0, 0, 0],
        [-0.77, 0.64, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
      // 定义3个转轴
      const axiss = [
        [0, 0, 0],
        [-Math.cos(30 * ratio), -0.5, 0],
        [0, 1, 0],
        [0, 1, 0],
        [Math.cos(30 * ratio), 0.5, 0],
        [Math.cos(30 * ratio), -0.5, 0],
        [0, -1, 0]
      ]
      // 创造3个平面
      for (let index in colors) {
        // 取得颜色
        const color = colors[index]
        // 取得坐标
        const position = positions[index]
        // 取得转轴
        const axis = axiss[index]
        // 创建转轴
        this.spiale[index] = new THREE.Object3D()
        this.spiale[index].position.set(axis[0], axis[1], axis[2])
        this.scene.add(this.spiale[index])
        if (index === '0') {
          this.meshs[index] = new THREE.Mesh(hexaGeometry, new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else {
          this.meshs[index] = new THREE.Mesh(triangleGeometry1, new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        }
        // 设置平面位置
        this.meshs[index].position.set(position[0], position[1], position[2])
        // 设置平面角度
        this.meshs[index].rotation.set(0, 0, 0)
        // 设置平面缩放
        this.meshs[index].scale.set(1, 1, 1)
        // console.log(this.meshs[index])
        // 取消面剔除
        this.meshs[index].doubleSided = true
        this.meshs[index].castShadow = true
        // 将平面添加到场景中
        this.scene.add(this.meshs[index])
        this.spiale[index].add(this.meshs[index])
      }
      // this.spiale[4].add(new THREE.AxesHelper(50))
      this.spiale[1].rotation.z = 90 * ratio
      this.spiale[2].rotation.z = -30 * ratio
      this.meshs[2].rotation.z = -39 * ratio
      this.spiale[3].rotation.z = -30 * ratio
      this.spiale[4].rotation.z = -30 * ratio
      this.meshs[4].rotation.z = 39.2 * ratio
      this.spiale[5].rotation.z = -150 * ratio
      this.spiale[6].rotation.z = 150 * ratio
      this.animate()
    }
  }
}
</script>
