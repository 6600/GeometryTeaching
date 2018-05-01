<template lang="pug">
  .pyramid-five-two
</template>

<script>
import { Order, Fun } from '@/components/Order.js'
const THREE = require('three')
export default {
  name: 'pyramidFourTwo',
  data () {
    return {
      camera: null,
      renderer: null,
      spiale: [],
      meshs: [],
      pause: false,
      step: 0,
      stepCount: 420
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
      const ratio = Math.PI / 180
      if (step <= 111) {
        // 盒子左1
        // spiale[0].rotation.y = step * ratio
        // spiale[1].rotation.z = -step * ratio
        spiale[1].rotateZ(ratio)
        spiale[2].rotateX(ratio)
        spiale[3].rotateX(ratio)
        // spiale[4].rotateX(ratio)
        spiale[5].rotateX(ratio)
        this.nextStep(1, this.close)
      }
    },
    creatMitsubishiColumn (scene, renderer, camera) {
      const ratio = Math.PI / 180
      // 五边形
      let shape5 = new THREE.Shape()
      shape5.moveTo(0, 0)
      shape5.lineTo(1, 0)
      shape5.lineTo(1 + Math.cos(72 * Math.PI / 180), -Math.sin(72 * Math.PI / 180))
      shape5.lineTo(0.5, -Math.sin(72 * Math.PI / 180) - Math.sin(36 * Math.PI / 180))
      shape5.lineTo(-Math.cos(72 * Math.PI / 180), -Math.sin(72 * Math.PI / 180))
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
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161', '#f46f4c', '#f46f4c']
      // 定义3个坐标
      const positions = [
        [-0.5, (Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [-1, 0, 0],
        [0, 0, 0],
        [-1, 0, 0],
        [0, 0, 0],
        [-1, 0, 0]
      ]
      // 定义3个转轴
      const axiss = [
        [0, 0, 0],
        [-0.5, (Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [-0.5, (Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [0.5 + Math.cos(72 * Math.PI / 180), -Math.sin(72 * Math.PI / 180) + (Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [0.5 + Math.cos(72 * Math.PI / 180), -Math.sin(72 * Math.PI / 180) + (Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2, 0],
        [-0.5 - Math.cos(72 * Math.PI / 180), (Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180)) / 2 - Math.sin(72 * Math.PI / 180), 0]
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
          this.meshs[index] = new THREE.Mesh(hexaGeometry, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else {
          this.meshs[index] = new THREE.Mesh(triangleGeometry1, new THREE.MeshPhongMaterial({
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
      this.spiale[1].add(new THREE.AxesHelper(50))
      this.spiale[1].rotation.z = -30 * Math.PI / 180
      // this.spiale[2].rotation.z = -Math.cos(50 * Math.PI / 180)
      this.spiale[3].rotation.z = -72 * Math.PI / 180
      this.spiale[4].rotation.z = -42 * Math.PI / 180
      this.spiale[5].rotation.z = 145 * Math.PI / 180
      setTimeout(() => {
        this.renderScene()
      }, 0)
    }
  }
}
</script>
