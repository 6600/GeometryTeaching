<template lang="pug">
  .column-popup-box
    .popup
      .popup-panel
        .slect.cube-one(@click="popupCheck = 'cubeOne'", :class="{LineOne: popupCheck === 'cubeOne'}")
        .slect.cube-two(@click="popupCheck = 'cubeTwo'", :class="{LineOne: popupCheck === 'cubeTwo'}")
        .slect.mitsubishi-column-one(@click="popupCheck = 'mitsubishiColumnOne'", :class="{LineOne: popupCheck === 'mitsubishiColumnOne'}")
        .slect.mitsubishi-column-two(@click="popupCheck = 'mitsubishiColumnTwo'", :class="{LineOne: popupCheck === 'mitsubishiColumnTwo'}")
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
    .LineOne{
      border: 2px solid yellow;
      margin-top: 24px;
    }
    .cube-one {
      right: 168px;
      top: 81px;
    }
    .cube-two {
      right: 58px;
      top: 81px;
    }
    .mitsubishi-column-one {
      left: 164px;
      top: 81px;
    }
    .mitsubishi-column-two {
      left: 276px;
      top: 81px;
    }
    .cuboid-one {
      left: 167px;
      top: 231px;
    }
    .cuboid-two {
      left: 277px;
      top: 231px;
    }
    .cuboid-three {
      right: 168px;
      top: 231px;
    }
    .cuboid-four {
      right: 57px;
      top: 231px;
    }
    .pentagonal-orism-one {
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
