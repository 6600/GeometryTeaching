<template lang="pug">
  .origami-box
    .title {{$route.name.split('-')[0]}}
    router-view.origami-show(ref="draw", @stepChange="changeStep", @CloseFinish="origamiStyle = 1", @OpenFinish="origamiStyle = 0")
    .origami-menu
      Button150.button(text="輸出圖形", @onClick="showExport = true")
      Button150.button(text="輸出折紙圖樣", @onClick="showExportOrigami = true")
    .top.flip-button(@click="flipTo(1, 0)")
    .bottom.flip-button(@click="flipTo(3, 0)")
    .left.flip-button(@click="flipTo(4, 0)")
    .right.flip-button(@click="flipTo(2, 0)")
    .control
      template(v-if="stepCount")
        Slider(:value="sliderNum", @input="controlStep", :width="38", :length="776" :rodLength="743" rodColor="white", :segment="stepCount")
        .bottom-button-bar
          .back.button(@click="back" :class="{active: origamiStyle === 3, enable: origamiStyle === 1}")
          .play.button(@click="play", :class="{active: origamiStyle === 2, enable: origamiStyle === 0}")
    //- 拉远视角
    .distance-control
      //- 增加相机距离按钮
      .add-distance.button(@click="addViewing()")
      //- 相机滑块
      Slider(:value="distance", @input="changeViewing", :vertical="true", :width="60", :length="410", rodColor="white", :segment="80")
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
      showExportOrigami: false,
      cameraPosition: [0, 0, 8],
      thetay: 0,
      thetax: 0,
      lestDistance: 40
    }
  },
  mounted () {
    this.stepCount = this.$refs.draw.stepCount
    // 监听图形变化事件，如果图形发生改变则刷新stepCount
    Order.$on(`changeGraph`, () => {
      // 将更新事件放置到队列尾端保证及时更新
      setTimeout(() => {
        // 恢复默认视距
        this.distance = 40
        this.stepCount = this.$refs.draw.stepCount
        // 清除缓存
        this.$refs.draw.step = 1
        this.origamiStyle = 0
        this.sliderNum = 1
        this.thetay = 0
        this.thetax = 0
      }, 0)
    })
    Order.$on(`reduction`, () => {
      // 将更新事件放置到队列尾端保证及时更新
      this.changeViewing(40)
      this.$refs.draw.dragOpen(1)
      this.origamiStyle = 0
      this.sliderNum = 1
      this.thetay = 0
      this.thetax = 0
    })
  },
  beforeDestroy () { // 移除监听
    Order.$off('changeGraph')
    Order.$off('reduction')
  },
  methods: {
    flipAnimate (type, index) {
      switch (type) {
        case 1: this.$refs.draw.controls.rotateUp(-2 * Math.PI / 180); break
        case 2: this.$refs.draw.controls.rotateLeft(2 * Math.PI / 180); break
        case 3: this.$refs.draw.controls.rotateUp(2 * Math.PI / 180); break
        case 4: this.$refs.draw.controls.rotateLeft(-2 * Math.PI / 180); break
      }
      this.$refs.draw.controls.update()
      if (index < 5) {
        setTimeout(() => {
          this.flipAnimate(type, index + 1)
        }, 20)
      }
    },
    // 翻转相机 1-朝上转 2-朝右转 3-朝下转 4-朝左转
    flipTo (type) {
      // 这个系数的含义是物体到相机的距离 8是默认视距 distance是控制的视距
      // 为了方便后面的计算 这里使用了平方
      // console.log(this.$refs.draw.camera.position)
      this.flipAnimate(type, 0)
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
          // console.log(this.sliderNum)
          // this.$refs.draw.step = this.sliderNum
          this.$refs.draw.step = this.sliderNum += 2
          this.$refs.draw.close(this.sliderNum)
          break
        }
        // 判断当前是否为正在打开状态
        case 2: {
          console.log('暂停')
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
          this.$refs.draw.step = this.sliderNum -= 2
          this.$refs.draw.open(this.sliderNum)
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
      if (distance === 0) return
      this.distance = distance
      console.log(distance / this.lestDistance)
      this.$refs.draw.controls.scaling(0.8 + (distance / this.lestDistance) / 5)
      if (distance !== 0) {
        this.lestDistance = distance
      }
    },
    addViewing () {
      // 防止可以无限缩放大
      if (this.distance <= 0) return
      const newDistance = this.distance - 2
      // console.log(newDistance)
      this.changeViewing(newDistance)
    },
    reduceViewing () {
      // 防止可以无限缩小
      if (this.distance >= 80) return
      const newDistance = this.distance + 2
      // console.log(newDistance)
      this.changeViewing(newDistance)
    },
    changeStep (step) {
      this.sliderNum = step
    },
    controlStep (step) {
      // console.log(step, this.lastStep)
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
      position: absolute;
      right: 0;
      bottom: 20px;
      display: flex;
      z-index: 2;
    }
    .button {
      margin: 0 10px;
    }
    .origami-show {
      border-radius: 15px;
      overflow: hidden;
      margin: 10px;
      height: calc(~"100% - 140px");
    }
  }
  .flip-button {
    position: absolute;
    cursor: pointer;
    background-repeat: no-repeat;
  }
  .top {
    top: 30px;
    left: calc(~"50% - 82px");
    width: 68px;
    height: 40px;
    background-image: url('..\..\assets\origami\bofang04@1x.png')
  }
  .bottom {
    bottom: 150px;
    left: calc(~"50% - 82px");
    width: 68px;
    height: 40px;
    background-image: url('..\..\assets\origami\bofang06@1x.png')
  }
  .bottom:hover, .top:hover {
    background-position: 0px -40px;
  }
  .left {
    top: calc(~"50% - 75px");
    left: 30px;
    width: 40px;
    height: 66px;
    background-image: url('..\..\assets\origami\bofang05@1x.png')
  }
  .right {
    top: calc(~"50% - 75px");
    right: 130px;
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
    height: calc(100% - 165px);
    width: 65px;
    background-color: #9dbdff;
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
    width: calc(~"100% - 120px");
    margin: 0 20px;
    position: relative;
    .button {
      width: 50px;
      height: 50px;
      cursor: pointer;
      background-repeat: no-repeat;
      background-position: -11px -128px;
      bottom: 5px;
      background-image: url('..\..\assets\origami\bofang02@1x.png');
    }
    .bottom-button-bar {
      height: 60px;
      width: 140px;
      background-color: #9dbdff;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
    }
    .play {
      transform:rotate(180deg);
    }
    .enable {
      background-position: -11px -4px;
    }
    .active {
      background-position: -10px -5px;
      background-image: url('..\..\assets\origami\bofang03@1x.png');
    }
  }
  .title {
    position: fixed;
    width: 140px;
    text-align: center;
    left: calc(50% - 70px);
    top: 50px;
    font-weight: bold;
    font-size: 21px;
  }
</style>
