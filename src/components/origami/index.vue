<template lang="pug">
  .origami-box
    router-view.origami-show(ref="draw", @stepChange="changeStep", @CloseFinish="origamiStyle = 1", @OpenFinish="origamiStyle = 0")
    .origami-menu
      Button150.button(text="輸出圖形", @onClick="showExport = true")
      Button150.button(text="輸出折紙圖樣", @onClick="showExportOrigami = true")
    .top.flip-button(@click="flipTo(1)")
    .bottom.flip-button(@click="flipTo(3)")
    .left.flip-button(@click="flipTo(4)")
    .right.flip-button(@click="flipTo(2)")
    .control
      template(v-if="stepCount")
        Slider(:value="sliderNum", @input="controlStep", :width="38", :length="776" :rodLength="743" rodColor="white", :segment="stepCount")
      .back.button(@click="back" :class="{active: origamiStyle === 3, enable: origamiStyle === 1}")
      .play.button(@click="play", :class="{active: origamiStyle === 2, enable: origamiStyle === 0}")
    //- 拉远视角
    .distance-control
      //- 增加相机距离按钮
      .add-distance.button(@click="addViewing()")
      //- 相机滑块
      Slider(:value="distance", @input="changeViewing", :vertical="true", :width="60", :length="410", :segment="80")
      //- 减少相机距离按钮
      .reduce-distance.button(@click="reduceViewing()")
    ExportImg(v-if="showExport", @close="showExport = false")
    Origami(v-if="showExportOrigami", @close="showExportOrigami = false")
</template>

<script>
import { Order } from '@/components/Order.js'
import Button150 from '@/components/button/button_150_50.vue'
import Slider from '@/components/slider.vue'
import ExportImg from '@/components/popup/export.vue'
import Origami from '@/components/popup/exportOrigami.vue'
export default {
  components: {
    Slider,
    Origami,
    ExportImg,
    Button150
  },
  data () {
    return {
      sliderNum: 1,
      // 0为盒子已经打开 1为盒子已经合上 2为盒子正在合上 3为盒子正在打开
      origamiStyle: 0,
      // 视角距离
      distance: 40,
      // step存储
      lastStep: 0,
      stepCount: null,
      showExport: false,
      showExportOrigami: false
    }
  },
  mounted () {
    this.stepCount = this.$refs.draw.stepCount
  },
  methods: {
    // 翻转相机 1-朝上转 2-朝右转 3-朝下转 4-朝左转
    flipTo (type) {
      // 这个系数的含义是物体到相机的距离 8是默认视距 distance是控制的视距
      // 为了方便后面的计算 这里使用了平方
      const ratio = Math.pow(8 + this.distance / 10 - 4, 2)
      // console.log(this.$refs.draw.camera.position)
      let i = 0
      const flip = (type) => {
        // console.log(type)
        setTimeout(() => {
          // console.log(this.$refs.draw.camera.position)
          const positionY = this.$refs.draw.camera.position.y
          const positionX = this.$refs.draw.camera.position.x
          const calculateY = ratio - Math.pow(positionY, 2)
          const calculateX = ratio - Math.pow(positionX, 2)
          // console.log(calculateY, calculateX)
          // console.log(positionY, positionX)
          // 待优化
          switch (type) {
            case 1:
              if (calculateY > 0 || positionY > 0) {
                this.$refs.draw.camera.position.y = positionY - 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(calculateY)
              }
              break
            case 2:
              if (calculateX > 0 || positionX > 0) {
                this.$refs.draw.camera.position.x = positionX - 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(calculateX)
              }
              break
            case 3:
              if (calculateY > 0 || positionY < 0) {
                this.$refs.draw.camera.position.y = positionY + 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(calculateY)
              }
              break
            case 4:
              if (calculateX > 0 || positionX < 0) {
                this.$refs.draw.camera.position.x = positionX + 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(calculateX)
              }
              break
          }
          this.$refs.draw.camera.lookAt(this.$refs.draw.scene.position)
          this.$refs.draw.renderScene()
          if (i < 10) {
            i++
            flip(type)
          }
        }, 20)
      }
      flip(type)
    },
    styleChange (Num) {
      this.origamiStyle = Num
    },
    // 播放合上盒子效果
    play () {
      const origamiStyle = this.origamiStyle
      switch (origamiStyle) {
        // 判断当前是否为打开状态
        case 0: {
          this.origamiStyle = 2
          this.$refs.draw.closeBox(true)
          break
        }
        // 判断当前是否为正在打开状态
        case 2: {
          this.origamiStyle = 0
          Order.$emit('pause')
          break
        }
      }
    },
    back () {
      const origamiStyle = this.origamiStyle
      switch (origamiStyle) {
        // 判断当前是否为打开状态
        case 1: {
          this.origamiStyle = 3
          this.$refs.draw.openBox(true)
          break
        }
        // 判断当前是否为正在打开状态
        case 3: {
          this.origamiStyle = 1
          Order.$emit('pause')
          break
        }
      }
    },
    changeViewing (distance) {
      this.distance = distance
      this.$refs.draw.camera.position.z = distance / 10 + 4
      // 使物体在相机中央
      this.$refs.draw.camera.lookAt(this.$refs.draw.scene.position)
      this.$refs.draw.renderScene()
      // console.log(this.distance)
    },
    addViewing () {
      // 防止可以无限缩放大
      if (this.distance >= 80) return
      const newDistance = this.distance + 2
      this.changeViewing(newDistance)
    },
    reduceViewing () {
      // 防止可以无限缩小
      if (this.distance <= 0) return
      const newDistance = this.distance - 2
      this.changeViewing(newDistance)
    },
    changeStep (step) {
      this.sliderNum = step
    },
    controlStep (step) {
      this.sliderNum = step
      // 判断是不是组装盒子 正为组装盒子，负为拆开盒子
      if (step > this.lastStep) {
        this.$refs.draw.dragClose(step)
      } else {
        this.$refs.draw.dragOpen(step)
      }
      this.lastStep = step
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
      z-index: 2;
    }
    .button {
      margin: 0 10px;
    }
    .origami-show {
      height: 550px;
      width: 780px;
      border-radius: 15px;
      overflow: hidden;
      margin: 10px;
    }
  }
  .flip-button {
    position: absolute;
    cursor: pointer;
    background-repeat: no-repeat;
  }
  .top {
    top: 30px;
    left: 360px;
    width: 68px;
    height: 40px;
    background-image: url('..\..\assets\origami\bofang04@1x.png')
  }
  .bottom {
    top: 510px;
    left: 360px;
    width: 68px;
    height: 40px;
    background-image: url('..\..\assets\origami\bofang06@1x.png')
  }
  .bottom:hover, .top:hover {
    background-position: 0px -40px;
  }
  .left {
    top: 280px;
    left: 30px;
    width: 40px;
    height: 66px;
    background-image: url('..\..\assets\origami\bofang05@1x.png')
  }
  .right {
    top: 280px;
    left: 730px;
    width: 40px;
    height: 66px;
    background-image: url('..\..\assets\origami\bofang07@1x.png')
  }
  .left:hover, .right:hover {
    background-position: 0px -66px;
  }
  .distance-control {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 545px;
    width: 65px;
    background-color: #ffbfdf;
    border-radius: 15px;
    .button {
      width: 62px;
      height: 54px;
      margin: 5px 0;
      cursor: pointer;
      margin-left: auto;
      margin-right: auto;
    }
    .button:hover {
      height: 64px;
      background-position: 0px -172px;
      margin: 0;
    }
    .add-distance {
      background-image: url('..\..\assets\origami\fangda03@1x.png');
    }
    .reduce-distance {
      background-image: url('..\..\assets\origami\fangda04@1x.png');
    }
  }
  .control {
    height: 92px;
    width: 776px;
    margin: 0 20px;
    position: relative;
    background-image: url('..\..\assets\origami\bofang00@1x.png');
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
    .back {
      left: 325px;
    }
    .play {
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
</style>
