<template lang="pug">
  .export-popup-box
    .popup
      .title 輸出圖形:
      .popup-panel#imgPanel(:class="{gray}")
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
        Button.button(text="确定", @onClick="saveImage()")
        Button.button(text="预览", @onClick="showPreview = true")
        Button.button(text="取消", @onClick="$emit('close')")
      .preview-box(v-if="showPreview")
        .img-box
          img(v-if="imgBase64", :src="imgBase64", :class="{gray}")
          Button.button(text="确定", @onClick="showPreview = false")
</template>

<script>
import { Fun } from '@/components/Order.js'
import html2canvas from 'html2canvas'
import Button from '@/components/button/button_105_55.vue'
export default {
  name: 'Export',
  data () {
    return {
      checkItem: 0,
      imgBase64: null,
      showPreview: false,
      imgBase64Copy: null,
      gray: false
    }
  },
  created () {
    const canvas = document.getElementsByTagName('canvas')[0]
    this.imgBase64 = this.imgBase64Copy = canvas.toDataURL()
  },
  components: {
    Button
  },
  methods: {
    toItem (key) {
      switch (key) {
        case 0: {
          // 取消灰度
          this.gray = false
          this.checkItem = 0
          this.imgBase64 = this.imgBase64Copy
          break
        }
        case 1: {
          this.imgBase64 = this.imgBase64Copy
          this.checkItem = 1
          this.gray = true
          break
        }
        case 2: {
          // 取消灰度
          this.gray = false
          this.checkItem = 2
          // console.log(this.$route.name.split('-')[0])
          this.imgBase64 = `./static/export/line/${this.$route.name.split('-')[0]}.png`
          break
        }
      }
    },
    saveImage () { // 保存为图片
      if (this.checkItem === 0) {
        const canvas = document.getElementsByTagName('canvas')[0]
        let imgData = canvas.toDataURL()
        const type = 'png'
        const _fixType = function (type) {
          type = type.toLowerCase().replace(/jpg/i, 'jpeg')
          const r = type.match(/png|jpeg|bmp|gif/)[0]
          return 'image/' + r
        }
        // 加工image data，替换mime type
        imgData = imgData.replace(_fixType(type), 'image/octet-stream')
        // 下载后的问题名
        const filename = '导出图片' + '.' + type
        // download
        Fun.saveFile(imgData, filename)
      } else {
        html2canvas(document.getElementById('imgPanel'), {
          foreignObjectRendering: true
        }).then(canvas => {
          let imgData = canvas.toDataURL()
          const type = 'png'
          const _fixType = function (type) {
            type = type.toLowerCase().replace(/jpg/i, 'jpeg')
            const r = type.match(/png|jpeg|bmp|gif/)[0]
            return 'image/' + r
          }
          // 加工image data，替换mime type
          imgData = imgData.replace(_fixType(type), 'image/octet-stream')
          // 下载后的问题名
          const filename = '导出图片' + '.' + type
          // download
          Fun.saveFile(imgData, filename)
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .export-popup-box {
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
    .gray {
      filter: gray;
      filter: grayscale(100%);
    }
    .preview-box {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.40);
    }
    .img-box {
      width: 752px;
      height: 628px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-repeat: no-repeat;
      background-image: url('..\..\assets\export\yulan@1x.png');
      img {
        height: 420px;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        margin-top: 70px;
      }
      .button {
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
    }
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
