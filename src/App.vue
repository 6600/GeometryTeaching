<template lang="pug">
  #app
    .home-title
    .app-box
      .home-left-bar
        Button70.button(@onClick="showPopup = true", text="柱體")
        Button70.button(@onClick="clickTest", text="椎體")
        Line60
        Button70.button.pintu(@onClick="playGame", text="")
        Line60
        Button60.reduction
        Button60.explain(@onClick="help")
      router-view
    .popup-box(v-if="showPopup")
      .popup
        p.popup-title 請選擇折紙圖樣：
        .popup-panel
          .slect.cube-one(@click="popupCheck = 'cubeOne'", :class="{active: popupCheck === 'cubeOne'}")
          .slect.cube-two(@click="popupCheck = 'cubeTwo'", :class="{active: popupCheck === 'cubeTwo'}")
          .slect.mitsubishi-column-one(@click="popupCheck = 'mitsubishiColumnOne'", :class="{active: popupCheck === 'mitsubishiColumnOne'}")
          .slect.mitsubishi-column-two(@click="popupCheck = 'mitsubishiColumnTwo'", :class="{active: popupCheck === 'mitsubishiColumnTwo'}")
          .slect.cuboid-one(@click="popupCheck = 'cuboidOne'", :class="{active: popupCheck === 'cuboidOne'}")
          .slect.cuboid-two(@click="popupCheck = 'cuboidTwo'", :class="{active: popupCheck === 'cuboidTwo'}")
          .slect.cuboid-three(@click="popupCheck = 'cuboidThree'", :class="{active: popupCheck === 'cuboidThree'}")
          .slect.cuboid-four(@click="popupCheck = 'cuboidFour'", :class="{active: popupCheck === 'cuboidFour'}")
          .slect.pentagonal-orism-one(@click="popupCheck = 'pentagonalPrismOne'", :class="{active: popupCheck === 'pentagonalPrismOne'}")
          .slect.pentagonal-orism-two(@click="popupCheck = 'pentagonalPrismTwo'", :class="{active: popupCheck === 'pentagonalPrismTwo'}")
          .slect.hexagonal-orism-one(@click="popupCheck = 'hexagonalPrismOne'", :class="{active: popupCheck === 'hexagonalPrismOne'}")
          .slect.hexagonal-orism-two(@click="popupCheck = 'hexagonalPrismTwo'", :class="{active: popupCheck === 'hexagonalPrismTwo'}")
        .popup-panel-menu
          Button105.confirm-button(@onClick="confirm()", text="确定")
          Button105.cancel-button(@onClick="showPopup = false", text="取消")
    .logo
</template>

<script>
import Button60 from '@/components/button/button_60_60.vue'
import Button105 from '@/components/button/button_105_55.vue'
import Button70 from '@/components/button/button_70_50.vue'
import Line60 from '@/components/line/line_60.vue'
export default {
  name: 'App',
  data () {
    return {
      showPopup: false,
      popupCheck: null
    }
  },
  components: {
    Button105,
    Button70,
    Button60,
    Line60
  },
  methods: {
    help () {
      window.open('https://www.baidu.com/')
    },
    clickTest () {
      window.location.href = '/#/origami/cubeTwo'
    },
    playGame () {
      window.location.href = '/#/activityGame'
    },
    confirm () {
      window.location.href = '/#/origami/' + this.popupCheck
      this.showPopup = false
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
    overflow: hidden;
    position: relative;
  }
  .home-title {
    height: 70px;
    background-color: white;
    background-image: url('.\assets\title.png')
  }
  .app-box {
    height: calc(~"100% - 70px");
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
      background-image: url('.\assets\pintu.png')
    }
    .reduction {
      margin: 25px;
      background-image: url('.\assets\reduction.png')
    }
    .explain {
      margin: 25px;
      background-image: url('.\assets\explain.png')
    }
  }
  .popup-box {
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
    width: 833px;
    height: 600px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: white;
    border-radius: 15px;
  }
  .popup-title {
    height: 70px;
    line-height: 70px;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    margin-left: 30px;
  }
  .popup-panel {
    width: 833px;
    height: 415px;
    position: relative;
    background-image: url('./assets/cylinder-panel.png');
    overflow: hidden;
    .slect {
      position: absolute;
      width: 105px;
      height: 90px;
      cursor: pointer;
    }
    .active {
      border: 2px solid yellow;
    }
    .cube-one {
      right: 168px;
      top: 13px;
    }
    .cube-two {
      right: 58px;
      top: 13px;
    }
    .mitsubishi-column-one {
      left: 164px;
      top: 14px;
    }
    .mitsubishi-column-two {
      left: 276px;
      top: 14px;
    }
    .cuboid-one {
      left: 167px;
      top: 109px;
    }
    .cuboid-two {
      left: 277px;
      top: 109px;
    }
    .cuboid-three {
      right: 168px;
      top: 109px;
    }
    .cuboid-four {
      right: 57px;
      top: 109px;
    }
    .pentagonal-orism-one {
      left: 166px;
      bottom: 111px;
    }
    .pentagonal-orism-two {
      left: 277px;
      bottom: 111px;
    }
    .hexagonal-orism-one {
      right: 168px;
      bottom: 109px;
    }
    .hexagonal-orism-two {
      right: 57px;
      bottom: 109px;
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
  .popup-panel-menu {
    display: flex;
    width: 420px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    height: 65px;
    padding: 25px 0;
  }
  .clear {
    clear: both;
  }
</style>
