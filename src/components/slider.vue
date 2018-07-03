<template>
  <div class="slider" :style="getSliderStyle()">
    <div class="rod" :style="getRodStyle()">
      <div class="spot-box" :style="getSpotStyle()">
        <div class="bar" :style="getBarStyle()"></div>
        <div class="spot" @mousedown.stop.self.left="click"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    },
    // 是否是一个竖直的滚动条
    vertical: {
      type: Boolean,
      default: false
    },
    // 滑块条长度
    length: {
      type: Number,
      default: 100
    },
    // 滑动条宽度
    rodWidth: {
      type: Number,
      default: 10
    },
    // 滑动条长度
    rodLength: Number,
    rodColor: {
      type: String,
      default: 'cadetblue'
    },
    width: {
      type: Number,
      default: 20
    },
    padding: {
      type: Number,
      default: 0
    },
    // 片数
    segment: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      positionX: 0,
      positionY: 0
    }
  },
  mounted () {
    const position = this.findPosition(this.$el.childNodes[0])
    this.positionX = position[0]
    this.positionY = position[1]
  },
  methods: {
    click (e) {
      document.addEventListener('mousemove', this.handleMove, true)
      document.addEventListener('mouseup', this.clear, true)
    },
    getSliderStyle () {
      let styleList = {}
      // 判断滑块是否是竖直的
      if (this.vertical) {
        styleList.background = '#ffbfdf'
        styleList.height = 'calc(100% - 135px)'
        styleList.width = this.width + 'px'
      } else {
        styleList.height = this.width + 'px'
        styleList.width = '100%'
      }
      return styleList
    },
    getRodStyle () {
      let styleList = {}
      styleList.backgroundColor = this.rodColor
      // console.log(this.$el)
      // 判断滑块是否是竖直的
      if (this.vertical) {
        styleList.height = '96%'
        styleList.width = this.rodWidth + 'px'
        styleList.top = '2%'
        styleList.left = (this.width - this.rodWidth) / 2 + 'px'
      } else {
        styleList.height = this.rodWidth + 'px'
        styleList.width = '96%'
        styleList.left = '2%'
        styleList.top = (this.width - this.rodWidth) / 2 + 'px'
      }
      if (styleList.top < 0) styleList.top = 0
      if (styleList.left < 0) styleList.left = 0
      return styleList
    },
    getSpotStyle () {
      // console.log(scale)
      let styleList = {}
      let value = this.value / this.segment * 100 - 1
      if (value < 0) value = 0
      // 判断滑块是否是竖直的
      if (this.vertical) {
        styleList.top = value + '%'
      } else {
        // console.log(this.value, scale)
        styleList.left = value + '%'
      }
      return styleList
    },
    getBarStyle () {
      // console.log(scale)
      let styleList = {}
      let value = this.value / this.segment * 100 - 2
      if (value < 0) value = 0
      // 判断滑块是否是竖直的
      if (this.vertical) {
        styleList.height = (100 - value) + 1 + '%'
        styleList.background = `linear-gradient(to right, #67c0eb , #c6defd)`
      } else {
        if (value !== 0) {
          styleList.width = value + 1 + '%'
        } else {
          styleList.width = 0
        }
        // console.log(this.value, scale)
        styleList.left = -value - 1 + '%'
        styleList.background = `linear-gradient(#67c0eb, #c6defd)`
      }
      return styleList
    },
    handleMove (e) {
      // 将点击位置转换成滑竿数值
      let num = this.vertical ? (e.pageY - this.positionY) / this.$el.childNodes[0].clientHeight : (e.pageX - this.positionX) / this.$el.childNodes[0].clientWidth
      // 判断是否超过允许的值
      if (num < 0) num = 0
      if (num > 1) num = 1
      // console.log(num)
      const spotStyle = Math.ceil(num * this.segment)
      this.$emit('input', spotStyle)
    },
    clear () {
      // 清除监听
      document.removeEventListener('mousemove', this.handleMove, true)
    },
    findPosition (oElement) {
      let x2 = 0
      let y2 = 0
      let width = oElement.offsetWidth
      let height = oElement.offsetHeight
      if (typeof (oElement.offsetParent) !== 'undefined') {
        let posX = 0
        let posY = 0
        while (oElement) {
          posX += oElement.offsetLeft
          posY += oElement.offsetTop
          oElement = oElement.offsetParent
        }
        x2 = posX + width
        y2 = posY + height
        return [posX, posY, x2, y2]
      } else {
        x2 = oElement.x + width
        y2 = oElement.y + height
        return [oElement.x, oElement.y, x2, y2]
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .slider {
    position: relative;
    cursor: pointer;
    background-color: #9dbdff;
    border-radius: 18px;
  }
  .rod {
    height: 6px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .spot-box {
    // 鼠标穿透点击
    // pointer-events: none;
    position: absolute;
    margin: auto;
    width: 100%;
    height: 100%;
    // line-height: 20px;
    // text-align: center;
    // color: white;
    font-size: 0rem;
    .spot {
      width: 23px;
      height: 23px;
      border-radius: 50%;
      position: absolute;
      top: -5px;
      left: -6px;
      background-image: url('..\assets\fangda05@1x.png');
    }
    .spot:hover {
      background-position: 0px;
    }
    .bar {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .vertical .rod {
    width: 6px;
    height: 100%;
  }
</style>
