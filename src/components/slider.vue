<template>
  <div class="slider" @mousedown.stop.left="click">
    <div class="rod"></div>
    <div class="spot" :style="{left: value * 10 - 10 + 'px'}">{{value}}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      spotStyle: this.value
    }
  },
  methods: {
    click (e) {
      // 将点击位置转换成滑竿数值
      const num = e.offsetX / 10
      console.log(num)
      this.spotStyle = Math.ceil(num)
      this.$emit('input', this.spotStyle)
      this.$emit('onClick')
    }
  }
}
</script>

<style lang='less' scoped>
  .slider {
    position: relative;
    width: 100px;
    cursor: pointer;
  }
  .rod {
    height: 6px;
    border-radius: 5px;
    background-color: cadetblue;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
  }
  .spot {
    // 鼠标穿透点击
    pointer-events: none;
    background-color: blueviolet;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    color: white;
    font-size: 0.8rem;
    transition: left 0.5s;
  }
</style>
