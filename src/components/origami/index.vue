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
      Slider(v-model="sliderNum", :width="38", :length="776" :rodLength="743" rodColor="white")
      .back.button(@click="back" :class="{active: origamiStyle === 3, enable: origamiStyle === 1}")
      .play.button(@click="play", :class="{active: origamiStyle === 2, enable: origamiStyle === 0}")
    //- 拉远视角
    .distance-control
      //- 增加相机距离按钮
      .add-distance.button(@click="changeViewing(distance++)")
      //- 相机滑块
      Slider(v-model="distance", :vertical="true", :width="60", :length="410", :segment="8", @onClick="changeViewing")
      //- 减少相机距离按钮
      .reduce-distance.button(@click="changeViewing(distance--)")
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
      origamiStyle: 0,
      // 视角距离
      distance: 4
    }
  },
  methods: {
    // 翻转相机 1-朝上转 2-朝右转 3-朝下转 4-朝左转
    flipTo (type) {
      // 这个系数的含义是物体到相机的距离 8是默认视距 distance是控制的视距
      // 为了方便后面的计算 这里使用了平方
      const ratio = Math.pow(8 + this.distance - 4, 2)
      // console.log(this.$refs.draw.camera)
      let i = 0
      const flip = (type) => {
        setTimeout(() => {
          if (Math.abs(this.$refs.draw.camera.position.y) < 8) {
            switch (type) {
              case 1:
                this.$refs.draw.camera.position.y = this.$refs.draw.camera.position.y - 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(ratio - Math.pow(Math.abs(this.$refs.draw.camera.position.y), 2))
                break
              case 2:
                this.$refs.draw.camera.position.x = this.$refs.draw.camera.position.x + 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(ratio - Math.pow(Math.abs(this.$refs.draw.camera.position.x), 2))
                break
              case 3:
                this.$refs.draw.camera.position.y = this.$refs.draw.camera.position.y + 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(ratio - Math.pow(Math.abs(this.$refs.draw.camera.position.y), 2))
                break
              case 4:
                this.$refs.draw.camera.position.x = this.$refs.draw.camera.position.x - 0.2
                this.$refs.draw.camera.position.z = Math.sqrt(ratio - Math.pow(Math.abs(this.$refs.draw.camera.position.x), 2))
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
    },
    changeViewing () {
      this.$refs.draw.camera.position.z = this.distance + 4
      this.$refs.draw.renderScene()
      console.log(this.distance)
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
