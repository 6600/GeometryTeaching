<template lang="pug">
  .cube-two
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
      step: 0,
      stepCount: 450
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
      const spiale = this.spiale
      const ratio = (Math.PI / 180)
      if (step < 0) { return }
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * ratio
        this.nextStep(2, this.close)
      } else if (step <= 180) {
        spiale[1].rotation.x = -(step - 90) * ratio
        this.nextStep(2, this.close)
      } else if (step <= 270) {
        // 盒子右部
        spiale[3].rotation.y = -(step - 180) * ratio
        // 盒子上部
        spiale[4].rotation.y = -(step - 180) * ratio
        // 盒子下部
        spiale[5].rotation.y = -(step - 180) * ratio
        this.nextStep(2, this.close)
      } else if (step === 272) {
        this.meshs[4].position.set(0, 0.5, 0)
        this.spiale[4].position.set(0, 0.5, 0.5)
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(0, 0, 1)
        spiale[4].rotation.x = 90 * ratio
        spiale[4].rotation.z = 90 * ratio
        // spiale[4].position.y = (272 * ratio)
        this.nextStep(2, this.close)
      } else if (step <= 360) {
        // console.log(spiale[4].rotation)
        spiale[4].rotation.y = (step) * ratio
        this.nextStep(2, this.close)
      } else if (step <= 450) {
        spiale[5].rotation.y = -(step - 270) * ratio
        this.nextStep(2, this.close)
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
    },
    open (step) {
      const spiale = this.spiale
      const ratio = (Math.PI / 180)
      if (step < 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * ratio
        this.nextStep(-2, this.open)
      } else if (step < 180) {
        // 盒子右部
        spiale[3].rotation.y = -(step - 90) * ratio
        spiale[4].rotation.x = 0
        spiale[4].rotation.z = 0
        spiale[4].rotation.y = -(step - 90) * ratio
        spiale[5].rotation.y = -(step - 90) * ratio
        this.nextStep(-2, this.open)
      } else if (step === 180) {
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(0, 0, 0)
        this.meshs[4].position.set(0.5, -0.5, 0)
        this.spiale[4].position.set(0, 1.5, 0)
        this.nextStep(-2, this.open)
      } else if (step <= 270) {
        // 盒子右部
        spiale[1].rotation.x = -(step - 180) * ratio
        this.nextStep(-2, this.open)
      } else if (step < 360) {
        spiale[4].rotation.y = (step) * ratio
        this.nextStep(-2, this.open)
      } else if (step <= 450) {
        spiale[5].rotation.y = -(step - 270) * ratio
        this.nextStep(-2, this.open)
      }
    },
    dragClose (step) {
      this.step = step
      const spiale = this.spiale
      const ratio = (Math.PI / 180)
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * ratio
      } else if (step <= 180) {
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.x = -(step - 90) * ratio
      } else if (step <= 270) {
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.x = -90 * ratio
        // 盒子右部
        spiale[3].rotation.y = -(step - 180) * ratio
        // 盒子上部
        spiale[4].rotation.y = -(step - 180) * ratio
        // 盒子下部
        spiale[5].rotation.y = -(step - 180) * ratio
      } else if (step <= 360) {
        this.meshs[4].position.set(0, 0.5, 0)
        this.spiale[4].position.set(0, 0.5, 0.5)
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(0, 0, 1)
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.x = -90 * ratio
        // 盒子右部
        spiale[3].rotation.y = -90 * ratio
        // 盒子上部
        spiale[4].rotation.y = -90 * ratio
        // 盒子下部
        spiale[5].rotation.y = -90 * ratio
        spiale[4].rotation.x = 90 * ratio
        spiale[4].rotation.z = 90 * ratio
        spiale[4].rotation.y = (step) * ratio
      } else if (step <= 450) {
        this.meshs[4].position.set(0, 0.5, 0)
        this.spiale[4].position.set(0, 0.5, 0.5)
        this.meshs[5].position.set(0.5, 0, 0)
        this.spiale[5].position.set(0, 0, 1)
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.x = -90 * ratio
        // 盒子右部
        spiale[3].rotation.y = -90 * ratio
        // 盒子上部
        spiale[4].rotation.x = 90 * ratio
        spiale[4].rotation.z = 90 * ratio
        spiale[4].rotation.y = 1 * ratio
        // 盒子下部
        spiale[5].rotation.y = -90 * ratio
        spiale[5].rotation.y = -(step - 270) * ratio
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.renderScene()
    },
    dragOpen (step) {
      this.step = step
      const spiale = this.spiale
      const ratio = (Math.PI / 180)
      if (step < 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * ratio
      } else if (step < 180) {
        spiale[5].rotation.y = -90 * ratio
        spiale[4].rotation.y = 270 * ratio
        // 盒子右部
        spiale[1].rotation.x = 0 * ratio
        this.meshs[5].position.set(1.5, 0, 0)
        this.spiale[5].position.set(0, 0, 0)
        this.meshs[4].position.set(0.5, -0.5, 0)
        this.spiale[4].position.set(0, 1.5, 0)
        // 盒子右部
        spiale[3].rotation.y = -(step - 90) * ratio
        spiale[4].rotation.x = 0
        spiale[4].rotation.z = 0
        spiale[4].rotation.y = -(step - 90) * ratio
        spiale[5].rotation.y = -(step - 90) * ratio
      } else if (step <= 270) {
        spiale[5].rotation.y = -90 * ratio
        spiale[4].rotation.y = 270 * ratio
        // 盒子右部
        spiale[1].rotation.x = -(step - 180) * ratio
      } else if (step < 360) {
        spiale[5].rotation.y = -90 * ratio
        spiale[4].rotation.y = (step) * ratio
      } else if (step <= 450) {
        spiale[5].rotation.y = -(step - 270) * ratio
      }
      this.renderScene()
    },
    creatCube (scene, renderer, camera) {
      // 创建正方体的6个平面
      // 定义长宽都是1平面
      const geometry = new THREE.PlaneGeometry(1, 1)
      // 定义6个颜色
      const colors = ['#fc734f', '#ffc864', '#6f66f7', '#d0bbf4', '#d3b020', '#68ed32']
      // 定义6个坐标
      // const positions = [[-1.5, 0, 0], [-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0]]
      const positions = [[-0.5, -0.5, 0], [0, -0.5, 0], [-0.5, -1, 0], [0.5, 0, 0], [0.5, 1, 0], [1.5, 0, 0]]
      // 定义6个转轴
      const axiss = [[-1, 0.5, 0], [-0.5, -0.5, 0], [0, 1, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
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
        this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
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
      // 调试转轴
      // this.spiale[4].add(new THREE.AxesHelper(50))
      // this.spiale[5].add(new THREE.AxesHelper(50))
      setTimeout(() => {
        this.renderScene()
      }, 20)
    }
  }
}
</script>
