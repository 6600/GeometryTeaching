<template lang="pug">
  .hexagonal-prism-one
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
const stepSave = require('@/assets/step/hexagonal-prism-one.json')
export default {
  name: 'HelloWorld',
  data () {
    return {
      camera: null,
      renderer: null,
      scene: null,
      spiale: [],
      meshs: [],
      step: 0,
      controls: null,
      stepCount: 270
    }
  },
  mounted () {
    Fun.init3D(this.$el, (Object3D) => {
      this.camera = Object3D.camera
      this.renderer = Object3D.renderer
      this.scene = Object3D.scene
      this.creatCube(Object3D.scene, Object3D.renderer, Object3D.camera)
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
      if (stepSave[step] !== null) {
        this.spiale[0].rotation.set(...stepSave[step].spiale0rotation)
        this.spiale[1].rotation.set(...stepSave[step].spiale1rotation)
        this.spiale[2].rotation.set(...stepSave[step].spiale2rotation)
        this.spiale[4].rotation.set(...stepSave[step].spiale4rotation)
        this.spiale[5].rotation.set(...stepSave[step].spiale5rotation)
        this.spiale[6].rotation.set(...stepSave[step].spiale6rotation)
        this.spiale[7].rotation.set(...stepSave[step].spiale7rotation)
        this.meshs[1].position.set(...stepSave[step].meshs1position)
        this.spiale[1].position.set(...stepSave[step].spiale1position)
        this.meshs[5].position.set(...stepSave[step].meshs5position)
        this.spiale[5].position.set(...stepSave[step].spiale5position)
        this.meshs[6].position.set(...stepSave[step].meshs6position)
        this.spiale[6].position.set(...stepSave[step].spiale6position)
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
    creatCube (scene, renderer, camera) {
      this.controls = new OrbitControls(this.camera, this.$el.childNodes[0])
      // 创建长方体的6个平面
      var hexgonalHigh = Math.sqrt(3)
      let shape1 = new THREE.Shape()
      shape1.moveTo(0, 0)
      shape1.lineTo(1, 0)
      shape1.lineTo(1.5, hexgonalHigh / 2)
      shape1.lineTo(1, hexgonalHigh)
      shape1.lineTo(0, hexgonalHigh)
      shape1.lineTo(-0.5, hexgonalHigh / 2)
      shape1.lineTo(0, 0)
      let hexaGeometry = new THREE.ShapeGeometry(shape1)
      const geometry = new THREE.PlaneGeometry(1, 2)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#ffb8d2', '#f46f4c', '#c9b5ec', '#edf766', '#64e530']
      // 定义6个坐标
      const positions = [[0, 0, 0], [-1.5, 0, 0], [-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [1.5, 0, 0], [2.5, 0, 0], [0, -Math.sqrt(3), 0]]
      // 定义6个转轴
      const axiss = [[-0.5, 1, 0], [-0.5, 0, 0], [-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [0.5, 0, 0], [0.5, 0, 0], [-0.5, -1, 0]]
      // 创造6个平面
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
        if (index === '0' || index === '7') {
          this.meshs[index] = new THREE.Mesh(hexaGeometry, new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1' || index === '3' || index === '2' || index === '4' || index === '5' || index === '6') {
          this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
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
        // 取消面剔除
        this.meshs[index].doubleSided = true
        this.meshs[index].castShadow = true
        // 将平面添加到场景中
        this.scene.add(this.meshs[index])
        this.spiale[index].add(this.meshs[index])
      }
      // this.spiale[6].add(new THREE.AxesHelper(50))
      this.animate()
    }
  }
}
</script>
