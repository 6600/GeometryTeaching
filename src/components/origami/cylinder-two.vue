<template lang="pug">
  .cylinder-one
</template>

<script>
import { Fun, Order } from '@/components/Order.js'
import * as THREE from 'three'
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
      stepCount: 225
    }
  },
  mounted () {
    Fun.init3D(this.$el, (Object3D) => {
      this.camera = Object3D.camera
      this.renderer = Object3D.renderer
      this.scene = Object3D.scene
      this.creatCube(Object3D.scene, Object3D.renderer, Object3D.camera)
    })
    // 监听暂停事件
    Order.$on(`pause`, () => {
      this.pause = true
    })
  },
  beforeDestroy () { // 移除监听
    Order.$off('pause')
  },
  methods: {
    animate () {
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
      spiale[0].rotation.x = stepSave[step].spiale0rotationx
      spiale[2].rotation.x = stepSave[step].spiale2rotationx
      spiale[2].position.x = stepSave[step].meshs1geometryvertices[81].x - 1.57
      spiale[2].position.z = stepSave[step].meshs1geometryvertices[81].z
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
      if (this.getStep(step)) this.nextStep(1, this.close)
    },
    open (step) {
      if (this.getStep(step)) this.nextStep(-1, this.open)
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
      this.controls = new OrbitControls(this.camera, this.$el.childNodes[0])
      const loader = new GLTFLoader()
      loader.load('./static/gltf/17-2.gltf', function (gltf) {
        let object = gltf.scene
        let animations = gltf.animations
        if (animations && animations.length) {
          let mixer = new THREE.AnimationMixer(object)
          for (let i = 0; i < animations.length; i++) {
            let animation = animations[i]
            let action = mixer.clipAction(animation)
            console.log(action)
            action.play()
          }
        }
        scene.add(gltf.scene)
      })
      // 调试转轴
      // this.spiale[0].add(new THREE.AxesHelper(50))
      this.animate()
    }
  }
}
</script>
