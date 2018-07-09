<template lang="pug">
  #app
    .home-title
    .app-box
      .home-left-bar
        .button.zhuti(@click="showColumnPopup = true", title="柱體")
        .button.zhuiti(@click="showCentrumPopup = true", title="椎體")
        Line60
        .button.pintu(@click="playGame", text="", title="活動")
        Line60
        Button60.reduction(@onClick="reduction")
        Button60.explain(@onClick="help")
      router-view(ref="view")
    ColumnPopup(v-if="showColumnPopup", @close="showColumnPopup = false")
    CentrumPopup(v-if="showCentrumPopup", @close="showCentrumPopup = false")
    .logo
    .app-control
      .narrow(v-if="isElectron", title="縮到最小", @click="ipcSend('narrow')").item
      .expand(v-if="isElectron", title="放到最大", @click="ipcSend('expand')").item
      .close(@click="showCloseBox = true", title="關閉").item
    .close-confirm-box(v-if="showCloseBox")
      .close-confirm
        .text
        .button-bar
          Button105.button(text="是", @onClick="close()")
          Button105.button(text="否", @onClick="showCloseBox = false")
</template>

<script>
import { Order } from '@/components/Order.js'
import Button60 from '@/components/button/button_60_60.vue'
import Button70 from '@/components/button/button_70_50.vue'
import Button150 from '@/components/button/button_150_50.vue'
import Button105 from '@/components/button/button_105_55.vue'
import ColumnPopup from '@/components/popup/column.vue'
import CentrumPopup from '@/components/popup/centrum.vue'
import Line60 from '@/components/line/line_60.vue'
export default {
  name: 'App',
  data () {
    return {
      isElectron: Boolean(window.require),
      showColumnPopup: false,
      showCentrumPopup: false,
      showCloseBox: false
    }
  },
  components: {
    Button70,
    Button60,
    Line60,
    Button105,
    Button150,
    ColumnPopup,
    CentrumPopup
  },
  methods: {
    help () {
      window.open('./static/Net_c_Help.pdf')
    },
    playGame () {
      this.$router.push('/activityGame')
      // window.location.href = '/#/activityGame'
    },
    // 还原按钮
    reduction () {
      Order.$emit('reduction')
    },
    close () {
      window.opener = null
      window.open('', '_self')
      window.close()
    },
    ipcSend (message) {
      if (window.require) {
        const ipc = window.require('electron').ipcRenderer
        ipc.send('window', message)
      }
    }
  }
}
</script>

<style lang='less'>
  #app, html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    font-family: 'DFYuan-Md-HK-BF';
  }
  #app {
    min-width: 920px;
    min-height: 576px;
  }
  .home-title {
    height: 70px;
    -webkit-app-region: drag;
    background-color: #e3f1e2;
    background-repeat: no-repeat;
    background-image: url('.\assets\title.png');
  }
  .app-box {
    height: calc(~"100% - 70px");
    min-height: 400px;
    overflow: hidden;
    width: 100%;
    display: flex;
  }
  .app-control {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 9;
    display: flex;
    .item {
      cursor: pointer;
      height: 35px;
      width: 35px;
      background-position: -68px 2px;
      background-repeat: no-repeat;
      background-size: 100px;
      -webkit-app-region: no-drag;
    }
    .narrow {
      background-image: url('.\assets\control\bt001.png');
    }
    .expand {
      background-image: url('.\assets\control\bt002.png');
    }
    .close {
      background-size: 60px;
      background-position: -27px 2px;
      background-image: url('.\assets\control\bt003.png');
    }
  }
  .home-left-bar {
    width: 130px;
    box-shadow: 1px 7px 20px #5A9455;
    z-index: 1;
    .button {
      cursor: pointer;
      margin: 45px 20px;
      height: 69px;
      width: 90px;
      background-repeat: no-repeat;
    }
    .zhuti {
      background-position: -1px 3px;
      background-image: url('.\assets\zcd01@1x.png');
    }
    .zhuiti {
      background-position: -1px 3px;
      background-image: url('.\assets\zcd02@1x.png');
    }
    .pintu {
      background-position: -1px 3px;
      background-image: url('.\assets\zcd03@1x.png');
    }
    .button:hover {
      background-position: -1px -66px;
    }
    .button:active {
      background-position: -1px -134px;
    }
    .reduction {
      margin: 25px;
      bottom: 140px;
      background-position: -4px -2px;
      background-image: url('.\assets\button\zcd04@1x.png');
    }
    .explain {
      margin: 25px;
      bottom: 60px;
      background-position: -4px -2px;
      background-image: url('.\assets\button\zcd05@1x.png');
    }
  }
  .logo {
    position: fixed;
    bottom: 0px;
    left: 0px;
    height: 52px;
    width: 260px;
    z-index: 2;
    background-image: url('./assets/logo.png');
  }
  .clear {
    clear: both;
  }
  @font-face {
    font-family: "DFYuan-Md-HK-BF";
    src: url("./assets/font/DFYuan-Md-HK-BF.eot"); /* IE9 */
    src: url("./assets/font/DFYuan-Md-HK-BF.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    url("./assets/font/DFYuan-Md-HK-BF.woff") format("woff"), /* chrome、firefox */
    url("./assets/font/DFYuan-Md-HK-BF.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
    url("./assets/font/DFYuan-Md-HK-BF.svg#DFYuan-Md-HK-BF") format("svg"); /* iOS 4.1- */
    font-style: normal;
    font-weight: normal;
  }
</style>

<style lang='less' scoped>
  .close-confirm-box {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .close-confirm {
      width: 558px;
      height: 275px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-image: url('.\assets\likai01@1x.png');
    }
    .text {
      width: 310px;
      height: 46px;
      position: absolute;
      left: 120px;
      top: 70px;
      background-image: url('.\assets\likai02@1x.png');
    }
    .button-bar {
      display: flex;
      position: absolute;
      bottom: 40px;
      left: 23px;
      width: 500px;
      justify-content: space-around;
    }
  }
  @media (max-height: 760px) {
    .home-left-bar{
      .button {
        margin: 45px 25px;
      }
    }
  }
  @media (max-height: 710px) {
    .home-left-bar{
      .button {
        margin: 35px 25px;
      }
    }
  }
  @media (max-height: 670px) {
    .home-left-bar{
      .button {
        margin: 25px 25px;
      }
    }
  }
  @media (max-height: 620px) {
    .home-left-bar{
      .button {
        margin: 15px 25px;
      }
    }
  }
  @media (max-height: 560px) {
    .home-left-bar{
      .button {
        margin: 5px 25px;
      }
    }
  }
</style>
