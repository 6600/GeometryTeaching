<template lang="pug">
  .cylinder-one
</template>

<script>
import '../../assets/curves/NURBSCurve.js'
import '../../assets/curves/NURBSSurface.js'
import '../../assets/curves/NURBSUtils.js'
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
      degree1: 2,
      degree2: 3,
      knots1: [0, 0, 0, 1, 1, 1],
      knots2: [0, 0, 0, 0, 1, 1, 1, 1]
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
      const spiale = this.spiale
      // spiale[1].matrixWorld.elements[0] = 0
      console.log(this.meshs[1])
      if (step <= 90) {
        // 盒子左1
        spiale[0].rotation.x = step * (Math.PI / 180)
        spiale[2].rotation.x = -step * (Math.PI / 180)
        this.nextStep(2, this.close)
      }
    },
    creatCube (scene, renderer, camera) {
      console.log(0.5)
      // NURBS surface
      const nsControlPoints = [
        [
          new THREE.Vector4(0, -1, 1, 1),
          new THREE.Vector4(0, -0.5, 1, 1),
          new THREE.Vector4(0, 0.5, 1, 1),
          new THREE.Vector4(0, 1, 1, 1)
        ],
        [
          new THREE.Vector4(-0.5, -1, -0.5, 1),
          new THREE.Vector4(-0.5, -0.5, -0.5, 1),
          new THREE.Vector4(-0.5, 0.5, -0.5, 1),
          new THREE.Vector4(-0.5, 1, -0.5, 1)
        ],
        [
          new THREE.Vector4(-1, -1, 1, 1),
          new THREE.Vector4(-1, -0.5, 1, 1),
          new THREE.Vector4(-1, 0.5, 1, 1),
          new THREE.Vector4(-1, 1, 1, 1)
        ],
        [
          new THREE.Vector4(0.5, -1, 0.5, 1),
          new THREE.Vector4(0.5, -0.5, 0.5, 1),
          new THREE.Vector4(0.5, 0.5, 0.5, 1),
          new THREE.Vector4(0.5, 1, 0.5, 1)
        ],
        [
          new THREE.Vector4(0, -1, 0, 1),
          new THREE.Vector4(0, -0.5, 0, 1),
          new THREE.Vector4(0, 0.5, 0, 1),
          new THREE.Vector4(0, 1, 0, 1)
        ]
      ]
      const knots1 = [0, 0, 0, 0, 0.5, 0.5, 1, 1, 1, 1]
      const knots2 = [0, 0, 0, 0, 1, 1, 1, 1]
      // console.log(nsControlPoints)
      const nurbsSurface = new THREE.NURBSSurface(4, 3, knots1, knots2, nsControlPoints)
      const geometry2 = new THREE.ParametricBufferGeometry((u, v) => {
        // console.log(nurbsSurface.getPoint(u, v))
        return nurbsSurface.getPoint(u, v)
      }, 20, 20)
      console.log(geometry2)
      let cylinderGeometry = new THREE.CircleGeometry(0.5, 64, 0, 2 * Math.PI)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef']
      // 定义6个坐标
      const positions = [[0, 0.5, 0], [0, 0, 0], [0, -0.5, 0]]
      // 定义6个转轴
      const axiss = [[0, 1, 0], [0, 0, 0], [0, -1, 0]]
      // ----------------------------
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
          this.meshs[index] = new THREE.Mesh(cylinderGeometry, new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            // 双面双面贴图
            side: THREE.DoubleSide
          }))
        } else if (index === '1') {
          this.meshs[index] = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({
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
      this.spiale[0].add(new THREE.AxesHelper(50))
      setTimeout(() => {
        this.renderScene()
      }, 0)
    }
  }
}
</script>
