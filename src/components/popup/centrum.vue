<template lang="pug">
  .column-popup-box
    .popup
      .popup-panel
        //- 三角锥
        .slect.cones-one(@click="popupCheck = 'pyramidThreeOne'", :class="{active: popupCheck === 'pyramidThreeOne'}")
        .slect.cones-two(@click="popupCheck = 'pyramidThreeTwo'", :class="{active: popupCheck === 'pyramidThreeTwo'}")
        .slect.four-one(@click="popupCheck = 'pyramidFourOne'", :class="{active: popupCheck === 'pyramidFourOne'}")
        .slect.four-two(@click="popupCheck = 'pyramidFourTwo'", :class="{active: popupCheck === 'pyramidFourTwo'}")
        .slect.five-one(@click="popupCheck = 'pyramidFiveOne'", :class="{active: popupCheck === 'pyramidFiveOne'}")
        .slect.five-two(@click="popupCheck = 'pyramidFiveTwo'", :class="{active: popupCheck === 'pyramidFiveTwo'}")
        .slect.six-one(@click="popupCheck = 'pyramidSixOne'", :class="{active: popupCheck === 'pyramidSixOne'}")
        .slect.six-two(@click="popupCheck = 'pyramidSixTwo'", :class="{active: popupCheck === 'pyramidSixTwo'}")
        .slect.pyramid-conus(@click="popupCheck = 'pyramidConus'", :class="{active: popupCheck === 'pyramidConus'}")
        .slect.pentagonal-orism-two(@click="popupCheck = 'pentagonalPrismTwo'", :class="{active: popupCheck === 'pentagonalPrismTwo'}")
      .popup-panel-menu
        Button105.confirm-button(@onClick="confirm()", text="确定")
        Button105.cancel-button(@onClick="$emit('close')", text="取消")
</template>

<script>
import { Order } from '@/components/Order.js'
import Button105 from '@/components/button/button_105_55.vue'
export default {
  name: 'Column',
  data () {
    return {
      popupCheck: null
    }
  },
  components: {
    Button105
  },
  created () {
    const temp = this.$route.fullPath.split('/')
    if (temp[2]) {
      this.popupCheck = temp[2]
    }
  },
  methods: {
    confirm () {
      if (this.$router.currentRoute.name === 'activityGame') {
        this.$router.push('origami/' + this.popupCheck)
      } else {
        this.$router.push(this.popupCheck)
      }
      this.$emit('close')
      Order.$emit('changeGraph')
    }
  }
}
</script>

<style lang='less' scoped>
  .column-popup-box {
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
  .popup-panel {
    width: 100%;
    height: 491px;
    position: relative;
    background-image: url('../../assets/popup/xuanzebg02@1x.png');
    overflow: hidden;
    .slect {
      position: absolute;
      width: 105px;
      height: 78px;
      cursor: pointer;
    }
    .active {
      border: 2px solid yellow;
    }
    .cube-one {
      right: 168px;
      top: 81px;
    }
    .cube-two {
      right: 58px;
      top: 81px;
    }
    .four-one {
      right: 160px;
      top: 102px;
    }
    .four-two {
      right: 55px;
      top: 102px;
    }
    .five-one {
      left: 167px;
      top: 235px;
    }
    .cones-one {
      left: 170px;
      top: 102px;
    }
    .cones-two {
      left: 276px;
      top: 102px;
    }
    .cuboid-one {
      left: 167px;
      top: 231px;
    }
    .five-two {
      left: 277px;
      top: 231px;
    }
    .six-one {
      right: 168px;
      top: 231px;
    }
    .six-two {
      right: 57px;
      top: 231px;
    }
    .pyramid-conus {
      left: 166px;
      bottom: 48px;
    }
    .pentagonal-orism-two {
      left: 277px;
      bottom: 48px;
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
  .popup-panel-menu {
    display: flex;
    width: 420px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    height: 65px;
    padding: 25px 0;
  }
</style>
