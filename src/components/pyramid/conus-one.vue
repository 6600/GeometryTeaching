<template lang="pug">
  .conus-one
</template>

<script>
import { Fun } from '@/components/Order.js'
const THREE = require('three')
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
      stepCount: 225
    }
  },
  mounted () {
    Fun.init3D(this.$el, (Object3D) => {
      this.camera = Object3D.camera
      this.renderer = Object3D.renderer
      this.scene = Object3D.scene
      this.creatCube(Object3D.scene, Object3D.renderer, Object3D.camera)
    })
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
    close (step) {
      const spiale = this.spiale
      // console.log(this.meshs[0].geometry.vertices)
      // return
      if (step <= 90) {
        spiale[1].rotation.x = -step * (Math.PI / 180)
        // 因为分为上下两个顶点所以要除2
        const vLength = this.meshs[0].geometry.vertices.length / 2
        // console.log(vLength)
        // -----------------------------
        for (let i = 0; i <= vLength - 1; i++) {
          const Z = Math.abs(i - 20) * 0.05
          let X = null
          let X2 = null
          const Y = 2 - Math.sqrt(4 - Math.pow(Math.abs(i - 20) * Math.PI / 40, 2))
          // console.log(i, Y)
          // return
          this.meshs[0].geometry.vertices[i].y -= Y / 90
          this.meshs[0].geometry.vertices[i + 41].y -= Y / 90
          // 中心点慢慢向中心偏移
          // this.meshs[0].geometry.vertices[20].z += 1 / 90
          // this.meshs[0].geometry.vertices[61].z += 1 / 90
          if (i < 20) {
            X = -Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) + (Math.abs(i - 20) * Math.PI / 40)
            this.meshs[0].geometry.vertices[i].x += X / 90 + Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) / 90
          } else {
            X = Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) - (Math.abs(i - 20) * Math.PI / 40)
            this.meshs[0].geometry.vertices[i].x += X / 90 - Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) / 90
          }
          // console.log((20 - Math.abs(i - 20)))
          this.meshs[0].geometry.vertices[i].z = Z / 90 * step + (step * (20 - Math.abs(i - 20)) / 40 / 90)
          this.meshs[0].geometry.vertices[i + 41].z = Z / 90 * step 
          
          this.meshs[0].geometry.vertices[i + 41].x += X / 90
        }
        // console.log(this.meshs[0].geometry.vertices)
        // return
        this.meshs[0].geometry.verticesNeedUpdate = true
        this.nextStep(1, this.close)
      }
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
