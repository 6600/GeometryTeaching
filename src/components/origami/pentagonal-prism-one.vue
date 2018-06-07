<template lang="pug">
  .pentagonal-prism-one
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
      scene: null,
      spiale: [],
      meshs: [],
      step: 0,
      stepCount: 312
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
    close (step) {
      const ratio = Math.PI / 180
      if (step <= 72) {
        this.spiale[1].rotation.y = step * ratio
        this.spiale[4].rotation.y = -step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[3].rotation.y = -step * ratio
        this.nextStep(1, this.close)
      } else if (step === 74) {
        this.meshs[4].position.set(0.5, 0, 0)
        this.spiale[4].position.set(-0.5 + Math.sin(18 * Math.PI / 180), 0, Math.cos(18 * Math.PI / 180))
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(-0.5 + Math.sin(18 * Math.PI / 180), 0, Math.cos(18 * Math.PI / 180))
        this.nextStep(1, this.close)
      } else if (step <= 72 + 90) {
        this.spiale[0].rotation.x = (step - 72) * ratio
        this.spiale[6].rotation.x = -(step - 72) * ratio
        this.nextStep(1, this.close)
      } else if (step <= 180 + 58) {
        this.spiale[4].rotation.y = -(step - 94) * ratio
        this.spiale[5].rotation.y = -(step - 94) * ratio
        this.nextStep(1, this.close)
      } else if (step === 180 + 60) {
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(-1, 0, Math.cos(18 * Math.PI / 180) + Math.sin(36 * Math.PI / 180))
        this.nextStep(1, this.close)
      } else if (step <= 270 + 42) {
        this.spiale[5].rotation.y = -(step - 96) * ratio
        this.nextStep(1, this.close)
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
    },
    open (step) {
      const ratio = Math.PI / 180
      if (step < 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step <= 72) {
        this.spiale[1].rotation.y = step * ratio
        this.spiale[4].rotation.y = -step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[3].rotation.y = -step * ratio
        this.nextStep(-1, this.open)
      } else if (step === 74) {
        this.meshs[4].position.set(1.5, 0, 0)
        this.spiale[4].position.set(-0.5, 0, 0)
        this.meshs[5].position.set(2.5, 0, 0)
        this.spiale[5].position.set(-0.5, 0, 0)
        this.nextStep(-1, this.open)
      } else if (step <= 72 + 90) {
        this.spiale[0].rotation.x = (step - 72) * ratio
        this.spiale[6].rotation.x = -(step - 72) * ratio
        this.nextStep(-1, this.open)
      } else if (step <= 180 + 58) {
        this.spiale[4].rotation.y = -(step - 94) * ratio
        this.spiale[5].rotation.y = -(step - 94) * ratio
        this.nextStep(-1, this.open)
      } else if (step === 180 + 60) {
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(-0.5 + Math.sin(18 * Math.PI / 180), 0, Math.cos(18 * Math.PI / 180))
        this.nextStep(-1, this.open)
      } else if (step <= 270 + 54) {
        this.spiale[5].rotation.y = -(step - 96) * ratio
        this.nextStep(-1, this.open)
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
    },
    dragClose (step) {
      this.step = step
      const ratio = Math.PI / 180
      if (step <= 0) {
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return false
      }
      if (step >= this.stepCount) {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      if (step <= 72) {
        this.spiale[1].rotation.y = step * ratio
        this.spiale[4].rotation.y = -step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[3].rotation.y = -step * ratio
      } else if (step <= 72 + 90) {
        this.spiale[1].rotation.y = 72 * ratio
        this.spiale[4].rotation.y = -72 * ratio
        this.spiale[5].rotation.y = -72 * ratio
        this.spiale[3].rotation.y = -72 * ratio
        this.spiale[0].rotation.x = (step - 72) * ratio
        this.spiale[6].rotation.x = -(step - 72) * ratio
      } else if (step <= 180 + 58) {
        this.spiale[1].rotation.y = 72 * ratio
        this.spiale[3].rotation.y = -72 * ratio
        this.spiale[0].rotation.x = 90 * ratio
        this.spiale[6].rotation.x = -90 * ratio
        this.meshs[4].position.set(0.5, 0, 0)
        this.spiale[4].position.set(-0.5 + Math.sin(18 * Math.PI / 180), 0, Math.cos(18 * Math.PI / 180))
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(-0.5 + Math.sin(18 * Math.PI / 180), 0, Math.cos(18 * Math.PI / 180))
        this.spiale[4].rotation.y = -(step - 94) * ratio
        this.spiale[5].rotation.y = -(step - 94) * ratio
      } else if (step <= 270 + 42) {
        this.spiale[1].rotation.y = 72 * ratio
        this.spiale[4].rotation.y = -72 * ratio
        this.spiale[3].rotation.y = -72 * ratio
        this.spiale[0].rotation.x = 90 * ratio
        this.spiale[6].rotation.x = -90 * ratio
        this.meshs[4].position.set(0.5, 0, 0)
        this.spiale[4].position.set(-0.5 + Math.sin(18 * Math.PI / 180), 0, Math.cos(18 * Math.PI / 180))
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(-0.5 + Math.sin(18 * Math.PI / 180), 0, Math.cos(18 * Math.PI / 180))
        this.spiale[4].rotation.y = -143 * ratio
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(-1, 0, Math.cos(18 * Math.PI / 180) + Math.sin(36 * Math.PI / 180))
        this.spiale[5].rotation.y = -(step - 96) * ratio
      }
      this.renderScene()
    },
    dragOpen (step) {
      this.step = step
      const ratio = Math.PI / 180
      if (step <= 0) {
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return false
      }
      if (step >= this.stepCount) {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      if (step <= 72) {
        this.spiale[6].rotation.x = 0
        this.meshs[4].position.set(1.5, 0, 0)
        this.spiale[4].position.set(-0.5, 0, 0)
        this.meshs[5].position.set(2.5, 0, 0)
        this.spiale[5].position.set(-0.5, 0, 0)
        this.spiale[1].rotation.y = step * ratio
        this.spiale[4].rotation.y = -step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[3].rotation.y = -step * ratio
      } else if (step <= 72 + 90) {
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(-0.5 + Math.sin(18 * Math.PI / 180), 0, Math.cos(18 * Math.PI / 180))
        this.spiale[4].rotation.y = -71 * ratio
        this.spiale[5].rotation.y = -71 * ratio
        this.spiale[0].rotation.x = (step - 72) * ratio
        this.spiale[6].rotation.x = -(step - 72) * ratio
      } else if (step <= 180 + 58) {
        this.spiale[5].rotation.y = -145 * ratio
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(-0.5 + Math.sin(18 * Math.PI / 180), 0, Math.cos(18 * Math.PI / 180))
        this.spiale[4].rotation.y = -(step - 94) * ratio
        this.spiale[5].rotation.y = -(step - 94) * ratio
      } else if (step <= 270 + 42) {
        this.spiale[5].rotation.y = -(step - 96) * ratio
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.renderScene()
    },
    creatCube (scene, renderer, camera) {
      // 创建长方体的6个平面
      let shape1 = new THREE.Shape()
      shape1.moveTo(0, 0)
      shape1.lineTo(1, 0)
      shape1.lineTo(1 + Math.cos(72 * Math.PI / 180), Math.sin(72 * Math.PI / 180))
      shape1.lineTo(0.5, Math.sin(72 * Math.PI / 180) + Math.sin(36 * Math.PI / 180))
      shape1.lineTo(-Math.cos(72 * Math.PI / 180), Math.sin(72 * Math.PI / 180))
      shape1.lineTo(0, 0)
      let pentaGeometry1 = new THREE.ShapeGeometry(shape1)
      let shape2 = new THREE.Shape()
      shape2.moveTo(0, 0)
      shape2.lineTo(1, 0)
      shape2.lineTo(1 + Math.cos(72 * Math.PI / 180), -Math.sin(72 * Math.PI / 180))
      shape2.lineTo(0.5, -Math.sin(72 * Math.PI / 180) - Math.sin(36 * Math.PI / 180))
      shape2.lineTo(-Math.cos(72 * Math.PI / 180), -Math.sin(72 * Math.PI / 180))
      shape2.lineTo(0, 0)
      let pentaGeometry2 = new THREE.ShapeGeometry(shape2)
      const geometry = new THREE.PlaneGeometry(1, 2)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161', '#f46f4c', '#c9b5ec', '#64e530']
      // 定义6个坐标
      const positions = [[-0.5, 0, 0], [-0.5, 0, 0], [-1, 0, 0], [0.5, 0, 0], [1.5, 0, 0], [2.5, 0, 0], [-0.5, 0, 0]]
      // 定义6个转轴
      const axiss = [[-1, 1, 0], [-1.5, 0, 0], [0, 0, 0], [-0.5, 0, 0], [-0.5, 0, 0], [-0.5, 0, 0], [-1, -1, 0]]
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
          this.meshs[index] = new THREE.Mesh(pentaGeometry1, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1' || index === '3' || index === '2' || index === '4' || index === '5') {
          this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '6') {
          this.meshs[index] = new THREE.Mesh(pentaGeometry2, new THREE.MeshPhongMaterial({
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
