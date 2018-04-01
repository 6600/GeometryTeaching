<template lang="pug">
  .export-origami-popup-box
    .popup
      .title 輸出折紙圖樣:
      .popup-panel
        img(v-if="imgBase64", :src="imgBase64")
      .check-box
        .input-check(:class="{active: checkItem === 0}")
          .check(@click="toItem(0)")
          .text 彩色圖
        .input-check(:class="{active: checkItem === 1}")
          .check(@click="toItem(1)")
          .text 灰階圖
        .input-check(:class="{active: checkItem === 2}")
          .check(@click="toItem(2)")
          .text 單線圖
      .tool-box
        Button.button(text="确定")
        Button.button(text="预览")
        Button.button(text="取消", @onClick="$emit('close')")
</template>

<script>
import Button from '@/components/button/button_105_55.vue'
export default {
  name: 'Export',
  data () {
    return {
      checkItem: 0,
      imgBase64: null
    }
  },
  created () {
    const routeName = this.$route.name
    // console.log(routeName)
    this.imgBase64 = `./static/export/color/${routeName}.png`
  },
  components: {
    Button
  },
  methods: {
    toItem (key) {
      switch (key) {
        case 0: {
          this.checkItem = 0
          break
        }
        case 1: {
          this.checkItem = 1
          break
        }
        case 2: {
          this.checkItem = 2
          // console.log(this.$route.name.split('-')[0])
          this.imgBase64 = `./static/export/origami-line/${this.$route.name}.png`
          break
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .export-origami-popup-box {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.40);
  }
  .popup {
    position: absolute;
    width: 600px;
    height: 610px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: white;
    border-radius: 15px;
  }
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 1.6rem;
    margin: 0 10px;
  }
  .popup-panel {
    width: 100%;
    height: 312px;
    position: relative;
    box-shadow: 0px -2px 13px #8ba3b2 inset;
    img {
      height: 300px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .check-box {
    height: 120px;
    display: flex;
    margin: 0 100px;
    line-height: 120px;
    .input-check {
      display: flex;
      width: 140px;
      font-weight: bold;
      align-items: center;
    }
    .check {
      height: 20px;
      width: 20px;
      cursor: pointer;
      margin: 0 10px;
      border: 2px solid #666;
      border-radius: 50%;
    }
    .active .check{
      background-color: gold;
    }
  }
  .tool-box {
    display: flex;
    margin: 25px;
    .button {
      margin: 0 30px;
    }
  }
</style>
