<template lang="pug">
  .conus-one
</template>

<script>
import { Fun } from '@/components/Order.js'
import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
const OrbitControls = require('three-orbit-controls')(THREE)
export default {
  name: 'conusTwo',
  data () {
    return {
      camera: null,
      renderer: null,
      scene: null,
      spiale: [],
      controls: null,
      meshs: [],
      step: 0,
      finish: 0,
      mixer: null,
      clock: null,
      stepCount: 93
    }
  },
  mounted () {
    this.clock = new THREE.Clock()
    Fun.init3D(this.$el, (Object3D) => {
      this.camera = Object3D.camera
      this.renderer = Object3D.renderer
      this.scene = Object3D.scene
      this.creatCube(Object3D.scene, Object3D.renderer, Object3D.camera)
    })
  },
  methods: {
    animate () {
      if (this.mixer !== null) this.mixer.update(this.clock.getDelta())
      requestAnimationFrame(this.animate)
      this.renderScene()
    },
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
    getStep (step) {
      if (step <= 0) {
        this.$emit('OpenFinish')
        console.log('动画已播放完毕!')
        return
      }
      // console.log(step)
      if (step > this.stepCount) {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
        return
      }
      if (step === this.stepCount) {
        // 广播关闭完成事件
        this.$emit('CloseFinish')
        console.log('动画已播放完毕!')
      }
      const spiale = this.spiale
      // console.log(this.meshs[0].geometry.vertices)
      // return
      if (step <= 90) {
        spiale[1].rotation.x = -step * (Math.PI / 180)
        // 因为分为上下两个顶点所以要除2
        const vLength = this.meshs[0].geometry.vertices.length / 2
        // console.log(vLength)
        // -----------------------------
        for (let i = 0; i <= vLength - 1; i++) {
          const Z = Math.abs(i - 20) * 0.05
          let X = null
          const Y = 2 - Math.sqrt(4 - Math.pow(Math.abs(i - 20) * Math.PI / 40, 2))
          // console.log(i, Y)
          // return
          this.meshs[0].geometry.vertices[i].y += (1 - Math.abs(i - 20) / 20 - 0.75) / 90
          this.meshs[0].geometry.vertices[i + 41].y -= Y / 90
          // 中心点慢慢向中心偏移
          // this.meshs[0].geometry.vertices[20].z += 1 / 90
          // this.meshs[0].geometry.vertices[61].z += 1 / 90
          if (i < 20) {
            X = -Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) + (Math.abs(i - 20) * Math.PI / 40)
            this.meshs[0].geometry.vertices[i].x += X / 90 + Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) / 90
          } else {
            X = Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) - (Math.abs(i - 20) * Math.PI / 40)
            this.meshs[0].geometry.vertices[i].x += X / 90 - Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) / 90
          }
          // console.log((20 - Math.abs(i - 20)))
          this.meshs[0].geometry.vertices[i].z = Z / 90 * step + (step * (20 - Math.abs(i - 20)) / 40 / 90)
          this.meshs[0].geometry.vertices[i + 41].z = Z / 90 * step
          this.meshs[0].geometry.vertices[i + 41].x += X / 90
        }
        // console.log(this.meshs[0].geometry.vertices)
        // return
        this.meshs[0].geometry.verticesNeedUpdate = true
      } else if (step <= 92) {
        const vLength = this.meshs[0].geometry.vertices.length / 2
        for (let i = 0; i <= vLength - 1; i++) {
          const Z = Math.abs(i - 20) * 0.05
          let X = null
          const Y = 2 - Math.sqrt(4 - Math.pow(Math.abs(i - 20) * Math.PI / 40, 2))
          // console.log(i, Y)
          // return
          this.meshs[0].geometry.vertices[i].y -= Y / 90
          this.meshs[0].geometry.vertices[i + 41].y -= Y / 90
          // 中心点慢慢向中心偏移
          // this.meshs[0].geometry.vertices[20].z += 1 / 90
          // this.meshs[0].geometry.vertices[61].z += 1 / 90
          if (i < 20) {
            X = -Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) + (Math.abs(i - 20) * Math.PI / 40)
            this.meshs[0].geometry.vertices[i].x += X / 90 + Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) / 90
          } else {
            X = Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) - (Math.abs(i - 20) * Math.PI / 40)
            this.meshs[0].geometry.vertices[i].x += X / 90 - Math.sqrt(0.25 - Math.pow(Z - 0.5, 2)) / 90
          }
          // console.log((20 - Math.abs(i - 20)))
          this.meshs[0].geometry.vertices[i].z = Z / 90 * step + (step * (20 - Math.abs(i - 20)) / 40 / 90)
          this.meshs[0].geometry.vertices[i + 41].z = Z / 90 * step
          this.meshs[0].geometry.vertices[i + 41].x += X / 90
        }
        // console.log(this.meshs[0].geometry.vertices)
        // return
        // this.meshs[0].geometry.vertices[20].x = 1
        this.meshs[0].geometry.verticesNeedUpdate = true
      } else {
        var geometry = new THREE.ConeBufferGeometry(0.5, 1.2, 100)
        this.meshs[0].geometry = geometry
        var material = new THREE.MeshBasicMaterial({color: '#fc734f'})
        this.spiale[0].position.set(0, 0.14, 0.5)
        this.meshs[0].material = material
        console.log(this.meshs[0])
      }
      return true
    },
    close (step) {
      this.mixer.timeScale = 1
      for (let i = 0; i < this.animations.length; i++) {
        let animation = this.animations[i]
        // console.log(animation)
        let action = this.mixer.clipAction(animation)
        // console.log(action)
        action.clampWhenFinished = true
        action.paused = false
        action.repetitions = 0
        action.setDuration(5).play()
      }
    },
    open (step) {
      this.mixer.timeScale = -1
      for (let i = 0; i < this.animations.length; i++) {
        let animation = this.animations[i]
        let action = this.mixer.clipAction(animation)
        action.clampWhenFinished = true
        action.paused = false
        action.loop = THREE.LoopOnce
        // console.log(action)
        action.setDuration(5).play()
      }
    },
    dragClose (step) {
      this.step = step
      if (this.getStep(step)) this.renderScene()
    },
    dragOpen (step) {
      this.step = step
      if (this.getStep(step)) this.renderScene()
    },
    creatCube (scene, renderer, camera) {
      const _this = this
      this.controls = new OrbitControls(this.camera, this.$el.childNodes[0])
      const loader = new GLTFLoader()
      loader.load('./static/gltf/27-2.gltf', function (gltf) {
        console.log(gltf)
        let object = gltf.scene
        let animations = gltf.animations
        if (animations && animations.length) {
          let object = gltf.scene
          _this.animations = gltf.animations
          if (_this.animations && _this.animations.length) {
            _this.mixer = new THREE.AnimationMixer(object)
          }
          scene.add(gltf.scene)
        }
        scene.add(object)
        _this.mixer.addEventListener('finished', (e) => {
          _this.finish++
          if (_this.finish >= 17) {
            _this.finish = 0
            // 广播关闭完成事件
            if (e.direction > 0) _this.$emit('CloseFinish')
            else _this.$emit('OpenFinish')
            console.log('动画已播放完毕!')
          }
        })
      }, undefined, (error) => {
        console.error(error)
      })
      this.animate()
    }
  }
}
</script>
