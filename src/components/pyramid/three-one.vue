<template lang="pug">
  .pyramid-three-one
</template>

<script>
import { Order, Fun } from '@/components/Order.js'
const THREE = require('three')
const OrbitControls = require('@puge/three-orbit-controls')(THREE)
const stepSave = require('@/assets/step/three-one.json')
export default {
  name: 'mitsubishiColumnOne',
  data () {
    return {
      camera: null,
      renderer: null,
      spiale: [],
      meshs: [],
      pause: false,
      step: 0,
      controls: null,
      stepCount: 330
    }
  },
  mounted () {
    console.log(this.stepSave)
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
      if (step < 0) {
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
        this.spiale[0].rotation.x = stepSave[step].spiale0rotate[0]
        this.spiale[0].rotation.y = stepSave[step].spiale0rotate[1]
        this.spiale[0].rotation.z = stepSave[step].spiale0rotate[2]
        this.spiale[1].rotation.x = stepSave[step].spiale1rotate[0]
        this.spiale[1].rotation.y = stepSave[step].spiale1rotate[1]
        this.spiale[1].rotation.z = stepSave[step].spiale1rotate[2]
        this.spiale[2].rotation.x = stepSave[step].spiale2rotate[0]
        this.spiale[2].rotation.y = stepSave[step].spiale2rotate[1]
        this.spiale[2].rotation.z = stepSave[step].spiale2rotate[2]
      }
      return true
    },
    close (step) {
      if (this.getStep(step + 1)) this.nextStep(1, this.close)
    },
    open (step) {
      if (this.getStep(step - 1)) this.nextStep(-1, this.open)
    },
    dragClose (step) {
      if (step <= 0) {
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return false
      }
      if (step >= this.stepCount) {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.spiale[0].rotation.x = stepSave[step].spiale0rotate[0]
      this.spiale[0].rotation.y = stepSave[step].spiale0rotate[1]
      this.spiale[0].rotation.z = stepSave[step].spiale0rotate[2]
      this.spiale[1].rotation.x = stepSave[step].spiale1rotate[0]
      this.spiale[1].rotation.y = stepSave[step].spiale1rotate[1]
      this.spiale[1].rotation.z = stepSave[step].spiale1rotate[2]
      this.spiale[2].rotation.x = stepSave[step].spiale2rotate[0]
      this.spiale[2].rotation.y = stepSave[step].spiale2rotate[1]
      this.spiale[2].rotation.z = stepSave[step].spiale2rotate[2]
      if (step >= this.stepCount) {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.renderScene()
    },
    dragOpen (step) {
      this.dragClose(step)
    },
    creatMitsubishiColumn (scene, renderer, camera) {
      this.controls = new OrbitControls(this.camera, this.$el.childNodes[0])
      const ratio = Math.PI / 180
      let shape1 = new THREE.Shape()
      shape1.moveTo(0, 0)
      shape1.lineTo(1, 0)
      shape1.lineTo(0.5, Math.sqrt(3) / 2)
      shape1.lineTo(0, 0)
      let triangleGeometry1 = new THREE.ShapeGeometry(shape1)
      let shape2 = new THREE.Shape()
      shape2.moveTo(0, 0)
      shape2.lineTo(1, 0)
      shape2.lineTo(0.5, -Math.sqrt(3) / 2)
      shape2.lineTo(0, 0)
      let triangleGeometry2 = new THREE.ShapeGeometry(shape2)
      // 定义3个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161']
      // 定义3个坐标
      const positions = [[0, 0, 0], [0, 0, 0], [-0.5, 0, 0], [-0.5, 0, 0]]
      // 定义3个转轴
      const axiss = [[-0.5, 0, 0], [0, -Math.sqrt(3) / 2, 0], [0, 0, 0], [0, 0, 0]]
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
        if (index === '2') {
          this.meshs[index] = new THREE.Mesh(triangleGeometry1, new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else {
          this.meshs[index] = new THREE.Mesh(triangleGeometry2, new THREE.MeshBasicMaterial({
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
      // this.spiale[1].add(new THREE.AxesHelper(50))
      this.spiale[0].rotation.z = -60 * ratio
      this.spiale[1].rotation.z = 60 * ratio
      this.animate()
    }
  }
}
</script>
