<template lang="pug">
  .cuboid-four
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
const THREE = require('three')
const OrbitControls = require('@puge/three-orbit-controls')(THREE)
const stepSave = require('@/assets/step/cuboid-four.json')
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
      const spiale = this.spiale
      if (stepSave[step] !== null) {
        spiale[0].rotation.set(...stepSave[step].spiale0rotation)
        spiale[1].rotation.set(...stepSave[step].spiale1rotation)
        spiale[3].rotation.set(...stepSave[step].spiale3rotation)
        spiale[4].rotation.set(...stepSave[step].spiale4rotation)
        spiale[5].rotation.set(...stepSave[step].spiale5rotation)
        spiale[5].rotation.set(...stepSave[step].spiale5rotation)
        spiale[5].position.set(...stepSave[step].spiale5position)
        this.meshs[5].position.set(...stepSave[step].meshs5position)
      }
      return true
    },
    close (step) {
      if (this.getStep(step + 2)) this.nextStep(1, this.close)
    },
    open (step) {
      if (this.getStep(step - 2)) this.nextStep(-1, this.open)
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
      // 定义长宽都是1平面
      const geometry = new THREE.PlaneGeometry(0.5, 0.5)
      const geometry1 = new THREE.PlaneGeometry(0.5, 2)
      const geometry2 = new THREE.PlaneGeometry(2, 0.5)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161', '#f46f4c', '#c9b5ec']
      // 定义6个坐标
      const positions = [[-0.25, 0.25, 0], [-0.25, 0, 0], [0, 0, 0], [0, -0.25, 0], [1, -0.25, 0], [1, -0.75, 0]]
      // 定义6个转轴
      const axiss = [[-0.25, 1, 0], [-0.25, 0, 0], [0, 0, 0], [0, -1, 0], [0.25, -1, 0], [0.25, -1, 0]]
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
        if (index === '0' || index === '3') {
          this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1' || index === '2') {
          this.meshs[index] = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '4' || index === '5') {
          this.meshs[index] = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({
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
      // 调试转轴
      // this.spiale[5].add(new THREE.AxesHelper(50))
      this.animate()
    }
  }
}
</script>
