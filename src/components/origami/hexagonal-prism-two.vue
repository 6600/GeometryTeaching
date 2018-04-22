<template lang="pug">
  .hexagonal-prism-two
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
      step: 0,
      stepCount: 300
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
      const ratio = (Math.PI / 180)
      if (step <= 60) {
        this.spiale[1].rotation.x = step * ratio
        this.spiale[3].rotation.x = -step * ratio
        this.nextStep(2, this.close)
      } else if (step <= 90 + 60) {
        this.spiale[0].rotation.y = (step - 60) * ratio
        this.spiale[4].rotation.y = -(step - 60) * ratio
        this.spiale[5].rotation.y = -(step - 60) * ratio
        this.spiale[6].rotation.y = -(step - 60) * ratio
        this.spiale[7].rotation.y = -(step - 60) * ratio
        this.nextStep(2, this.close)
      } else if (step === 92 + 60) {
        this.meshs[4].position.set(1, 1.5, 0)
        this.spiale[4].position.set(0, 0, Math.sqrt(3))
        this.meshs[5].position.set(1, 0.5, 0)
        this.spiale[5].position.set(0, 0, Math.sqrt(3))
        this.meshs[6].position.set(1, -0.5, 0)
        this.spiale[6].position.set(0, 0, Math.sqrt(3))
        this.nextStep(2, this.close)
      } else if (step <= 180 + 60) {
        this.spiale[4].rotation.y = -(step - 60) * ratio
        this.spiale[5].rotation.y = -(step - 60) * ratio
        this.spiale[6].rotation.y = -(step - 60) * ratio
        this.nextStep(2, this.close)
      } else if (step === 182 + 60) {
        this.meshs[4].position.set(0, 0.5, 0)
        this.spiale[4].position.set(-1, 1, Math.sqrt(3))
        this.meshs[6].position.set(0, -0.5, 0)
        this.spiale[6].position.set(-1, 0, Math.sqrt(3))
        this.nextStep(2, this.close)
      } else if (step <= 240 + 60) {
        this.spiale[4].rotation.x = -(step - 240) * ratio
        this.spiale[6].rotation.x = (step - 240) * ratio
        this.nextStep(2, this.close)
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
    },
    open (step) {
      const ratio = (Math.PI / 180)
      if (step < 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step <= 60) {
        this.spiale[1].rotation.x = step * ratio
        this.spiale[3].rotation.x = -step * ratio
        this.nextStep(-2, this.open)
      } else if (step <= 90 + 60) {
        this.spiale[0].rotation.y = (step - 60) * ratio
        this.spiale[4].rotation.y = -(step - 60) * ratio
        this.spiale[5].rotation.y = -(step - 60) * ratio
        this.spiale[6].rotation.y = -(step - 60) * ratio
        this.spiale[7].rotation.y = -(step - 60) * ratio
        this.nextStep(-2, this.open)
      } else if (step === 92 + 60) {
        this.meshs[4].position.set(Math.sqrt(3) + 1, 1.5, 0)
        this.spiale[4].position.set(0, 0, 0)
        this.meshs[5].position.set(Math.sqrt(3) + 1, 0.5, 0)
        this.spiale[5].position.set(0, 0, 0)
        this.meshs[6].position.set(Math.sqrt(3) + 1, -0.5, 0)
        this.spiale[6].position.set(0, 0, 0)
        this.nextStep(-2, this.open)
      } else if (step <= 180 + 60) {
        this.spiale[4].rotation.y = -(step - 60) * ratio
        this.spiale[5].rotation.y = -(step - 60) * ratio
        this.spiale[6].rotation.y = -(step - 60) * ratio
        this.nextStep(-2, this.open)
      } else if (step === 182 + 60) {
        this.meshs[4].position.set(1, 1.5, 0)
        this.spiale[4].position.set(0, 0, Math.sqrt(3))
        this.meshs[6].position.set(1, -0.5, 0)
        this.spiale[6].position.set(0, 0, Math.sqrt(3))
        this.nextStep(-2, this.open)
      } else if (step <= 240 + 60) {
        this.spiale[4].rotation.x = -(step - 240) * ratio
        this.spiale[6].rotation.x = (step - 240) * ratio
        this.nextStep(-2, this.open)
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
    },
    dragClose (step) {
      const ratio = (Math.PI / 180)
      if (step <= 60) {
        this.spiale[1].rotation.x = step * ratio
        this.spiale[3].rotation.x = -step * ratio
      } else if (step <= 150) {
        this.spiale[1].rotation.x = 60 * ratio
        this.spiale[3].rotation.x = -60 * ratio
        this.spiale[0].rotation.y = (step - 60) * ratio
        this.spiale[4].rotation.y = -(step - 60) * ratio
        this.spiale[5].rotation.y = -(step - 60) * ratio
        this.spiale[6].rotation.y = -(step - 60) * ratio
        this.spiale[7].rotation.y = -(step - 60) * ratio
      } else if (step <= 240) {
        this.spiale[1].rotation.x = 60 * ratio
        this.spiale[3].rotation.x = -60 * ratio
        this.spiale[0].rotation.y = 90 * ratio
        this.spiale[7].rotation.y = -90 * ratio
        this.meshs[4].position.set(1, 1.5, 0)
        this.spiale[4].position.set(0, 0, Math.sqrt(3))
        this.meshs[5].position.set(1, 0.5, 0)
        this.spiale[5].position.set(0, 0, Math.sqrt(3))
        this.meshs[6].position.set(1, -0.5, 0)
        this.spiale[6].position.set(0, 0, Math.sqrt(3))
        this.spiale[4].rotation.y = -(step - 60) * ratio
        this.spiale[5].rotation.y = -(step - 60) * ratio
        this.spiale[6].rotation.y = -(step - 60) * ratio
      } else if (step <= 300) {
        this.spiale[1].rotation.x = 60 * ratio
        this.spiale[3].rotation.x = -60 * ratio
        this.spiale[0].rotation.y = 90 * ratio
        this.spiale[7].rotation.y = -90 * ratio
        this.meshs[4].position.set(1, 1.5, 0)
        this.spiale[4].position.set(0, 0, Math.sqrt(3))
        this.meshs[5].position.set(1, 0.5, 0)
        this.spiale[5].position.set(0, 0, Math.sqrt(3))
        this.meshs[6].position.set(1, -0.5, 0)
        this.spiale[6].position.set(0, 0, Math.sqrt(3))
        this.spiale[4].rotation.y = -180 * ratio
        this.spiale[5].rotation.y = -180 * ratio
        this.spiale[6].rotation.y = -180 * ratio
        this.meshs[4].position.set(0, 0.5, 0)
        this.spiale[4].position.set(-1, 1, Math.sqrt(3))
        this.meshs[6].position.set(0, -0.5, 0)
        this.spiale[6].position.set(-1, 0, Math.sqrt(3))
        this.spiale[4].rotation.x = -(step - 240) * ratio
        this.spiale[6].rotation.x = (step - 240) * ratio
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.renderScene()
    },
    dragOpen (step) {
      const ratio = (Math.PI / 180)
      if (step < 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step <= 60) {
        this.spiale[4].rotation.x = 0
        this.spiale[6].rotation.x = 0
        this.meshs[4].position.set(1, 1.5, 0)
        this.spiale[4].position.set(0, 0, Math.sqrt(3))
        this.meshs[6].position.set(1, -0.5, 0)
        this.spiale[6].position.set(0, 0, Math.sqrt(3))
        this.meshs[4].position.set(Math.sqrt(3) + 1, 1.5, 0)
        this.spiale[4].position.set(0, 0, 0)
        this.meshs[5].position.set(Math.sqrt(3) + 1, 0.5, 0)
        this.spiale[5].position.set(0, 0, 0)
        this.meshs[6].position.set(Math.sqrt(3) + 1, -0.5, 0)
        this.spiale[6].position.set(0, 0, 0)
        this.spiale[0].rotation.y = 0
        this.spiale[4].rotation.y = 0
        this.spiale[5].rotation.y = 0
        this.spiale[6].rotation.y = 0
        this.spiale[7].rotation.y = 0
        this.spiale[1].rotation.x = step * ratio
        this.spiale[3].rotation.x = -step * ratio
      } else if (step <= 150) {
        this.spiale[4].rotation.x = 0
        this.spiale[6].rotation.x = 0
        this.meshs[4].position.set(1, 1.5, 0)
        this.spiale[4].position.set(0, 0, Math.sqrt(3))
        this.meshs[6].position.set(1, -0.5, 0)
        this.spiale[6].position.set(0, 0, Math.sqrt(3))
        this.meshs[4].position.set(Math.sqrt(3) + 1, 1.5, 0)
        this.spiale[4].position.set(0, 0, 0)
        this.meshs[5].position.set(Math.sqrt(3) + 1, 0.5, 0)
        this.spiale[5].position.set(0, 0, 0)
        this.meshs[6].position.set(Math.sqrt(3) + 1, -0.5, 0)
        this.spiale[6].position.set(0, 0, 0)
        this.spiale[0].rotation.y = (step - 60) * ratio
        this.spiale[4].rotation.y = -(step - 60) * ratio
        this.spiale[5].rotation.y = -(step - 60) * ratio
        this.spiale[6].rotation.y = -(step - 60) * ratio
        this.spiale[7].rotation.y = -(step - 60) * ratio
      } else if (step <= 240) {
        this.spiale[4].rotation.x = 0
        this.spiale[6].rotation.x = 0
        this.meshs[4].position.set(1, 1.5, 0)
        this.spiale[4].position.set(0, 0, Math.sqrt(3))
        this.meshs[6].position.set(1, -0.5, 0)
        this.spiale[6].position.set(0, 0, Math.sqrt(3))
        this.spiale[4].rotation.y = -(step - 60) * ratio
        this.spiale[5].rotation.y = -(step - 60) * ratio
        this.spiale[6].rotation.y = -(step - 60) * ratio
      } else if (step <= 300) {
        this.spiale[4].rotation.x = -(step - 240) * ratio
        this.spiale[6].rotation.x = (step - 240) * ratio
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.renderScene()
    },
    creatCube (scene, renderer, camera) {
      // 创建长方体的6个平面
      var hexgonalHigh = Math.sqrt(3)
      let shape1 = new THREE.Shape()
      shape1.moveTo(0, 0)
      shape1.lineTo(0, 1)
      shape1.lineTo(hexgonalHigh / 2, 1.5)
      shape1.lineTo(hexgonalHigh, 1)
      shape1.lineTo(hexgonalHigh, 0)
      shape1.lineTo(hexgonalHigh / 2, -0.5)
      shape1.lineTo(0, 0)
      let hexaGeometry = new THREE.ShapeGeometry(shape1)
      const geometry = new THREE.PlaneGeometry(2, 1)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161', '#f46f4c', '#c9b5ec', '#f6c161', '#64e530']
      // 定义6个坐标
      const positions = [[-Math.sqrt(3), 0, 0], [0, 0.5, 0], [-1, 0.5, 0], [0, -0.5, 0], [Math.sqrt(3) + 1, 1.5, 0], [Math.sqrt(3) + 1, 0.5, 0], [Math.sqrt(3) + 1, -0.5, 0], [0, 0, 0]]
      // 定义6个转轴
      const axiss = [[-2, 0, 0], [-1, 1, 0], [0, 0, 0], [-1, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
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
          this.meshs[index] = new THREE.Mesh(hexaGeometry, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1' || index === '3' || index === '2' || index === '4' || index === '5' || index === '6') {
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
        // 将平面添加到场景中
        this.scene.add(this.meshs[index])
        this.spiale[index].add(this.meshs[index])
      }
      // 调试转轴
      // this.spiale[4].add(new THREE.AxesHelper(50))
      setTimeout(() => {
        this.renderScene()
      }, 0)
    }
  }
}
</script>
