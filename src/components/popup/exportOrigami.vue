<template lang="pug">
  .export-origami-popup-box
    .popup
      .title 輸出折紙圖樣:
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
      .nianhe
        .yes.nianhe-check(:class="{active: isnianhe}", @click="chengenianhe(true)")
        .no.nianhe-check(:class="{active: !isnianhe}", @click="chengenianhe(false)")
        img(:src=`'./static/export/sctx@2x000' + checkItem + '.png'`)
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
import html2canvas from 'html2canvas'
import { Fun } from '@/components/Order.js'
import Button from '@/components/button/button_105_55.vue'
export default {
  name: 'Export',
  data () {
    return {
      gray: false,
      checkItem: 0,
      showPreview: false,
      imgBase64: null,
      isnianhe: true
    }
  },
  created () {
    const routeName = this.$route.name
    // console.log(routeName)
    if (this.isnianhe) this.imgBase64 = `./static/export/color/${routeName}-nianhe.png`
    else this.imgBase64 = `./static/export/color/${routeName}.png`
  },
  components: {
    Button
  },
  methods: {
    toItem (key) {
      switch (key) {
        case 0: {
          const routeName = this.$route.name
          // 取消灰度
          this.gray = false
          this.checkItem = 0
          if (this.isnianhe) this.imgBase64 = `./static/export/color/${routeName}-nianhe.png`
          else this.imgBase64 = `./static/export/color/${routeName}.png`
          break
        }
        case 1: {
          this.gray = true
          this.checkItem = 1
          break
        }
        case 2: {
          // 取消灰度
          this.gray = false
          this.checkItem = 2
          const routeName = this.$route.name
          // console.log(this.$route.name.split('-')[0])
          if (this.isnianhe) this.imgBase64 = `./static/export/color/${routeName}-nianhe.png`
          else this.imgBase64 = `./static/export/color/${routeName}.png`
          break
        }
      }
    },
    saveImage () { // 保存为图片
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
    },
    chengenianhe (bool) {
      this.isnianhe = bool
      const routeName = this.$route.name
      if (this.isnianhe) this.imgBase64 = `./static/export/color/${routeName}-nianhe.png`
      else this.imgBase64 = `./static/export/color/${routeName}.png`
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
    font-weight: bold;
    color: #595757;
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
    margin: 0 60px;
    line-height: 120px;
    .input-check {
      display: flex;
      width: 33%;
      font-weight: bold;
      align-items: center;
      .text {
        font-size: 1.4rem;
        color: #595757;
      }
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
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    width: 520px;
    margin: auto;
    .button {
      margin: 0 20px;
    }
  }
  .nianhe {
    position: absolute;
    bottom: 92px;
    img {
      width: 90%;
      margin: 0 5%;
    }
    .nianhe-check {
      height: 29px;
      width: 30px;
      cursor: pointer;
      background-size: 30px;
      background-repeat: no-repeat;
      position: absolute;
      background-image: url('../../../static/export/bt013@2x.png')
    }
    .yes {
      left: 138px;
      top: 26px;
    }
    .no {
      right: 233px;
      top: 26px;
    }
    .active {
      background-position: 0px -28px;
    }
  }
</style>
