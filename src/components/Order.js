'use strict'
import Vue from 'vue'
const THREE = require('three')

const Order = new Vue()
const Fun = {
  init3D (DOM, callBack) {
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
    callBack({scene, renderer, camera})
  }
}

export { Order, Fun }
