const THREE = require('three')
const Fun = {
  init3D (DOM) {
    return new Promise((resolve, reject) => {
      const WIDTH = 780
      const HEIGHT = 550
      // 创建场景
      let scene = new THREE.Scene()
      // 配置渲染器
      let renderer = new THREE.WebGLRenderer({ antialias: true })
      // 设置渲染器大小
      renderer.setSize(WIDTH, HEIGHT)
      // 设置canvas背景色(clearColor)和背景色透明度（clearAlpha）
      renderer.setClearColor(0xffffff, 1)
      // 添加阴影
      renderer.shadowMap.enabled = true
      // 添加软阴影
      renderer.shadowMapSoft = true
      // 将渲染DOM追加到页面上
      DOM.appendChild(renderer.domElement)
      // 配置 透视 相机
      // PerspectiveCamera(fov, aspect, near, far)
      // Fov – 相机的视锥体的垂直视野角
      // Aspect – 相机视锥体的长宽比
      // Near – 相机视锥体的近平面
      // Far – 相机视锥体的远平面
      let camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)
      // 设置相机位置
      camera.position.set(0, 0, 8)
      // 指定它看着原点方向
      camera.lookAt(scene.position)
      // 给场景追加相机
      scene.add(camera)

      // --------------------------- 创建光照 ---------------------------
      // 方向光源
      let object3d = new THREE.DirectionalLight('white', 1)
      object3d.position.set(0, 0, 6)
      object3d.name = 'Back light'
      scene.add(object3d)
      // 方向光源
      object3d = new THREE.DirectionalLight('white', 1)
      object3d.position.set(0, 0, -6)
      object3d.name = 'Key light'
      scene.add(object3d)
      // 方向光源
      object3d = new THREE.DirectionalLight('white', 1)
      object3d.position.set(-2, 6, 0)
      object3d.name = 'Key light'
      scene.add(object3d)
      resolve({scene, renderer, camera})
    })
  },
  // 绘制三角形平面函数
  drawTriangle (option) {
    return new Promise((resolve, reject) => {
      let meshList = []
      option.forEach(element => {
        // 创建正方体的6个平面
        // 创建三角形
        let geometry = new THREE.Geometry() // 声明一个空几何体对象
        element.spot.forEach(item => {
          // 将所有点合成成面
          geometry.vertices.push(new THREE.Vector3(...item))
        })
        let normal = new THREE.Vector3(0, 0, 1) // 三角面法向量
        let face = new THREE.Face3(0, 1, 2, normal) // 创建三角面
        geometry.faces.push(face) // 三角面添加到几何体
        let material = new THREE.MeshLambertMaterial({
          color: element.color, // 三角面颜色
          side: THREE.DoubleSide // 两面可见
        }) // 材质对象
        let mesh = new THREE.Mesh(geometry, material) // 网格模型对象
        meshList.push(mesh)
      })
      resolve(meshList)
    })
  }
}

export { Fun }
