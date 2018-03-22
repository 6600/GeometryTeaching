<template lang="pug">
  .mitsubishi-column-two
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
      spiale: [],
      meshs: [],
      step: 0
    }
  },
  mounted () {
    // 创建3D环境
    Fun.init3D(this.$el).then((Object3D) => {
      this.camera = Object3D.camera
      this.renderer = Object3D.renderer
      this.scene = Object3D.scene
      this.creatMitsubishiColumn(Object3D.scene, Object3D.renderer, Object3D.camera)
    })
  },
  methods: {
    nextStep () {
      setTimeout(() => {
        this.renderScene()
      }, 20)
    },
    renderScene () {
      this.renderer.render(this.scene, this.camera)
    },
    creatMitsubishiColumn (scene, renderer, camera) {
      // 定义长宽都是1平面
      const geometry = new THREE.PlaneGeometry(1, 1.2)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef']
      // 定义6个坐标
      const positions = [[-1.5, 0, 0], [0, 0, 0], [1.5, 0, 0]]
      // 定义6个转轴
      const axiss = [[-0.5, 0, 0], [0, 0, 0], [0, 0, 0]]
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
        this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
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
      const triangle = [
        {
          spot: [[-0.5, 0.5, 0], [0, 1.5, 0], [0.5, 0.5, 0]],
          color: 0x0000ff
        },
        {
          spot: [[-0.5, -0.5, 0], [0, -1.5, 0], [0.5, -0.5, 0]],
          color: 0x0000ff
        }
      ]
      Fun.drawTriangle(triangle).then((mesh) => {
        // 将平面添加到场景中
        scene.add(...mesh)
      })
      setTimeout(() => {
        this.nextStep()
      }, 1000)
    }
  }
}
</script>
