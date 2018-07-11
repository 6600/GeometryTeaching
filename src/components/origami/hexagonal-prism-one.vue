<template lang="pug">
  .hexagonal-prism-one
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
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
      controls: null,
      stepCount: 270,
      stepSave: []
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
    animate () {
      requestAnimationFrame(this.animate)
      this.renderScene()
    },
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
      const stepSave = this.stepSave
      const ratio = Math.PI / 180
      if (step <= 60) {
        this.spiale[1].rotation.y = step * ratio
        this.spiale[2].rotation.y = step * ratio
        this.spiale[4].rotation.y = -step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[6].rotation.y = -step * ratio
        this.nextStep(1, this.close)
      } else if (step === 61) {
        this.meshs[1].position.set(-0.5, 0, 0)
        this.spiale[1].position.set(-1, 0, Math.sqrt(3) / 2)
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(1, 0, Math.sqrt(3) / 2)
        this.meshs[6].position.set(1.5, 0, 0)
        this.spiale[6].position.set(1, 0, Math.sqrt(3) / 2)
        this.nextStep(1, this.close)
      } else if (step <= 120) {
        this.spiale[1].rotation.y = step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[6].rotation.y = -step * ratio
        this.nextStep(1, this.close)
      } else if (step === 122) {
        this.meshs[6].position.set(0.5, 0, 0)
        this.spiale[6].position.set(0.5, 0, Math.sqrt(3))
        this.spiale[6].rotation.y = -step * ratio
        this.nextStep(1, this.close)
      } else if (step <= 180) {
        this.spiale[6].rotation.y = -step * ratio
        this.nextStep(1, this.close)
      } else if (step <= 270) {
        this.spiale[0].rotation.x = (step - 180) * ratio
        this.spiale[7].rotation.x = -(step - 180) * ratio
        this.nextStep(1, this.close)
      } else {
        console.log(JSON.stringify(stepSave))
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      stepSave[step] = {}
      stepSave[step].spiale0rotation = [this.spiale[0].rotation.x, this.spiale[0].rotation.y, this.spiale[0].rotation.z]
      stepSave[step].spiale1rotation = [this.spiale[1].rotation.x, this.spiale[1].rotation.y, this.spiale[1].rotation.z]
      stepSave[step].spiale2rotation = [this.spiale[2].rotation.x, this.spiale[2].rotation.y, this.spiale[2].rotation.z]
      stepSave[step].spiale4rotation = [this.spiale[4].rotation.x, this.spiale[4].rotation.y, this.spiale[4].rotation.z]
      stepSave[step].spiale5rotation = [this.spiale[5].rotation.x, this.spiale[5].rotation.y, this.spiale[5].rotation.z]
      stepSave[step].spiale6rotation = [this.spiale[6].rotation.x, this.spiale[6].rotation.y, this.spiale[6].rotation.z]
      stepSave[step].spiale7rotation = [this.spiale[7].rotation.x, this.spiale[7].rotation.y, this.spiale[7].rotation.z]
      stepSave[step].meshs1position = [this.meshs[1].position.x, this.meshs[1].position.y, this.meshs[1].position.z]
      stepSave[step].spiale1position = [this.spiale[1].position.x, this.spiale[1].position.y, this.spiale[1].position.z]
      stepSave[step].meshs5position = [this.meshs[5].position.x, this.meshs[5].position.y, this.meshs[5].position.z]
      stepSave[step].spiale5position = [this.spiale[5].position.x, this.spiale[5].position.y, this.spiale[5].position.z]
      stepSave[step].meshs6position = [this.meshs[6].position.x, this.meshs[6].position.y, this.meshs[6].position.z]
      stepSave[step].spiale6position = [this.spiale[6].position.x, this.spiale[6].position.y, this.spiale[6].position.z]
    },
    open (step) {
      const ratio = Math.PI / 180
      if (step < 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step <= 60) {
        this.spiale[1].rotation.y = step * ratio
        this.spiale[2].rotation.y = step * ratio
        this.spiale[4].rotation.y = -step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[6].rotation.y = -step * ratio
        this.nextStep(-1, this.open)
      } else if (step === 62) {
        this.meshs[1].position.set(-1.5, 0, 0)
        this.spiale[1].position.set(-0.5, 0, 0)
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(0.5, 0, 0)
        this.meshs[6].position.set(2.5, 0, 0)
        this.spiale[6].position.set(0.5, 0, 0)
        this.nextStep(-1, this.open)
      } else if (step <= 120) {
        this.spiale[1].rotation.y = step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[6].rotation.y = -step * ratio
        this.nextStep(-1, this.open)
      } else if (step === 122) {
        this.meshs[6].position.set(1.5, 0, 0)
        this.spiale[6].position.set(1, 0, Math.sqrt(3) / 2)
        this.spiale[6].rotation.y = -step * ratio
        this.nextStep(-1, this.open)
      } else if (step <= 180) {
        this.spiale[6].rotation.y = -step * ratio
        this.nextStep(-1, this.open)
      } else if (step <= 272) {
        this.spiale[0].rotation.x = (step - 180) * ratio
        this.spiale[7].rotation.x = -(step - 180) * ratio
        this.nextStep(-1, this.open)
      } else {
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
    },
    dragClose (step) {
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
      if (step <= 60) {
        this.spiale[1].rotation.y = step * ratio
        this.spiale[2].rotation.y = step * ratio
        this.spiale[4].rotation.y = -step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[6].rotation.y = -step * ratio
      } else if (step <= 120) {
        this.spiale[2].rotation.y = 60 * ratio
        this.spiale[4].rotation.y = -60 * ratio
        this.meshs[1].position.set(-0.5, 0, 0)
        this.spiale[1].position.set(-1, 0, Math.sqrt(3) / 2)
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(1, 0, Math.sqrt(3) / 2)
        this.meshs[6].position.set(1.5, 0, 0)
        this.spiale[6].position.set(1, 0, Math.sqrt(3) / 2)
        this.spiale[1].rotation.y = step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[6].rotation.y = -step * ratio
      } else if (step <= 180) {
        this.spiale[2].rotation.y = 60 * ratio
        this.spiale[4].rotation.y = -60 * ratio
        this.meshs[1].position.set(-0.5, 0, 0)
        this.spiale[1].position.set(-1, 0, Math.sqrt(3) / 2)
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(1, 0, Math.sqrt(3) / 2)
        this.spiale[1].rotation.y = 120 * ratio
        this.spiale[5].rotation.y = -120 * ratio
        this.meshs[6].position.set(0.5, 0, 0)
        this.spiale[6].position.set(0.5, 0, Math.sqrt(3))
        this.spiale[6].rotation.y = -step * ratio
      } else if (step <= 270) {
        this.spiale[2].rotation.y = 60 * ratio
        this.spiale[4].rotation.y = -60 * ratio
        this.meshs[1].position.set(-0.5, 0, 0)
        this.spiale[1].position.set(-1, 0, Math.sqrt(3) / 2)
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(1, 0, Math.sqrt(3) / 2)
        this.spiale[1].rotation.y = 120 * ratio
        this.spiale[5].rotation.y = -120 * ratio
        this.meshs[6].position.set(0.5, 0, 0)
        this.spiale[6].position.set(0.5, 0, Math.sqrt(3))
        this.spiale[6].rotation.y = -180 * ratio
        this.spiale[0].rotation.x = (step - 180) * ratio
        this.spiale[7].rotation.x = -(step - 180) * ratio
      } else {
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.renderScene()
    },
    dragOpen (step) {
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
      if (step <= 60) {
        this.spiale[0].rotation.x = 0
        this.spiale[7].rotation.x = 0
        this.meshs[1].position.set(-1.5, 0, 0)
        this.spiale[1].position.set(-0.5, 0, 0)
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(0.5, 0, 0)
        this.meshs[6].position.set(2.5, 0, 0)
        this.spiale[6].position.set(0.5, 0, 0)
        this.spiale[1].rotation.y = step * ratio
        this.spiale[2].rotation.y = step * ratio
        this.spiale[4].rotation.y = -step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[6].rotation.y = -step * ratio
      } else if (step <= 120) {
        this.spiale[0].rotation.x = 0
        this.spiale[7].rotation.x = 0
        this.meshs[6].position.set(1.5, 0, 0)
        this.spiale[6].position.set(1, 0, Math.sqrt(3) / 2)
        this.spiale[1].rotation.y = step * ratio
        this.spiale[5].rotation.y = -step * ratio
        this.spiale[6].rotation.y = -step * ratio
      } else if (step <= 180) {
        this.spiale[0].rotation.x = 0
        this.spiale[7].rotation.x = 0
        this.spiale[6].rotation.y = -step * ratio
      } else if (step <= 270) {
        this.spiale[0].rotation.x = (step - 180) * ratio
        this.spiale[7].rotation.x = -(step - 180) * ratio
      } else {
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.renderScene()
    },
    creatCube (scene, renderer, camera) {
      this.controls = new OrbitControls(this.camera, this.$el.childNodes[0])
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
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#ffb8d2', '#f46f4c', '#c9b5ec', '#edf766', '#64e530']
      // 定义6个坐标
      const positions = [[0, 0, 0], [-1.5, 0, 0], [-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [1.5, 0, 0], [2.5, 0, 0], [0, -Math.sqrt(3), 0]]
      // 定义6个转轴
      const axiss = [[-0.5, 1, 0], [-0.5, 0, 0], [-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [0.5, 0, 0], [0.5, 0, 0], [-0.5, -1, 0]]
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
          this.meshs[index] = new THREE.Mesh(hexaGeometry, new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1' || index === '3' || index === '2' || index === '4' || index === '5' || index === '6') {
          this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
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
      // this.spiale[6].add(new THREE.AxesHelper(50))
      this.animate()
    }
  }
}
</script>
