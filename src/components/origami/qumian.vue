<template lang="pug">
  .mitsubishi-column-one
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
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
    nextStep () {
      setTimeout(() => {
        this.renderScene()
      }, 20)
    },
    renderScene () {
      this.renderer.render(this.scene, this.camera)
    },
    creatMitsubishiColumn (scene, renderer, camera) {
      // 创建正方体的6个平面
      // 定义长宽都是1平面
      let width = 100
      let height = 100
      let widthSegments = 1
      let heightSegments = 100
      let plane = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
      for (let i = 0; i < plane.vertices.length / 2; i++) {
        // console.log(plane.vertices[2 * i])
        plane.vertices[2 * i].z = Math.pow(2, i / 20)
        plane.vertices[2 * i + 1].z = Math.pow(2, i / 20)
      }
      let mesh = new THREE.Mesh(plane, new THREE.MeshPhongMaterial({color: 0x888888}))
      mesh.doubleSided = true
      mesh.rotation.y = Math.PI / 2 - 0.5
      scene.add(mesh)
      setTimeout(() => {
        this.nextStep()
      }, 1000)
    }
  }
}
</script>
