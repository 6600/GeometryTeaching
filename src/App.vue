<template lang="pug">
  #app
    .home-title
    .app-box
      .home-left-bar
        Button70.button(@onClick="showColumnPopup = true", text="柱體")
        Button70.button(@onClick="showCentrumPopup = true", text="椎體")
        Line60
        Button70.button.pintu(@onClick="playGame", text="")
        Line60
        Button60.reduction(@onClick="reduction")
        Button60.explain(@onClick="help")
      router-view(ref="view")
    ColumnPopup(v-if="showColumnPopup", @close="showColumnPopup = false")
    CentrumPopup(v-if="showCentrumPopup", @close="showCentrumPopup = false")
    .logo
</template>

<script>
import Button60 from '@/components/button/button_60_60.vue'
import Button70 from '@/components/button/button_70_50.vue'
import ColumnPopup from '@/components/popup/column.vue'
import CentrumPopup from '@/components/popup/centrum.vue'
import Line60 from '@/components/line/line_60.vue'
export default {
  name: 'App',
  data () {
    return {
      showColumnPopup: false,
      showCentrumPopup: false
    }
  },
  components: {
    Button70,
    Button60,
    Line60,
    ColumnPopup,
    CentrumPopup
  },
  methods: {
    help () {
      window.open('https://www.baidu.com/')
    },
    playGame () {
      this.$router.push('/activityGame')
      // window.location.href = '/#/activityGame'
    },
    // 还原按钮
    reduction () {
      // 通过刷新页面的方式重置数据
      this.$refs.view.$router.go(0)
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
    min-width: 768px;
    min-height: 576px;
    overflow: hidden;
    position: relative;
    font-family: 'DFYuan-Md-HK-BF';
  }
  .home-title {
    height: 70px;
    background-color: #e3f1e2;
    background-repeat: no-repeat;
    background-image: url('.\assets\title.png');
  }
  .app-box {
    height: calc(~"100% - 70px");
    min-height: 400px;
    width: 100%;
    display: flex;
  }
  .home-left-bar {
    width: 130px;
    box-shadow: 1px 7px 20px #5A9455;
    z-index: 1;
    .button {
      margin: 55px 25px;
    }
    .pintu {
      background-repeat: no-repeat;
      background-image: url('.\assets\pintu.png');
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
