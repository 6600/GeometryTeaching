'use strict'
import Vue from 'vue'
const THREE = require('three')
// const OrbitControls = require('three-orbit-controls')(THREE)
const Order = new Vue()
const Fun = {
  init3D (DOM, callBack) {
    const WIDTH = document.documentElement.clientWidth - 244
    const HEIGHT = document.documentElement.clientHeight - 218
    // 创建场景
    let scene = new THREE.Scene()
    // 配置渲染器
    let renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
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
    let camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000)
    // 设置相机位置
    camera.position.set(0.02, 0, 8)
    // 指定它看着原点方向
    camera.lookAt(scene.position)
    // 给场景追加相机
    scene.add(camera)

    // --------------------------- 创建光照 ---------------------------
    // 方向光源
    let object3d = new THREE.DirectionalLight('white', 0.8)
    object3d.position.set(0, 0, 26)
    object3d.name = 'Back light'
    scene.add(object3d)
    // 方向光源
    object3d = new THREE.DirectionalLight('white', 0.6)
    object3d.position.set(0, 0, -6)
    object3d.name = 'Key light'
    scene.add(object3d)
    // 方向光源
    object3d = new THREE.DirectionalLight('white', 0.6)
    object3d.position.set(-2, 6, 0)
    object3d.name = 'Key light'
    scene.add(object3d)
    // 方向光源
    object3d = new THREE.DirectionalLight('white', 0.6)
    object3d.position.set(0, -10, 0)
    object3d.name = 'Key light'
    scene.add(object3d)
    window.onresize = function () {
      const WIDTH = document.documentElement.clientWidth > 920 ? document.documentElement.clientWidth - 244 : 920 - 244
      const HEIGHT = document.documentElement.clientHeight > 576 ? document.documentElement.clientHeight - 218 : 576 - 218
      camera.aspect = WIDTH / HEIGHT
      camera.updateProjectionMatrix()
      renderer.setSize(WIDTH, HEIGHT)
    }

    // controls
    // const controls = new OrbitControls(camera)
    // controls.maxPolarAngle = Math.PI * 0.5
    // controls.minDistance = 1000
    // controls.maxDistance = 5000
    // controls.update()
    callBack({scene, renderer, camera})
  },
  /**
   * 在本地进行文件保存
   * @param  {String} data     要保存到本地的图片数据
   * @param  {String} filename 文件名
  */
  saveFile (data, filename) {
    let saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    saveLink.href = data
    saveLink.download = filename
    const event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    saveLink.dispatchEvent(event)
  }
}

export { Order, Fun }
