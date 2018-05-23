<template>
  <div class="slider" :style="getSliderStyle()">
    <div class="rod" :style="getRodStyle()">
      <div class="spot" @mousedown.stop.self.left="click" :style="getSpotStyle()">{{value}}</div>
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
        styleList.height = this.length + 'px'
        styleList.width = this.width + 'px'
      } else {
        styleList.height = this.width + 'px'
        styleList.width = this.length + 'px'
      }
      return styleList
    },
    getRodStyle () {
      let styleList = {}
      styleList.backgroundColor = this.rodColor
      // 判断滑块长度是否存在 如果不存在则使用总元素宽度
      const rodLength = this.rodLength ? this.rodLength : this.length
      // 判断滑块是否是竖直的
      if (this.vertical) {
        styleList.height = rodLength + 'px'
        styleList.width = this.rodWidth + 'px'
        styleList.top = (this.length - rodLength) / 2 + 'px'
        styleList.left = (this.width - this.rodWidth) / 2 + 'px'
      } else {
        styleList.height = this.rodWidth + 'px'
        styleList.width = rodLength + 'px'
        styleList.left = (this.length - rodLength) / 2 + 'px'
        styleList.top = (this.width - this.rodWidth) / 2 + 'px'
      }
      return styleList
    },
    getSpotStyle () {
      const rodLength = this.rodLength ? this.rodLength : this.length
      const scale = rodLength / this.segment
      // console.log(scale)
      let styleList = {}
      // 判断滑块是否是竖直的
      if (this.vertical) {
        styleList.top = this.value * scale - 10 + 'px'
        styleList.left = (this.rodWidth - 20) / 2 + 'px'
      } else {
        // console.log(this.value, scale)
        styleList.left = this.value * scale - 10 + 'px'
        styleList.top = (this.rodWidth - 20) / 2 + 'px'
      }
      return styleList
    },
    handleMove (e) {
      const rodLength = this.rodLength ? this.rodLength : this.length
      // 将点击位置转换成滑竿数值
      let num = this.vertical ? (e.pageY - this.positionY) / rodLength : (e.pageX - this.positionX) / rodLength
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
  }
  .rod {
    height: 6px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .spot {
    // 鼠标穿透点击
    // pointer-events: none;
    border: 2px solid white;
    background-color: #E19F14;
    width: 15px;
    height: 15px;
    position: absolute;
    margin: auto;
    border-radius: 50%;
    // line-height: 20px;
    // text-align: center;
    // color: white;
    font-size:0rem;
  }
  .vertical .rod {
    width: 6px;
    height: 100%;
  }
</style>
