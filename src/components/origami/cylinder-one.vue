<template lang="pug">
  .cylinder-one
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
      degree1: 2,
      degree2: 3,
      knots1: [0, 0, 0, 1, 1, 1],
      knots2: [0, 0, 0, 0, 1, 1, 1, 1]
    }
  },
  created () {
    const calcBasisFunctions = (span, u, p, U) => {
      var N = []
      var left = []
      var right = []
      N[ 0 ] = 1.0
      for (var j = 1; j <= p; ++j) {
        left[ j ] = u - U[ span + 1 - j ]
        right[ j ] = U[ span + j ] - u
        var saved = 0.0
        for (var r = 0; r < j; ++r) {
          var rv = right[ r + 1 ]
          var lv = left[ j - r ]
          var temp = N[ r ] / (rv + lv)
          N[ r ] = saved + rv * temp
          saved = lv * temp
        }
        N[ j ] = saved
      }
      return N
    }
    const findSpan = (p, u, U) => {
      var n = U.length - p - 1
      if (u >= U[ n ]) {
        return n - 1
      }
      if (u <= U[ p ]) {
        return p
      }
      var low = p
      var high = n
      var mid = Math.floor((low + high) / 2)
      while (u < U[ mid ] || u >= U[ mid + 1 ]) {
        if (u < U[ mid ]) {
          high = mid
        } else {
          low = mid
        }
        mid = Math.floor((low + high) / 2)
      }
      return mid
    }
    const calcSurfacePoint = (p, q, U, V, P, u, v) => {
      var uspan = findSpan(p, u, U)
      var vspan = findSpan(q, v, V)
      var Nu = calcBasisFunctions(uspan, u, p, U)
      var Nv = calcBasisFunctions(vspan, v, q, V)
      var temp = []
      for (let l = 0; l <= q; ++l) {
        temp[ l ] = new THREE.Vector4(0, 0, 0, 0)
        for (var k = 0; k <= p; ++k) {
          var point = P[ uspan - p + k ][ vspan - q + l ].clone()
          var w = point.w
          point.x *= w
          point.y *= w
          point.z *= w
          temp[ l ].add(point.multiplyScalar(Nu[ k ]))
        }
      }
      var Sw = new THREE.Vector4(0, 0, 0, 0)
      for (let l = 0; l <= q; ++l) {
        Sw.add(temp[ l ].multiplyScalar(Nv[ l ]))
      }
      Sw.divideScalar(Sw.w)
      return new THREE.Vector3(Sw.x, Sw.y, Sw.z)
    }
    /**************************************************************
     *NURBS surface
    **************************************************************/
    THREE.NURBSSurface = function (degree1, degree2, knots1, knots2 /* arrays of reals */, controlPoints /* array^2 of Vector(2|3|4) */) {
      console.log('sdsd')
      this.degree1 = degree1
      this.degree2 = degree2
      this.knots1 = knots1
      this.knots2 = knots2
      this.controlPoints = []
      var len1 = knots1.length - degree1 - 1
      var len2 = knots2.length - degree2 - 1
      // ensure Vector4 for control points
      for (var i = 0; i < len1; ++i) {
        this.controlPoints[ i ] = []
        for (var j = 0; j < len2; ++j) {
          var point = controlPoints[ i ][ j ]
          this.controlPoints[ i ][ j ] = new THREE.Vector4(point.x, point.y, point.z, point.w)
        }
      }
    }
    THREE.NURBSSurface.prototype = {
      constructor: THREE.NURBSSurface,
      getPoint: (t1, t2) => {
        console.log(this.knots1)
        var u = this.knots1[ 0 ] + t1 * (this.knots1[ this.knots1.length - 1 ] - this.knots1[ 0 ]) // linear mapping t1->u
        var v = this.knots2[ 0 ] + t2 * (this.knots2[ this.knots2.length - 1 ] - this.knots2[ 0 ]) // linear mapping t2->u
        return calcSurfacePoint(this.degree1, this.degree2, this.knots1, this.knots2, this.controlPoints, u, v)
      }
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
    nextStep () {
      setTimeout(() => {
        // this.step++
        // this.animation(this.step)
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
        spiale[0].rotation.y = step * (Math.PI / 180)
        spiale[1].rotation.y = step * (Math.PI / 180)
        // 盒子右部
        spiale[3].rotation.y = -step * (Math.PI / 180)
        // 盒子上部
        spiale[4].rotation.x = step * (Math.PI / 180)
        // 盒子下部
        spiale[5].rotation.x = -step * (Math.PI / 180)
        this.nextStep()
      }
    },
    creatCube (scene, renderer, camera) {
      // 创建长方体的圆面
      let cylinderGeometry = new THREE.CircleGeometry(0.5, 64, 0, 2 * Math.PI)
      const geometry = new THREE.PlaneGeometry(Math.PI, 2, 19, 0)
      // 定义6个颜色
      const colors = ['#64e530', '#ccaa1f', '#6b63ef']
      // 定义6个坐标
      const positions = [[-Math.PI / 2 + 0.5, 1.5, 0], [0, 0, 0], [-Math.PI / 2 + 0.5, -1.5, 0]]
      // 定义6个转轴
      const axiss = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
      // ----------------------------
      // 待完善
      // console.log(geometry.vertices)
      const ban = geometry.vertices.length / 2
      // const du = 0.5 / 10
      const ke = 1 / 10
      const yiban = ban / 2
      // console.log(ban / 2)
      for (let i = 0; i < yiban; i++) {
        geometry.vertices[yiban - i].z = -i * ke
        geometry.vertices[yiban * 3 - i].z = -i * ke
        geometry.vertices[yiban + i].z = -i * ke
        geometry.vertices[yiban * 3 + i].z = -i * ke
      }
      // for (let i = 0; i < ban; i++) {
      //   geometry.vertices[2 * i].z = Math.pow(2, i / 20)
      //   geometry.vertices[2 * i + 1].z = Math.pow(2, i / 20)
      // }
      // ---------------------------
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
      //      this.camera.position.x = 0
      //      this.camera.position.y = 0
      //      this.camera.position.z = 6
      //      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      //      this.scene.add(this.meshs[0])
      // this.spiale[0].add(this.meshs[0])
      // 调试转轴
      this.spiale[0].add(new THREE.AxesHelper(50))
      // NURBS surface
      const nsControlPoints = [
        [
          new THREE.Vector4(-200, -200, 100, 1),
          new THREE.Vector4(-200, -100, -200, 1),
          new THREE.Vector4(-200, 100, 250, 1),
          new THREE.Vector4(-200, 200, -100, 1)
        ],
        [
          new THREE.Vector4(0, -200, 0, 1),
          new THREE.Vector4(0, -100, -100, 5),
          new THREE.Vector4(0, 100, 150, 5),
          new THREE.Vector4(0, 200, 0, 1)
        ],
        [
          new THREE.Vector4(200, -200, -100, 1),
          new THREE.Vector4(200, -100, 200, 1),
          new THREE.Vector4(200, 100, -250, 1),
          new THREE.Vector4(200, 200, 100, 1)
        ]
      ]
      const knots1 = [0, 0, 0, 1, 1, 1]
      const knots2 = [0, 0, 0, 0, 1, 1, 1, 1]
      const nurbsSurface = new THREE.NURBSSurface(2, 3, knots1, knots2, nsControlPoints)
      const geometry2 = new THREE.ParametricBufferGeometry((u, v) => {
        return nurbsSurface.getPoint(u, v)
      }, 20, 20)
      var object = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({
        color: '#cccccc',
        transparent: true,
        // 双面双面贴图
        side: THREE.DoubleSide
      }))
      object.scale.multiplyScalar(1)
      // this.scene.add(object)
      setTimeout(() => {
        this.nextStep()
      }, 0)
    }
  }
}
</script>
