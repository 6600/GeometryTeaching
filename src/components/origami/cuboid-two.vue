<template lang="pug">
  .cuboid-two
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
const THREE = require('three')
export default {
  name: 'cuboid-two',
  data () {
    return {
      camera: null,
      renderer: null,
      scene: null,
      spiale: [],
      meshs: [],
      step: 0,
      pause: false,
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
      const ratio = Math.PI / 180
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * ratio
        spiale[1].rotation.y = step * ratio
        this.nextStep(2, this.close)
      } else if (step <= 180) {
        // 盒子右部
        spiale[3].rotation.x = (step - 90) * ratio
        // 盒子上部
        spiale[4].rotation.x = (step - 90) * ratio
        // 盒子下部
        spiale[5].rotation.x = (step - 90) * ratio
        this.nextStep(2, this.close)
      } else if (step === 182) {
        // 平面的位置
        this.meshs[4].position.set(1, 0.5, 0)
        this.spiale[4].position.set(0.25, 1, 0)
        // 转轴的位置
        this.meshs[5].position.set(2.25, 0.5, 0)
        this.spiale[5].position.set(0.25, 1, 0)
        spiale[4].rotation.y = -ratio
        spiale[5].rotation.y = -ratio
        this.nextStep(2, this.close)
      } else if (step <= 270) {
        // spiale[0].rotation.y = (step - 90) * ratio
        spiale[4].rotation.y = -(step - 180) * ratio
        spiale[5].rotation.y = -(step - 180) * ratio
        this.nextStep(2, this.close)
      } else if (step === 272) {
        console.log(this.meshs[0].position, this.spiale[0].position)
        // 重设0面转轴
        this.meshs[0].position.set(-0.25, 0, 0)
        this.spiale[0].position.set(-0.25, 0, 1)
        spiale[0].rotation.y = 90 * ratio
        this.nextStep(2, this.close)
      } else if (step < 360) {
        spiale[0].rotation.y = (step - 180) * ratio
        this.nextStep(2, this.close)
      } else if (step === 362) {
        this.meshs[5].position.set(0.25, 0.5, 0)
        this.spiale[5].position.set(0.25, -1, 0)
        spiale[5].rotation.y = -180 * ratio
        this.nextStep(2, this.close)
      } else if (step < 450) {
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
      const ratio = Math.PI / 180
      if (step < 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * ratio
        spiale[1].rotation.y = step * ratio
        this.nextStep(-2, this.open)
      } else if (step <= 180) {
        // 盒子右部
        spiale[3].rotation.x = (step - 90) * ratio
        // 盒子上部
        spiale[4].rotation.x = (step - 90) * ratio
        // 盒子下部
        spiale[5].rotation.x = (step - 90) * ratio
        this.nextStep(-2, this.open)
      } else if (step === 182) {
        // 平面的位置
        this.meshs[4].position.set(1.25, 0.5, 0)
        this.spiale[4].position.set(0, 1, 0)
        // 转轴的位置
        this.meshs[5].position.set(2.5, 0.5, 0)
        this.spiale[5].position.set(0, 1, 0)
        spiale[4].rotation.y = -ratio
        spiale[5].rotation.y = -ratio
        this.nextStep(-2, this.open)
      } else if (step <= 270) {
        // spiale[0].rotation.y = (step - 90) * ratio
        spiale[4].rotation.y = -(step - 180) * ratio
        spiale[5].rotation.y = -(step - 180) * ratio
        this.nextStep(-2, this.open)
      } else if (step === 272) {
        // 重设0面转轴
        this.meshs[0].position.set(-1.25, 0, 0)
        this.spiale[0].position.set(-0.25, 0, 0)
        spiale[0].rotation.y = 90 * ratio
        this.nextStep(-2, this.open)
      } else if (step < 360) {
        spiale[0].rotation.y = (step - 180) * ratio
        this.nextStep(-2, this.open)
      } else if (step === 362) {
        this.meshs[5].position.set(2.25, 0.5, 0)
        this.spiale[5].position.set(0.25, 1, 0)
        spiale[5].rotation.y = -90 * ratio
        this.nextStep(-2, this.open)
      } else if (step <= 450) {
        spiale[5].rotation.y = -(step - 270) * ratio
        this.nextStep(-2, this.open)
      }
    },
    dragClose (step) {
      const spiale = this.spiale
      const ratio = (Math.PI / 180)
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * ratio
        spiale[1].rotation.y = step * ratio
      } else if (step <= 180) {
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.y = 90 * ratio
        // 盒子右部
        spiale[3].rotation.x = (step - 90) * ratio
        // 盒子上部
        spiale[4].rotation.x = (step - 90) * ratio
        // 盒子下部
        spiale[5].rotation.x = (step - 90) * ratio
      } else if (step <= 270) {
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.y = 90 * ratio
        // 盒子右部
        spiale[3].rotation.x = 90 * ratio
        // 平面的位置
        this.meshs[4].position.set(1, 0.5, 0)
        this.spiale[4].position.set(0.25, 1, 0)
        // 转轴的位置
        this.meshs[5].position.set(2.25, 0.5, 0)
        this.spiale[5].position.set(0.25, 1, 0)
        spiale[4].rotation.y = -(step - 180) * ratio
        spiale[5].rotation.y = -(step - 180) * ratio
      } else if (step < 360) {
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.y = 90 * ratio
        // 盒子右部
        spiale[3].rotation.x = 90 * ratio
        // 盒子上部
        spiale[4].rotation.x = 90 * ratio
        // 盒子下部
        spiale[5].rotation.x = 90 * ratio
        // 平面的位置
        this.meshs[4].position.set(1, 0.5, 0)
        this.spiale[4].position.set(0.25, 1, 0)
        // 转轴的位置
        this.meshs[5].position.set(2.25, 0.5, 0)
        this.spiale[5].position.set(0.25, 1, 0)
        spiale[4].rotation.y = -90 * ratio
        spiale[5].rotation.y = -90 * ratio
        // 重设0面转轴
        this.meshs[0].position.set(-0.25, 0, 0)
        this.spiale[0].position.set(-0.25, 0, 1)
        spiale[0].rotation.y = (step - 180) * ratio
      } else if (step < 450) {
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.y = 90 * ratio
        // 盒子右部
        spiale[3].rotation.x = 90 * ratio
        // 盒子上部
        spiale[4].rotation.x = 90 * ratio
        // 盒子下部
        spiale[5].rotation.x = 90 * ratio
        // 平面的位置
        this.meshs[4].position.set(1, 0.5, 0)
        this.spiale[4].position.set(0.25, 1, 0)
        // 转轴的位置
        this.meshs[5].position.set(2.25, 0.5, 0)
        this.spiale[5].position.set(0.25, 1, 0)
        spiale[4].rotation.y = -90 * ratio
        spiale[5].rotation.y = -90 * ratio
        // 重设0面转轴
        this.meshs[0].position.set(-0.25, 0, 0)
        this.spiale[0].position.set(-0.25, 0, 1)
        spiale[0].rotation.y = 180 * ratio
        this.meshs[5].position.set(0.25, 0.5, 0)
        this.spiale[5].position.set(0.25, -1, 0)
        spiale[5].rotation.y = -(step - 270) * ratio
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.renderScene()
    },
    // 待完善 不知道为什么总是出问题
    dragOpen (step) {
      const spiale = this.spiale
      const ratio = Math.PI / 180
      if (step < 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step <= 90) {
        // 重设0面转轴
        this.meshs[0].position.set(-1.25, 0, 0)
        this.spiale[0].position.set(-0.25, 0, 0)
        // 盒子左1
        spiale[0].rotation.y = step * ratio
        spiale[1].rotation.y = step * ratio
      } else if (step <= 180) {
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.y = 90 * ratio
        // 盒子右部
        spiale[3].rotation.x = (step - 90) * ratio
        // 盒子上部
        spiale[4].rotation.x = (step - 90) * ratio
        // 盒子下部
        spiale[5].rotation.x = (step - 90) * ratio
      } else if (step <= 270) {
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.y = 90 * ratio
        // 盒子右部
        spiale[3].rotation.x = 90 * ratio
        spiale[4].rotation.y = -(step - 180) * ratio
        // 转轴的位置
        this.meshs[5].position.set(2.25, 0.5, 0)
        this.spiale[5].position.set(0.25, 1, 0)
        spiale[5].rotation.y = -(step - 180) * ratio
      } else if (step < 360) {
        // 盒子左1
        spiale[0].rotation.y = 90 * ratio
        spiale[1].rotation.y = 90 * ratio
        // 盒子右部
        spiale[3].rotation.x = 90 * ratio
        spiale[4].rotation.y = -90 * ratio
        spiale[5].rotation.y = -90 * ratio
        spiale[0].rotation.y = (step - 180) * ratio
      } else if (step <= 450) {
        // 盒子左1
        spiale[0].rotation.y = 180 * ratio
        spiale[1].rotation.y = 90 * ratio
        // 盒子右部
        spiale[3].rotation.x = 90 * ratio
        // 盒子上部
        spiale[4].rotation.x = 90 * ratio
        // 盒子下部
        spiale[5].rotation.x = 90 * ratio
        spiale[5].rotation.y = -90 * ratio
        spiale[5].rotation.y = -(step - 270) * ratio
      }
      this.renderScene()
    },
    creatCube (scene, renderer, camera) {
      // 创建长方体的6个平面
      // 定义长宽都是1平面
      const geometry = new THREE.PlaneGeometry(1, 2)
      const geometry1 = new THREE.PlaneGeometry(0.5, 2)
      const geometry2 = new THREE.PlaneGeometry(0.5, 1)
      const geometry3 = new THREE.PlaneGeometry(2, 1)
      // 定义6个颜色
      const colors = ['#ccb8f0', '#fbc562', '#f8714e', '#fbc562', '#66e931', '#6d64f3']
      // 定义6个坐标
      const positions = [[-1.25, 0, 0], [-0.5, 0, 0], [0, 0, 0], [0, 0.5, 0], [1.25, 0.5, 0], [2.5, 0.5, 0]]
      // 定义6个转轴
      const axiss = [[-0.25, 0, 0], [-0.25, 0, 0], [0, 0, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]]
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
        if (index === '0' || index === '2') {
          this.meshs[index] = new THREE.Mesh(geometry1, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1') {
          this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '3' || index === '5') {
          this.meshs[index] = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '4') {
          this.meshs[index] = new THREE.Mesh(geometry3, new THREE.MeshPhongMaterial({
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
