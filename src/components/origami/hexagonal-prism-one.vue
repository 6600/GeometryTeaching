<template lang="pug">
  .hexagonal-prism-one
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
        this.step++
        this.animation(this.step)
        this.renderScene()
      }, 20)
    },
    renderScene () {
      this.renderer.render(this.scene, this.camera)
    },
    animation (step) {
      if (step === 1) {
        this.meshs[0].position.set(0, 0, 0)
        this.spiale[0].position.set(-0.5, 1, 0)
        this.meshs[7].position.set(0, -Math.sqrt(3), 0)
        this.spiale[7].position.set(-0.5, -1, 0)
        // 左边[-2, 0, 0], [-1, 0, 0]
        this.meshs[1].position.set(-1.5, 0, 0)
        this.spiale[1].position.set(-0.5, 0, 0)
        this.meshs[2].position.set(-0.5, 0, 0)
        this.spiale[2].position.set(-0.5, 0, 0)
        // 右边[1, 0, 0], [2, 0, 0], [3, 0, 0]
        this.meshs[4].position.set(0.5, 0, 0)
        this.spiale[4].position.set(0.5, 0, 0)
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(0.5, 0, 0)
        this.meshs[6].position.set(2.5, 0, 0)
        this.spiale[6].position.set(0.5, 0, 0)
        // 旋转
        this.spiale[0].rotateX(1 * (Math.PI / 180))
        this.spiale[7].rotateX(-1 * (Math.PI / 180))
        this.spiale[1].rotateY(1 * (Math.PI / 180))
        this.spiale[2].rotateY(1 * (Math.PI / 180))
        this.spiale[4].rotateY(-1 * (Math.PI / 180))
        this.spiale[5].rotateY(-1 * (Math.PI / 180))
        this.spiale[6].rotateY(-1 * (Math.PI / 180))
        this.nextStep()
      } else if (step <= 60) {
        this.spiale[0].rotateX(1 * (Math.PI / 180))
        this.spiale[7].rotateX(-1 * (Math.PI / 180))
        this.spiale[1].rotateY(1 * (Math.PI / 180))
        this.spiale[2].rotateY(1 * (Math.PI / 180))
        this.spiale[4].rotateY(-1 * (Math.PI / 180))
        this.spiale[5].rotateY(-1 * (Math.PI / 180))
        this.spiale[6].rotateY(-1 * (Math.PI / 180))
        this.nextStep()
      } else if (step === 61) {
        this.meshs[1].position.set(-0.5, 0, 0)
        this.spiale[1].position.set(-1, 0, Math.sqrt(3) / 2)
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(1, 0, Math.sqrt(3) / 2)
        this.meshs[6].position.set(1.5, 0, 0)
        this.spiale[6].position.set(1, 0, Math.sqrt(3) / 2)
        this.spiale[0].rotateX(1 * (Math.PI / 180))
        this.spiale[7].rotateX(-1 * (Math.PI / 180))
        this.spiale[1].rotateY(1 * (Math.PI / 180))
        this.spiale[5].rotateY(-1 * (Math.PI / 180))
        this.spiale[6].rotateY(-1 * (Math.PI / 180))
        this.nextStep()
      } else if (step <= 90) {
        this.spiale[0].rotateX(1 * (Math.PI / 180))
        this.spiale[7].rotateX(-1 * (Math.PI / 180))
        this.spiale[1].rotateY(1 * (Math.PI / 180))
        this.spiale[5].rotateY(-1 * (Math.PI / 180))
        this.spiale[6].rotateY(-1 * (Math.PI / 180))
        this.nextStep()
      } else if (step <= 120) {
        this.spiale[1].rotateY(1 * (Math.PI / 180))
        this.spiale[5].rotateY(-1 * (Math.PI / 180))
        this.spiale[6].rotateY(-1 * (Math.PI / 180))
        this.nextStep()
      } else if (step === 121) {
        this.meshs[6].position.set(0.5, 0, 0)
        this.spiale[6].position.set(0.5, 0, Math.sqrt(3))
        this.spiale[6].rotateY(-1 * (Math.PI / 180))
        this.nextStep()
      } else if (step <= 180) {
        this.spiale[6].rotateY(-1 * (Math.PI / 180))
        this.nextStep()
      } else {
        console.log('动画已播放完毕!')
      }
    },
    creatCube (scene, renderer, camera) {
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
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161', '#f46f4c', '#c9b5ec', '#f6c161', '#64e530']
      // 定义6个坐标
      const positions = [[-0.5, 1, 0], [-2, 0, 0], [-1, 0, 0], [0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0], [-0.5, -1 - hexgonalHigh, 0]]
      // 定义6个转轴
      const axiss = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
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
          this.meshs[index] = new THREE.Mesh(hexaGeometry, new THREE.MeshLambertMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1' || index === '3' || index === '2' || index === '4' || index === '5' || index === '6') {
          this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
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
      this.spiale[6].add(new THREE.AxesHelper(50))
      setTimeout(() => {
        this.nextStep()
      }, 0)
    }
  }
}
</script>
