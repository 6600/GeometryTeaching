<template lang="pug">
  //- 三角锥
  .trigonometric-cone-one
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
export default {
  name: 'trigonometric-cone-one',
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
      // 绘制三角形
      const triangle = [
        {
          spot: [[-0.5, 0, 0], [0.5, 0, 0], [0, -0.75, 0]],
          color: 0x0000ff
        },
        {
          spot: [[0.5, 0, 0], [0, -0.75, 0], [1, -1, 0]],
          color: 0xccaa1f
        },
        {
          spot: [[-0.5, 0, 0], [0, -0.75, 0], [-1, -1, 0]],
          color: 0xccaa1f
        },
        {
          spot: [[-0.5, 0, 0], [0.5, 0, 0], [0, 1, 0]],
          color: 0xccaa1f
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
