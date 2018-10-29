<template lang="pug">
  .cube-two
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
const THREE = require('three')
const OrbitControls = require('@puge/three-orbit-controls')(THREE)
const stepSave = require('@/assets/step/cube-two.json')
export default {
  name: 'HelloWorld',
  data () {
    return {
      camera: null,
      renderer: null,
      spiale: [],
      meshs: [],
      step: 0,
      controls: null,
      stepCount: 450,
      stepSave: []
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
      if (!stepSave[step]) {
        return true
      }
      spiale[0].rotation.x = stepSave[step].spiale0rotation._x
      spiale[0].rotation.y = stepSave[step].spiale0rotation._y
      spiale[0].rotation.z = stepSave[step].spiale0rotation._z
      spiale[1].rotation.x = stepSave[step].spiale1rotation._x
      spiale[1].rotation.y = stepSave[step].spiale1rotation._y
      spiale[1].rotation.z = stepSave[step].spiale1rotation._z
      spiale[3].rotation.x = stepSave[step].spiale3rotation._x
      spiale[3].rotation.y = stepSave[step].spiale3rotation._y
      spiale[3].rotation.z = stepSave[step].spiale3rotation._z
      spiale[4].rotation.x = stepSave[step].spiale4rotation._x
      spiale[4].rotation.y = stepSave[step].spiale4rotation._y
      spiale[4].rotation.z = stepSave[step].spiale4rotation._z
      spiale[5].rotation.x = stepSave[step].spiale5rotation._x
      spiale[5].rotation.y = stepSave[step].spiale5rotation._y
      spiale[5].rotation.z = stepSave[step].spiale5rotation._z
      this.meshs[4].position.x = stepSave[step].meshs4position.x
      this.meshs[4].position.y = stepSave[step].meshs4position.y
      this.meshs[4].position.z = stepSave[step].meshs4position.z
      this.spiale[4].position.x = stepSave[step].spiale4position.x
      this.spiale[4].position.y = stepSave[step].spiale4position.y
      this.spiale[4].position.z = stepSave[step].spiale4position.z
      this.meshs[5].position.x = stepSave[step].meshs5position.x
      this.meshs[5].position.y = stepSave[step].meshs5position.y
      this.meshs[5].position.z = stepSave[step].meshs5position.z
      this.spiale[5].position.x = stepSave[step].spiale5position.x
      this.spiale[5].position.y = stepSave[step].spiale5position.y
      this.spiale[5].position.z = stepSave[step].spiale5position.z
      // this.meshs[5].position.set(...stepSave[step].meshs5position)
      // this.spiale[5].position.set(...stepSave[step].spiale5position)
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
      // 创建正方体的6个平面
      // 定义长宽都是1平面
      const geometry = new THREE.PlaneGeometry(1, 1)
      // 定义6个颜色
      const colors = ['#fc734f', '#ffc864', '#6f66f7', '#d0bbf4', '#d3b020', '#68ed32']
      // 定义6个坐标
      // const positions = [[-1.5, 0, 0], [-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0]]
      const positions = [[-0.5, -0.5, 0], [0, -0.5, 0], [-0.5, -1, 0], [0.5, 0, 0], [0.5, 1, 0], [1.5, 1, 0]]
      // 定义6个转轴
      const axiss = [[-1, 0.5, 0], [-0.5, -0.5, 0], [0, 1, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
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
        this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          // 双面双面贴图
          side: THREE.DoubleSide
        }))
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
      // this.spiale[4].add(new THREE.AxesHelper(50))
      // this.spiale[5].add(new THREE.AxesHelper(50))
      this.animate()
    }
  }
}
</script>
