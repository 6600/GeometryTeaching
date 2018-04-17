<template lang="pug">
  .pyramid-three-two
</template>

<script>
import { Order, Fun } from '@/components/Order.js'
const THREE = require('three')
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
      stepCount: 334
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
      if (step <= 117) {
        // 盒子左1
        spiale[1].rotateY(-ratio)
        this.closeBox()
      } else if (step <= 234) {
        // 上部
        spiale[2].rotateY(ratio)
        this.closeBox()
      } else if (step <= 334) {
        spiale[3].rotateX(-ratio)
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
      if (step <= 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step > 234) {
        // 盒子左1
        spiale[3].rotateX(ratio)
        this.openBox()
      } else if (step > 117) {
        // 上部
        spiale[2].rotateY(-ratio)
        this.openBox()
      } else if (step > 0) {
        spiale[1].rotateY(ratio)
        this.openBox()
      }
    },
    dragClose (step) {
      const spiale = this.spiale
      const ratio = (Math.PI / 180)
      if (step <= 90) {
        // 盒子左1
        spiale[3].rotation.x = step * ratio
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
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      this.renderScene()
    },
    dragOpen (step) {
      this.dragClose(step)
    },
    creatMitsubishiColumn (scene, renderer, camera) {
      // const ratio = Math.PI / 180
      let shape1 = new THREE.Shape()
      shape1.moveTo(0, 0)
      shape1.lineTo(1, 0)
      shape1.lineTo(0.5, Math.sqrt(3))
      shape1.lineTo(0, 0)
      let triangleGeometry1 = new THREE.ShapeGeometry(shape1)
      let shape2 = new THREE.Shape()
      shape2.moveTo(0, 0)
      shape2.lineTo(1, 0)
      shape2.lineTo(0.5, -Math.sqrt(3) / 2)
      shape2.lineTo(0, 0)
      let triangleGeometry2 = new THREE.ShapeGeometry(shape2)
      let shape3 = new THREE.Shape()
      shape3.moveTo(0, 0)
      shape3.lineTo(Math.cos(Math.PI / 2 - Math.acos(0.5 / Math.sqrt(3.25))), Math.sin(Math.PI / 2 - Math.acos(0.5 / Math.sqrt(3.25))))
      shape3.lineTo(0, Math.sqrt(3 + 0.25))
      shape3.lineTo(0, 0)
      let triangleGeometry3 = new THREE.ShapeGeometry(shape3)
      let shape4 = new THREE.Shape()
      shape4.moveTo(0, 0)
      shape4.lineTo(-Math.cos(Math.PI / 2 - Math.acos(0.5 / Math.sqrt(3.25))), Math.sin(Math.PI / 2 - Math.acos(0.5 / Math.sqrt(3.25))))
      shape4.lineTo(0, Math.sqrt(3 + 0.25))
      shape4.lineTo(0, 0)
      let triangleGeometry4 = new THREE.ShapeGeometry(shape4)
      // 定义3个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161']
      // 定义3个坐标
      const positions = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
      // 定义3个转轴
      const axiss = [[0, 0, 0], [1, 0, 0], [0, 0, 0], [0, 0, 0]]
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
          this.meshs[index] = new THREE.Mesh(triangleGeometry1, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '3') {
          this.meshs[index] = new THREE.Mesh(triangleGeometry2, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1') {
          this.meshs[index] = new THREE.Mesh(triangleGeometry3, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '2') {
          this.meshs[index] = new THREE.Mesh(triangleGeometry4, new THREE.MeshPhongMaterial({
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
      this.spiale[2].rotation.z = -Math.PI / 2 + Math.acos(0.5 / Math.sqrt(3.25))
      this.spiale[1].rotation.z = Math.PI / 2 - Math.acos(0.5 / Math.sqrt(3.25))
      setTimeout(() => {
        this.renderScene()
      }, 0)
    }
  }
}
</script>
