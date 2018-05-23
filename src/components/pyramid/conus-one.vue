<template lang="pug">
  .conus-one
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
const THREE = require('three')
const stepSave = require('@/assets/step/conus.json')
export default {
  name: 'conusOne',
  data () {
    return {
      camera: null,
      renderer: null,
      scene: null,
      spiale: [],
      meshs: [],
      step: 0,
      stepCount: 90
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
        return false
      }
      if (step > this.stepCount) {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
        return false
      }
      const spiale = this.spiale
      const vLength = 41 // this.meshs[1].geometry.vertices.length / 2
      // console.log(stepSave)
      spiale[1].rotation.x = -step * (Math.PI / 180)
      // -----------------------------
      for (let i = 0; i < vLength; i++) {
        this.meshs[0].geometry.vertices[i].z = stepSave[step][i].z
        this.meshs[0].geometry.vertices[i + 41].z = stepSave[step][i + 41].z
        this.meshs[0].geometry.vertices[i].x = stepSave[step][i].x
        this.meshs[0].geometry.vertices[i + 41].x = stepSave[step][i + 41].x
        this.meshs[0].geometry.vertices[i].y = stepSave[step][i].y
        this.meshs[0].geometry.vertices[i + 41].y = stepSave[step][i + 41].y
      }
      this.meshs[0].geometry.verticesNeedUpdate = true
      return true
    },
    close (step) {
      if (this.getStep(step)) this.nextStep(1, this.close)
    },
    open (step) {
      if (this.getStep(step)) this.nextStep(-1, this.open)
    },
    dragClose (step) {
      if (this.getStep(step)) this.renderScene()
    },
    dragOpen (step) {
      if (this.getStep(step)) this.renderScene()
    },
    creatCube (scene, renderer, camera) {
      const geometry = new THREE.PlaneGeometry(Math.PI, 1, 40, 1)
      let cylinderGeometry = new THREE.CircleGeometry(0.5, 64, 0, 2 * Math.PI)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f']
      // 定义6个坐标
      const positions = [[0, -Math.PI / 4 + 0.75, 0], [0, -0.5, 0]]
      // 定义6个转轴
      const axiss = [[0, 0, 0], [0, -0.5, 0]]
      // ----------------------------
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
        if (index === '1') {
          this.meshs[index] = new THREE.Mesh(cylinderGeometry, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else {
          this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
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
        // 将面变成圆锥
        const vLength = this.meshs[0].geometry.vertices.length / 2
        // console.log(this.meshs[0].geometry.vertices)
        for (let i = 1; i <= vLength; i++) {
          const X = (i - 1) * Math.PI / 40 - Math.PI / 2
          const Y = Math.sqrt(4 - Math.pow(X, 2))
          // console.log(i, X, Y)
          // return
          this.meshs[0].geometry.vertices[i - 1].y -= Math.abs(i - 21) * 0.005
          this.meshs[0].geometry.vertices[i + 40].y = -Y + 1.54
        }
        // console.log(this.meshs[0].geometry.vertices)
        // 将平面添加到场景中
        this.scene.add(this.meshs[index])
        this.spiale[index].add(this.meshs[index])
      }
      // 调试转轴
      // this.spiale[1].add(new THREE.AxesHelper(50))
      setTimeout(() => {
        this.renderScene()
      }, 0)
    }
  }
}
</script>
