<template lang="pug">
  .cube-one
</template>

<script>
const THREE = require('three')
export default {
  name: 'HelloWorld',
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      spiale: [],
      meshs: []
    }
  },
  mounted () {
    this.init()
    this.setLight()
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
    this.spiale[0].add(new THREE.AxesHelper(50))
    setTimeout(() => {
      this.animate()
    }, 0)
  },
  methods: {
    init () {
      const WIDTH = window.innerWidth
      const HEIGHT = window.innerHeight
      // 获取DOM容器
      const DOM = this.$el
      // 创建场景
      this.scene = new THREE.Scene()
      // 配置渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      // 设置渲染器大小
      this.renderer.setSize(WIDTH, HEIGHT)
      // 设置canvas背景色(clearColor)和背景色透明度（clearAlpha）
      this.renderer.setClearColor(0x333F47, 1)
      // 添加阴影
      this.renderer.shadowMap.enabled = true
      // 添加软阴影
      this.renderer.shadowMapSoft = true
      // 将渲染DOM追加到页面上
      DOM.appendChild(this.renderer.domElement)
      // 配置 透视 相机
      // PerspectiveCamera(fov, aspect, near, far)
      // Fov – 相机的视锥体的垂直视野角
      // Aspect – 相机视锥体的长宽比
      // Near – 相机视锥体的近平面
      // Far – 相机视锥体的远平面
      this.camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)
      // 设置相机位置
      this.camera.position.set(-2, 2, 6)
      // 指定它看着原点方向
      this.camera.lookAt(this.scene.position)
      // 给场景追加相机
      this.scene.add(this.camera)
    },
    setLight () {
      // --------------------- 方向光源 --------------------- //
      let object3d = new THREE.DirectionalLight('white', 1)
      object3d.position.set(0, 0, 6)
      object3d.name = 'Back light'
      this.scene.add(object3d)
      // 方向光源
      object3d = new THREE.DirectionalLight('white', 1)
      object3d.position.set(0, 0, -6)
      object3d.name = 'Key light'
      this.scene.add(object3d)
      // 方向光源
      object3d = new THREE.DirectionalLight('white', 1)
      object3d.position.set(-2, 6, 0)
      object3d.name = 'Key light'
      this.scene.add(object3d)
    },
    animate () {
      if (this.close()) {
        requestAnimationFrame(this.animate)
        this.renderScene()
      }
    },
    renderScene () {
      this.renderer.render(this.scene, this.camera)
    },
    close () {
      const spiale = this.spiale
      // 动画的第一部分是盒子四个面关上
      if (spiale[3].rotation.y > -90 * (Math.PI / 180)) {
        // 盒子左1
        spiale[0].rotation.y += (Math.PI / 180)
        spiale[1].rotation.y += (Math.PI / 180)
        // // 盒子下部
        spiale[5].rotation.x -= (Math.PI / 180)
        // 盒子右部
        spiale[3].rotation.y -= (Math.PI / 180)
        // 盒子上部
        spiale[4].rotation.x += (Math.PI / 180)
        return true
      } else if (spiale[0].rotation.y < 179 * (Math.PI / 180)) {
        this.meshs[0].position.set(-0.5, 0, 0)
        this.spiale[0].position.set(-0.5, 0, 1)
        spiale[0].rotation.y += (Math.PI / 180)
        return true
      } else {
        console.log(spiale[0].rotation.y)
        console.log('关闭结束')
        return false
      }
    },
    top () {

    }
  }
}
</script>

<style lang='less' scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
