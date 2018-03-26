<template lang="pug">
  .cuboid-four
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
      step: 0
    }
  },
  mounted () {
    Fun.init3D(this.$el).then((Object3D) => {
      this.camera = Object3D.camera
      this.renderer = Object3D.renderer
      this.scene = Object3D.scene
      this.creatCube(Object3D.scene, Object3D.renderer, Object3D.camera)
    })
  },
  methods: {
    nextStep () {
      setTimeout(() => {
        this.step++
        this.animation(this.step)
        this.renderScene()
      }, 20)
    },
    renderScene () {
      this.renderer.render(this.scene, this.camera)
    },
    animation (step) {
      const spiale = this.spiale
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.x = step * (Math.PI / 180)
        // spiale[1].rotation.y = step * (Math.PI / 180)
        // 盒子右部
        spiale[3].rotation.x = -step * (Math.PI / 180)
        // 盒子上部
        spiale[4].rotation.x = -step * (Math.PI / 180)
        // 盒子下部
        spiale[5].rotation.x = -step * (Math.PI / 180)
        this.nextStep()
      } else if (step === 91) {
        // 重设0面转轴
        this.meshs[5].position.set(1, -0.25, 0)
        this.spiale[5].position.set(0.25, -1, 0.5)
        this.spiale[0].rotation.z = -(step - 90) * (Math.PI / 180)
        this.spiale[1].rotation.y = (step - 90) * (Math.PI / 180)
        this.nextStep()
      } else if (step < 181) {
        this.spiale[0].rotation.z = -(step - 90) * (Math.PI / 180)
        this.spiale[1].rotation.y = (step - 90) * (Math.PI / 180)
        this.spiale[5].rotation.x = -step * (Math.PI / 180)
        // this.spiale[4].rotation.y = -(step - 90) * (Math.PI / 180)
        // this.spiale[5].rotation.y = -(step - 90) * (Math.PI / 180)
        this.nextStep()
      } else if (step === 181) {
        // this.meshs[5].position.set(0.25, 0.5, 0)
        // this.spiale[5].position.set(0.25, -1, 0)
        // spiale[5].rotation.y = (-step + 90) * (Math.PI / 180)
        this.nextStep()
      } else if (step < 271) {
        spiale[4].rotation.y = -(step - 180) * (Math.PI / 180)
        spiale[5].rotation.z = -(step - 180) * (Math.PI / 180)
        this.nextStep()
      } else {
        console.log('动画已播放完毕!')
      }
    },
    creatCube (scene, renderer, camera) {
      // 创建长方体的6个平面
      // 定义长宽都是1平面
      const geometry = new THREE.PlaneGeometry(0.5, 0.5)
      const geometry1 = new THREE.PlaneGeometry(0.5, 2)
      const geometry2 = new THREE.PlaneGeometry(2, 0.5)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef', '#f6c161', '#f46f4c', '#c9b5ec']
      // 定义6个坐标
      const positions = [[-0.25, 0.25, 0], [-0.25, 0, 0], [0, 0, 0], [0, -0.25, 0], [1, -0.25, 0], [1, -0.75, 0]]
      // 定义6个转轴
      const axiss = [[-0.25, 1, 0], [-0.25, 0, 0], [0, 0, 0], [0, -1, 0], [0.25, -1, 0], [0.25, -1, 0]]
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
        if (index === '0' || index === '3') {
          this.meshs[index] = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1' || index === '2') {
          this.meshs[index] = new THREE.Mesh(geometry1, new THREE.MeshLambertMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '4' || index === '5') {
          this.meshs[index] = new THREE.Mesh(geometry2, new THREE.MeshLambertMaterial({
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
      this.spiale[4].add(new THREE.AxesHelper(50))
      setTimeout(() => {
        this.nextStep()
      }, 0)
    }
  }
}
</script>
