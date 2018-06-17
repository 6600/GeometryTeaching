<template lang="pug">
  .mitsubishi-column-one
</template>

<script>
import { Order, Fun } from '@/components/Order.js'
const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
export default {
  name: 'mitsubishiColumnOne',
  data () {
    return {
      camera: null,
      renderer: null,
      spiale: [],
      meshs: [],
      pause: false,
      step: 0,
      controls: null,
      stepCount: 420
    }
  },
  mounted () {
    console.log(this)
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
    animate () {
      requestAnimationFrame(this.animate)
      this.renderScene()
    },
    closeBox () {
      // console.log('关闭盒子', auto)
      setTimeout(() => {
        this.step++
        this.$emit('stepChange', this.step)
        // 判断是否暂停
        if (this.pause) {
          this.pause = false
        } else {
          this.close(this.step)
        }
        this.renderScene()
      }, 20)
    },
    openBox () {
      // console.log('关闭盒子', auto)
      setTimeout(() => {
        this.step--
        this.$emit('stepChange', this.step)
        // 判断是否暂停
        if (this.pause) {
          this.pause = false
        } else {
          this.open(this.step)
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
      if (step <= 90) {
        // 盒子左1
        spiale[3].rotation.x = step * ratio
        this.closeBox()
      } else if (step <= 180) {
        // 上部
        spiale[4].rotation.x = -(step - 90) * ratio
        this.closeBox()
      } else if (step <= 300) {
        spiale[0].rotation.y = (step - 180) * ratio
        this.closeBox()
      } else if (step <= 420) {
        spiale[2].rotation.y = -(step - 300) * ratio
        this.closeBox()
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
        spiale[3].rotation.x = step * ratio
        this.openBox()
      } else if (step <= 180) {
        // 上部
        spiale[4].rotation.x = -(step - 90) * ratio
        this.openBox()
      } else if (step <= 300) {
        spiale[0].rotation.y = (step - 180) * ratio
        this.openBox()
      } else if (step <= 420) {
        spiale[2].rotation.y = -(step - 300) * ratio
        this.openBox()
      }
    },
    dragClose (step) {
      this.step = step
      const spiale = this.spiale
      const ratio = (Math.PI / 180)
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
      if (step <= 90) {
        // 盒子左1
        spiale[3].rotation.x = step * ratio
        spiale[4].rotation.x = 0
        spiale[0].rotation.y = 0
        spiale[2].rotation.y = 0
      } else if (step <= 180) {
        // 盒子左1
        spiale[3].rotation.x = 90 * ratio
        // 上部
        spiale[4].rotation.x = -(step - 90) * ratio
      } else if (step <= 300) {
        // 盒子左1
        spiale[3].rotation.x = 90 * ratio
        // 上部
        spiale[4].rotation.x = -90 * ratio
        spiale[0].rotation.y = (step - 180) * ratio
      } else if (step <= 420) {
        // 盒子左1
        spiale[3].rotation.x = 90 * ratio
        // 上部
        spiale[4].rotation.x = -90 * ratio
        spiale[0].rotation.y = 120 * ratio
        spiale[2].rotation.y = -(step - 300) * ratio
      }
      this.renderScene()
    },
    dragOpen (step) {
      this.dragClose(step)
    },
    creatMitsubishiColumn (scene, renderer, camera) {
      this.controls = new OrbitControls(this.camera)
      // 创建正方体的6个平面
      // 定义长宽都是1平面
      const PlaneGeometry = new THREE.PlaneGeometry(1, 2)
      let shape1 = new THREE.Shape()
      shape1.moveTo(0, 0)
      shape1.lineTo(1, 0)
      shape1.lineTo(0.5, Math.sqrt(3) / 2)
      shape1.lineTo(0, 0)
      let triangleGeometry1 = new THREE.ShapeGeometry(shape1)
      let shape2 = new THREE.Shape()
      shape2.moveTo(0, 0)
      shape2.lineTo(1, 0)
      shape2.lineTo(0.5, -Math.sqrt(3) / 2)
      shape2.lineTo(0, 0)
      let triangleGeometry2 = new THREE.ShapeGeometry(shape2)
      // 定义3个颜色
      const colors = ['#ccb8f0', '#f8714e', '#fbc562', '#cfad1f', '#66e931']
      // 定义3个坐标
      const positions = [[-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [-0.5, 0, 0], [-0.5, 0, 0]]
      // 定义3个转轴
      const axiss = [[-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [0, 1, 0], [0, -1, 0]]
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
        if (index === '3') {
          this.meshs[index] = new THREE.Mesh(triangleGeometry1, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '4') {
          this.meshs[index] = new THREE.Mesh(triangleGeometry2, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else {
          this.meshs[index] = new THREE.Mesh(PlaneGeometry, new THREE.MeshPhongMaterial({
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
      // this.spiale[1].add(new THREE.AxesHelper(50))
      this.animate()
    }
  }
}
</script>
