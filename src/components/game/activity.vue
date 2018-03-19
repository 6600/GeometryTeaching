<template lang="pug">
  .game-activity
    .activity-box
      span.title 點擊適當的方格來塗色，設計正方體的折紙圖樣。
      .block-box
        .block(v-for="ind in 25", @click="")
        .clear
      .game-menu
        Line110(text="重設")
        Line110(text="確定")
        Line110.disable(text="觀看動畫")
        Line110(text="輸出圖樣")
</template>

<script>
import Line110 from '@/components/button/button_110_35.vue'
export default {
  data () {
    return {
      blocks: []
    }
  },
  methods: {
    blockClick () {

    }
  },
  components: {
    Line110
  }
}
</script>

<style lang='less' scoped>
  .game-activity {
    width: calc(~"100% - 130px");
    height: 100%;
    overflow: hidden;
    background-color: #e3f1e2;
  }
  .activity-box {
    background-color: #d0e8a1;
    width: calc(100% - 20px);
    height: calc(~'100% - 68px');
    box-shadow: 0px -2px 13px #8ba3b2 inset;
    border-radius: 15px;
    margin-left: 5px;
    .game-menu {
      position: absolute;
      right: 100px;
      bottom: 200px;
      .button_110_35 {
        margin: 10px 0;
      }
    }
    .disable {
      background-color: #666666;
      color: #999999;
      border-color: #333333;
    }
  }
  .title {
    height: 150px;
    line-height: 150px;
    font-weight: bold;
    font-size: 1.5rem;
    margin-left: 70px;
  }
  .block-box {
    height: 370px;
    width: 370px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-top: 2px solid #b0afaf;
    border-left: 2px solid #b0afaf;
    .block {
      background-color: white;
      height: 72px;
      width: 72px;
      float: left;
      border-right: 2px solid #b0afaf;
      border-bottom: 2px solid #b0afaf;
    }
  }
</style>
