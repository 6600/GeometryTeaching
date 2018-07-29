<template lang="pug">
  .cylinder-one
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
import * as THREE from 'three/build/three.js'
import GLTFLoader from 'three-gltf-loader'
const OrbitControls = require('three-orbit-controls')(THREE)
const stepSave = require('@/assets/step/cylinder.json')
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
      controls: null,
      mixer: null,
      clock: null,
      finish: 0,
      animations: null,
      stepCount: 50,
      playing: 0,
      isPaused: false
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
      this.playing = 0
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
      // console.log(this.clock.getDelta())
      requestAnimationFrame(this.animate)
      if (this.mixer !== null) this.mixer.update(this.clock.getDelta())
      this.renderScene()
    },
    play () {
      setTimeout(() => {
        if (this.playing === 0) return
        console.log(this.mixer.time * 10)
        this.step = this.mixer.time * 10
        this.$emit('stepChange', this.step)
        this.play()
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
      spiale[0].rotation.x = stepSave[step].spiale0rotationx
      spiale[2].rotation.x = stepSave[step].spiale2rotationx
      const vLength = 41 // this.meshs[1].geometry.vertices.length / 2
      // -----------------------------
      for (let i = 0; i <= vLength; i++) {
        // console.log(step, stepSave[step].meshs1geometryvertices[i])
        this.meshs[1].geometry.vertices[i].z = stepSave[step].meshs1geometryvertices[i].z
        this.meshs[1].geometry.vertices[i + 40].z = stepSave[step].meshs1geometryvertices[i + 40].z
        this.meshs[1].geometry.vertices[i].x = stepSave[step].meshs1geometryvertices[i].x
        this.meshs[1].geometry.vertices[i + 40].x = stepSave[step].meshs1geometryvertices[i + 40].x
      }
      this.meshs[1].geometry.verticesNeedUpdate = true
      return true
    },
    close (step) {
      this.mixer.time = 0
      this.playing = 1
      this.play()
      console.log(this.mixer)
      this.mixer.timeScale = 1
      for (let i = 0; i < this.animations.length; i++) {
        let animation = this.animations[i]
        // console.log(animation)
        let action = this.mixer.clipAction(animation)
        // console.log(action)
        action.clampWhenFinished = true
        action.paused = false
        action.loop = THREE.LoopOnce
        action.setDuration(5).play()
      }
    },
    open (step) {
      this.mixer.time = 5
      this.playing = -1
      this.play()
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
      loader.load('./static/gltf/17-1.gltf', function (gltf) {
        let object = gltf.scene
        _this.animations = gltf.animations
        if (_this.animations && _this.animations.length) {
          _this.mixer = new THREE.AnimationMixer(object)
        }
        scene.add(gltf.scene)
        _this.mixer.addEventListener('finished', (e) => {
          _this.finish++
          if (_this.finish >= 18) {
            console.log(_this.mixer)
            _this.playing = 0
            _this.finish = 0
            // 广播关闭完成事件
            if (e.direction > 0) _this.$emit('CloseFinish')
            else _this.$emit('OpenFinish')
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
