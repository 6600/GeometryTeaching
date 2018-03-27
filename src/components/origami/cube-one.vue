<template lang="pug">
  .cube-one
</template>

<script>
import { Order, Fun } from '@/components/Order.js'
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
      pause: false
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
    closeBox () {
      setTimeout(() => {
        this.step++
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
      setTimeout(() => {
        this.step = this.step - 2
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
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * (Math.PI / 180)
        spiale[1].rotation.y = step * (Math.PI / 180)
        // 盒子右部
        spiale[3].rotation.y = -step * (Math.PI / 180)
        // 盒子上部
        spiale[4].rotation.x = step * (Math.PI / 180)
        // 盒子下部
        spiale[5].rotation.x = -step * (Math.PI / 180)
        this.closeBox()
      } else if (step === 91) {
        // 重设0面转轴
        this.meshs[0].position.set(-0.5, 0, 0)
        this.spiale[0].position.set(-0.5, 0, 1)
        spiale[0].rotation.y = step * (Math.PI / 180)
        this.closeBox()
      } else if (step < 181) {
        spiale[0].rotation.y = step * (Math.PI / 180)
        this.closeBox()
      } else {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
    },
    open (step) {
      const spiale = this.spiale
      if (step < 0) {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.y = step * (Math.PI / 180)
        spiale[1].rotation.y = step * (Math.PI / 180)
        // 盒子右部
        spiale[3].rotation.y = -step * (Math.PI / 180)
        // 盒子上部
        spiale[4].rotation.x = step * (Math.PI / 180)
        // 盒子下部
        spiale[5].rotation.x = -step * (Math.PI / 180)
        this.openBox()
      } else if (step === 91) {
        // 重设0面转轴
        this.meshs[0].position.set(-1.5, 0, 0)
        this.spiale[0].position.set(-0.5, 0, 0)
        spiale[0].rotation.y = step * (Math.PI / 180)
        this.openBox()
      } else if (step < 181) {
        spiale[0].rotation.y = step * (Math.PI / 180)
        this.openBox()
      } else {
        // 广播关闭完成事件
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
      }
    },
    creatCube (scene, renderer, camera) {
      // 创建正方体的6个平面
      // 定义长宽都是1平面
      const geometry = new THREE.PlaneGeometry(1, 1)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161', '#f46f4c', '#c9b5ec']
      // 定义6个坐标
      const positions = [[-1.5, 0, 0], [-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0]]
      // 定义6个转轴
      const axiss = [[-0.5, 0, 0], [-0.5, 0, 0], [0, 0, 0], [0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0]]
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
      // 调试转轴
      // this.spiale[0].add(new THREE.AxesHelper(50))
      setTimeout(() => {
        this.renderScene()
      }, 0)
    }
  }
}
</script>

<style lang='less' scoped>
  .cube-one {
    position: relative;
  }

</style>
