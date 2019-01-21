<template lang="pug">
  .conus-one
    .block-bar
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
const OrbitControls = require('@puge/three-orbit-controls')(THREE)
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
      mixer: null,
      clock: null,
      animations: null,
      stepCount: 50,
      isPlaying: false,
      stepSave: 0,
      controls: null
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
    // 监听暂停事件
    Order.$on(`pause`, () => {
      this.isPlaying = false
      for (let i = 0; i < this.animations.length; i++) {
        let animation = this.animations[i]
        let action = this.mixer.clipAction(animation)
        action.repetitions = 0
        action.paused = true
      }
    })
  },
  beforeDestroy () { // 移除监听
    Order.$off('pause')
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
    play () {
      setTimeout(() => {
        if (!this.isPlaying) return
        // console.log(this.mixer.time * 10)
        this.step = this.mixer.time * 10
        this.$emit('stepChange', this.step)
        this.play()
      }, 20)
    },
    close (step) {
      this.mixer.time = this.step / 10
      this.isPlaying = true
      this.play()
      this.mixer.timeScale = 1
      for (let i = 0; i < this.animations.length; i++) {
        let animation = this.animations[i]
        let action = this.mixer.clipAction(animation)
        action.clampWhenFinished = true
        action.paused = false
        action.loop = THREE.LoopOnce
        action.setDuration(5).play()
      }
    },
    open (step) {
      this.mixer.time = this.step / 10
      this.isPlaying = true
      this.play()
      this.mixer.timeScale = -1
      for (let i = 0; i < this.animations.length; i++) {
        let animation = this.animations[i]
        let action = this.mixer.clipAction(animation)
        action.clampWhenFinished = true
        action.paused = false
        action.loop = THREE.LoopOnce
        action.setDuration(5).play()
      }
    },
    dragClose (step) {
    },
    dragOpen (step) {
    },
    creatCube (scene, renderer, camera) {
      this.controls = new OrbitControls(this.camera, this.$el.childNodes[1])
      // console.log(control)
      const loader = new GLTFLoader()
      loader.load('./static/gltf/27-2.gltf', (gltf) => {
        this.animations = gltf.animations
        if (this.animations && this.animations.length) {
          this.mixer = new THREE.AnimationMixer(gltf.scene)
        }
        scene.add(gltf.scene)
        let finish = 0
        this.mixer.addEventListener('finished', (e) => {
          finish++
          if (finish >= 17) {
            this.isPlaying = false
            finish = 0
            // 广播关闭完成事件
            if (e.direction > 0) this.$emit('CloseFinish')
            else this.$emit('OpenFinish')
            console.log('动画已播放完毕!')
          }
        })
      })
      // 调试转轴
      // this.spiale[0].add(new THREE.AxesHelper(50))
      this.animate()
    }
  }
}
</script>
