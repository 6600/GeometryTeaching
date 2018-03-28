<template>
  <div class="slider" :style="getSliderStyle()" @mouseup="clear">
    <div class="rod" @mousedown.stop.left="click" @mouseup="clear" :style="getRodStyle()">
      <div class="spot" :style="getSpotStyle()" @mouseup="clear">{{value}}</div>
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
  methods: {
    click (e) {
      const DOM = this.$el.children[0]
      DOM.addEventListener('mousemove', this.handleMove, true)
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
        styleList.left = this.value * scale - 10 + 'px'
        styleList.top = (this.rodWidth - 20) / 2 + 'px'
      }
      return styleList
    },
    handleMove (e) {
      const rodLength = this.rodLength ? this.rodLength : this.length
      // 将点击位置转换成滑竿数值
      const num = this.vertical ? e.offsetY / rodLength : e.offsetX / rodLength
      // let returnNum = Math.round(num * this.segment)
      // console.log(returnNum)
      const spotStyle = Math.ceil(num * this.segment)
      this.$emit('input', spotStyle)
    },
    clear () {
      // 清除监听
      this.$el.children[0].removeEventListener('mousemove', this.handleMove, true)
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
    pointer-events: none;
    border: 2px solid white;
    background-color: blueviolet;
    width: 20px;
    height: 20px;
    position: absolute;
    margin: auto;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    color: white;
    font-size: 0.8rem;
  }
  .vertical .rod {
    width: 6px;
    height: 100%;
  }
</style>
