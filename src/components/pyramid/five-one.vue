<template lang="pug">
  .pyramid-five-one
</template>

<script>
import { Order, Fun } from '@/components/Order.js'
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
const stepSave = require('@/assets/step/five-one.json')
export default {
  name: 'pyramidFourOne',
  data () {
    return {
      camera: null,
      renderer: null,
      spiale: [],
      meshs: [],
      controls: null,
      pause: false,
      step: 0,
      stepCount: 114
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
      const spiale = this.spiale
      if (stepSave[step] !== null) {
        spiale[1].rotation.x = stepSave[step].spiale1rotation.x
        spiale[1].rotation.y = stepSave[step].spiale1rotation.y
        spiale[1].rotation.z = stepSave[step].spiale1rotation.z
        spiale[2].rotation.x = stepSave[step].spiale2rotation.x
        spiale[2].rotation.y = stepSave[step].spiale2rotation.y
        spiale[2].rotation.z = stepSave[step].spiale2rotation.z
        spiale[3].rotation.x = stepSave[step].spiale3rotation.x
        spiale[3].rotation.y = stepSave[step].spiale3rotation.y
        spiale[3].rotation.z = stepSave[step].spiale3rotation.z
        spiale[4].rotation.x = stepSave[step].spiale4rotation.x
        spiale[4].rotation.y = stepSave[step].spiale4rotation.y
        spiale[4].rotation.z = stepSave[step].spiale4rotation.z
        spiale[5].rotation.x = stepSave[step].spiale5rotation.x
        spiale[5].rotation.y = stepSave[step].spiale5rotation.y
        spiale[5].rotation.z = stepSave[step].spiale5rotation.z
      }
      return true
    },
    close (step) {
      if (this.getStep(step)) this.nextStep(1, this.close)
    },
    open (step) {
      if (this.getStep(step)) this.nextStep(-1, this.open)
    },
    dragClose (step) {
      this.step = step
      if (this.getStep(step)) this.renderScene()
    },
    dragOpen (step) {
      this.step = step
      if (this.getStep(step)) this.renderScene()
    },
    creatMitsubishiColumn (scene, renderer, camera) {
      this.controls = new OrbitControls(this.camera, this.$el.childNodes[0])
      const ratio = Math.PI / 180
      // 五边形
      let shape5 = new THREE.Shape()
      shape5.moveTo(0, 0)
      shape5.lineTo(1, 0)
      shape5.lineTo(1 + Math.cos(72 * Math.PI / 180), Math.sin(72 * Math.PI / 180))
      shape5.lineTo(0.5, Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180))
      shape5.lineTo(-Math.cos(72 * Math.PI / 180), Math.sin(72 * Math.PI / 180))
      shape5.lineTo(0, 0)
      let hexaGeometry = new THREE.ShapeGeometry(shape5)
      // 三角形
      let shape1 = new THREE.Shape()
      shape1.moveTo(0, 0)
      shape1.lineTo(1, 0)
      shape1.lineTo(0.5, 0.5 / Math.tan(15 * ratio))
      shape1.lineTo(0, 0)
      let triangleGeometry1 = new THREE.ShapeGeometry(shape1)
      // 定义3个颜色
      const colors = ['#6d64f3', '#cfad1f', '#cdb8f0', '#fbc562', '#f8714e', '#66e931']
      // 定义3个坐标
      const positions = [
        [-0.5, -(Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
      // 定义3个转轴
      const axiss = [
        [0, 0, 0],
        [-Math.cos(72 * Math.PI / 180) - 0.498, Math.sin(72 * Math.PI / 180) - (Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [0.0001, (Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [0.5 + Math.cos(72 * Math.PI / 180), Math.sin(72 * Math.PI / 180) - (Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [0.5, -(Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [-0.5, -(Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0]
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
      // this.spiale[5].add(new THREE.AxesHelper(50))
      this.spiale[1].rotation.z = Math.cos(52 * Math.PI / 180) + 0.01
      this.spiale[2].rotation.z = -Math.cos(50 * Math.PI / 180) + 0.01
      this.spiale[3].rotation.z = -108 * Math.PI / 180
      this.spiale[4].rotation.z = -180 * Math.PI / 180
      this.spiale[5].rotation.z = 108 * Math.PI / 180
      this.animate()
    }
  }
}
</script>
