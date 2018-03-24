<template lang="pug">
  .origami-box
    router-view.origami-show(ref="draw", @onStyleChange="")
    .origami-menu
      Button150.button(text="輸出圖形")
      Button150.button(text="輸出折紙圖樣")
    .top.flip-button(@click="flipTo(1)")
    .bottom.flip-button(@click="flipTo(3)")
    .left.flip-button(@click="flipTo(2)")
    .right.flip-button(@click="flipTo(4)")
    .control
      Slider(v-model="sliderNum")
      .play.button(@click="play", :class="{active: origamiStyle === 2, enable: origamiStyle === 0}")
      .back.button(@click="back" :class="{active: origamiStyle === 3, enable: origamiStyle === 1}")
</template>

<script>
import Button150 from '@/components/button/button_150_50.vue'
import Slider from '@/components/slider.vue'
export default {
  components: {
    Slider,
    Button150
  },
  data () {
    return {
      sliderNum: 1,
      // 0为盒子已经打开 1为盒子已经合上 2为盒子正在合上 3为盒子正在打开
      origamiStyle: 0
    }
  },
  methods: {
    // 翻转相机 1-朝上转 2-朝右转 3-朝下转 4-朝左转
    flipTo (type) {
      // console.log(this.$refs.draw.camera)
      let i = 0
      const flip = (type) => {
        setTimeout(() => {
          if (Math.abs(this.$refs.draw.camera.position.y) < 8) {
            switch (type) {
              case 1:
                this.$refs.draw.camera.position.y = this.$refs.draw.camera.position.y - 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(64 - Math.pow(Math.abs(this.$refs.draw.camera.position.y), 2))
                break
              case 2:
                this.$refs.draw.camera.position.x = this.$refs.draw.camera.position.x + 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(64 - Math.pow(Math.abs(this.$refs.draw.camera.position.x), 2))
                break
              case 3:
                this.$refs.draw.camera.position.y = this.$refs.draw.camera.position.y + 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(64 - Math.pow(Math.abs(this.$refs.draw.camera.position.y), 2))
                break
              case 4:
                this.$refs.draw.camera.position.x = this.$refs.draw.camera.position.x - 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(64 - Math.pow(Math.abs(this.$refs.draw.camera.position.x), 2))
                break
            }
            this.$refs.draw.camera.lookAt(this.$refs.draw.scene.position)
            this.$refs.draw.renderScene()
            if (i < 10) {
              i++
              flip(type)
            }
          }
        }, 20)
      }
      flip(type)
    },
    styleChange (Num) {
      this.origamiStyle = Num
    },
    // 播放拆盒子效果
    play () {
      // 如果盒子不处于拆开状态那么直接返回
      if (this.origamiStyle !== 0) return
      this.origamiStyle = 2
      this.$refs.draw.closeBox()
    },
    back () {
      // 如果盒子不处于闭合状态那么直接返回
      if (this.origamiStyle !== 1) return
      this.origamiStyle = 4
      this.$refs.draw.openBox()
    }
  }
}
</script>

<style lang='less' scoped>
  .origami-box {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #e3f1e2;
    .origami-menu {
      position: fixed;
      right: 0;
      bottom: 20px;
      display: flex;
    }
    .button {
      margin: 0 10px;
    }
    .origami-show {
      height: 550px;
      width: 780px;
      border-radius: 15px;
      overflow: hidden;
      margin: 20px;
    }
  }
  .flip-button {
    position: absolute;
    cursor: pointer;
  }
  .top {
    top: 30px;
    left: 360px;
    width: 68px;
    height: 40px;
    background-image: url('..\..\assets\origami\bofang04@1x.png')
  }
  .bottom {
    top: 520px;
    left: 360px;
    width: 68px;
    height: 40px;
    background-image: url('..\..\assets\origami\bofang06@1x.png')
  }
  .left {
    top: 280px;
    left: 30px;
    width: 40px;
    height: 60px;
    background-image: url('..\..\assets\origami\bofang05@1x.png')
  }
  .right {
    top: 280px;
    left: 730px;
    width: 40px;
    height: 60px;
    background-image: url('..\..\assets\origami\bofang07@1x.png')
  }
</style>

<style lang='less'>
  .origami-box {
    .control {
      height: 92px;
      width: 776px;
      margin: 0 20px;
      position: relative;
      background-image: url('..\..\assets\origami\bofang00@1x.png');
      .slider {
        height: 35px;
        width: 776px;
        margin: 0 18px;
      }
      .rod {
        opacity: 0;
        width: calc(100% - 36px);
      }
      .spot {
        border: 2px solid white;
      }
      .button {
        width: 50px;
        height: 50px;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: -11px -128px;
        bottom: 5px;
        position: absolute;
        background-image: url('..\..\assets\origami\bofang02@1x.png');
      }
      .play {
        left: 325px;
      }
      .back {
        transform:rotate(180deg);
        right: 325px;
      }
      .enable {
        background-position: -11px -4px;
      }
      .active {
        background-position: -10px -5px;
        background-image: url('..\..\assets\origami\bofang03@1x.png');
      }
    }
  }
</style>
