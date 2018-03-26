<template lang="pug">
  .pentagonal-prism-two
</template>

<script>
import { Fun } from '@/components/Order.js'
const THREE = require('three')
export default {
  name: 'HelloWorld',
  data () {
    return {
      camera: null,
      renderer: null,
      scene: null,
      spiale: [],
      meshs: [],
      step: 0
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
    nextStep () {
      setTimeout(() => {
        // this.step++
        // this.animation(this.step)
        this.renderScene()
      }, 20)
    },
    renderScene () {
      this.renderer.render(this.scene, this.camera)
    },
    animation (step) {
      const spiale = this.spiale
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * (Math.PI / 180)
        spiale[1].rotation.y = step * (Math.PI / 180)
        // 盒子右部
        spiale[3].rotation.y = -step * (Math.PI / 180)
        // 盒子上部
        spiale[4].rotation.x = step * (Math.PI / 180)
        // 盒子下部
        spiale[5].rotation.x = -step * (Math.PI / 180)
        this.nextStep()
      } else if (step === 91) {
        // 重设0面转轴
        this.meshs[0].position.set(-0.5, 0, 0)
        this.spiale[0].position.set(-0.5, 0, 0.5)
        spiale[0].rotation.y = step * (Math.PI / 180)
        this.nextStep()
      } else if (step < 181) {
        spiale[0].rotation.y = step * (Math.PI / 180)
        this.nextStep()
      } else {
        console.log('动画已播放完毕!')
      }
    },
    creatCube (scene, renderer, camera) {
      // 创建长方体的6个平面
      var pantagonalHigh = Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)
      let shape1 = new THREE.Shape()
      shape1.moveTo(0, 0)
      shape1.lineTo(0, 1)
      shape1.lineTo(-Math.sin(72 * Math.PI / 180), 1 + Math.cos(72 * Math.PI / 180))
      shape1.lineTo(-pantagonalHigh, 0.5)
      shape1.lineTo(-Math.sin(72 * Math.PI / 180), -Math.cos(72 * Math.PI / 180))
      shape1.lineTo(0, 0)
      let pentaGeometry1 = new THREE.ShapeGeometry(shape1)
      let shape2 = new THREE.Shape()
      shape2.moveTo(0, 0)
      shape2.lineTo(0, 1)
      shape2.lineTo(Math.sin(72 * Math.PI / 180), 1 + Math.cos(72 * Math.PI / 180))
      shape2.lineTo(pantagonalHigh, 0.5)
      shape2.lineTo(Math.sin(72 * Math.PI / 180), -Math.cos(72 * Math.PI / 180))
      shape2.lineTo(0, 0)
      let pentaGeometry2 = new THREE.ShapeGeometry(shape2)
      const geometry = new THREE.PlaneGeometry(2, 1)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161', '#f46f4c', '#c9b5ec', '#64e530']
      // 定义6个坐标
      const positions = [[0, -0.5, 0], [-1, 0.5, 0], [-1, -0.5, 0], [1, 1, 0], [1, 0, 0], [1, -1, 0], [2, -0.5, 0]]
      // 定义6个转轴
      const axiss = [[0, 0, 0], [-pantagonalHigh, 0, 0], [-pantagonalHigh, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
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
        if (index === '0') {
          this.meshs[index] = new THREE.Mesh(pentaGeometry1, new THREE.MeshLambertMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1' || index === '3' || index === '2' || index === '4' || index === '5') {
          this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '6') {
          this.meshs[index] = new THREE.Mesh(pentaGeometry2, new THREE.MeshLambertMaterial({
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
      //      this.camera.position.x = 0
      //      this.camera.position.y = 0
      //      this.camera.position.z = 6
      //      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      // this.scene.add(this.meshs[0])
      // this.spiale[0].add(this.meshs[0])
      // 调试转轴
      this.spiale[1].rotation.z = -36 * (Math.PI / 180)
      this.spiale[2].rotation.z = 36 * (Math.PI / 180)
      this.spiale[0].add(new THREE.AxesHelper(50))
      setTimeout(() => {
        this.nextStep()
      }, 0)
    }
  }
}
</script>
