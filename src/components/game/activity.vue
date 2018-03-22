<template lang="pug">
  .game-activity
    .activity-box
      span.title 點擊適當的方格來塗色，設計正方體的折紙圖樣。
      .block-box
        .blockrow(v-for="i in 5")
          .block(v-for="j in 5", @click="blockClick(i-1, j-1)", :class="{ active: blocks[i-1][j-1] }")
        .clear
      .game-menu
        Line110(@onClick="reset",text="重設")
        Line110(@onClick="check", text="確定")
        Line110.disable(text="觀看動畫")
        Line110(text="輸出圖樣")
    .activity-popup-box(v-if="popupType !== 0")
      .popup-box
        .text-box.text-box-one-line(v-if="popupType === 1") 這折紙圖樣可折成正方體。
        .text-box.text-box-two-line(v-if="popupType === 2") 這折紙圖洋不可以折成正方體，再來壹次。
        Button105.button(text="确定", @onClick="popupType = 0")
</template>

<script>
import Line110 from '@/components/button/button_110_35.vue'
import Button105 from '@/components/button/button_105_55.vue'
var arr = new Array(5)
for (var i = 0; i < 5; i++) {
  arr[i] = new Array(i)
  for (var j = 0; j < 5; j++) {
    arr[i][j] = false
  }
}
var data = { blocks: arr, popupType: 0 }
export default {
  data: function () {
    return data
  },
  methods: {
    blockClick (i, j) {
      this.$set(this.blocks[i], [j], !this.blocks[i][j])
    },
    reset () {
      for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
          this.$set(this.blocks[i], [j], false)
        }
      }
    },
    check () {
      var firstx = 0
      var firsty = 0
      var isfind = false
      // 寻找第一个定位点
      for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
          if (this.blocks[i][j]) {
            firstx = i
            firsty = j
            isfind = true
            break
          }
        }
        if (isfind) {
          break
        }
      }
      // 初始化校验数据
      var data = new Array(64)
      this.initData(data)
      // 开始判断
      var num = 0
      for (var i2 = 0; i2 < 5; i2++) {
        for (var j2 = 0; j2 < 5; j2++) {
          if (this.blocks[i2][j2]) {
            num++
          }
        }
      }
      if (num !== 6) {
        this.popupType = 2
      } else {
        for (var i1 = 0; i1 < 64; i1++) {
          var flag = true
          for (var j1 = 0; j1 < 5; j1++) {
            if (firstx + data[i1][j1 * 2 + 1] < 0 || (firsty + data[i1][j1 * 2]) < 0) {
              flag = false
              break
            } else if (!this.blocks[firstx + data[i1][j1 * 2 + 1]][firsty + data[i1][j1 * 2]]) {
              flag = false
              break
            }
          }
          if (flag) {
            this.popupType = 1
            return
          }
        }
        this.popupType = 2
      }
    },
    initData (data) {
      // 1
      data[0] = [0, 1, 0, 2, 1, 1, 2, 1, 3, 1]
      data[1] = [1, 0, 1, 1, 1, 2, 1, 3, 2, 0]
      data[2] = [-3, 1, -2, 1, -1, 1, 0, 1, 0, 2]
      data[3] = [-1, 3, 0, 1, 0, 2, 0, 3, 1, 3]
      // 2
      data[4] = [0, 1, 1, 1, 2, 1, 3, 1, 1, 2]
      data[5] = [-1, 1, 0, 1, 0, 2, 0, 3, 1, 0]
      data[6] = [-2, 1, -1, 1, 0, 1, 1, 1, 1, 2]
      data[7] = [-1, 3, 0, 1, 0, 2, 0, 3, 1, 2]
      // 2xx
      data[8] = [-1, 1, -1, 2, 0, 1, 1, 1, 2, 1]
      data[9] = [1, 0, 1, 1, 1, 2, 1, 3, 2, 1]
      data[10] = [-3, 1, -2, 1, -1, 1, -1, 2, 0, 1]
      data[11] = [-1, 2, 0, 1, 0, 2, 0, 3, 1, 3]
      // 3
      data[12] = [0, 1, 1, 1, 2, 1, 3, 1, 2, 2]
      data[13] = [-1, 2, 0, 1, 0, 2, 0, 3, 1, 0]
      data[14] = [-1, 1, 0, 1, 1, 1, 2, 1, 2, 2]
      data[15] = [-1, 3, 0, 1, 0, 2, 0, 3, 1, 1]
      // 3xx
      data[16] = [-2, 1, -2, 2, -1, 1, 0, 1, 1, 1]
      data[17] = [1, 0, 1, 1, 1, 2, 1, 3, 2, 2]
      data[18] = [-3, 1, -2, 1, -2, 2, -1, 1, 0, 1]
      data[19] = [-1, 1, 0, 1, 0, 2, 0, 3, 1, 3]
      // 4
      data[20] = [0, 1, 1, 1, 2, 1, 3, 1, 3, 2]
      data[21] = [-1, 3, 0, 1, 0, 2, 0, 3, 1, 0]
      // 4xx
      data[22] = [-3, 1, -3, 2, -2, 1, -1, 1, 0, 1]
      data[23] = [1, 0, 1, 1, 1, 2, 1, 3, 2, 3]
      // 5
      data[24] = [-1, 1, 0, 1, 0, 2, 1, 1, 2, 1]
      data[25] = [-1, 1, 0, 1, 0, 2, 0, 3, 1, 1]
      data[26] = [-2, 1, -1, 1, 0, 1, 0, 2, 1, 1]
      data[27] = [-1, 2, 0, 1, 0, 2, 0, 3, 1, 2]
      // 6
      data[28] = [-1, 1, 0, 1, 1, 1, 1, 2, 2, 1]
      data[29] = [-1, 2, 0, 1, 0, 2, 0, 3, 1, 1]
      // 6xx
      data[30] = [-2, 1, -1, 1, -2, 2, 0, 1, 1, 1]
      data[31] = [-1, 1, 0, 1, 0, 2, 0, 3, 1, 2]
      // 7
      data[32] = [-2, 1, -2, 2, -1, 1, 0, 1, 1, 0]
      data[33] = [1, 0, 1, 1, 1, 2, 2, 2, 2, 3]
      data[34] = [-3, -2, -2, 1, -2, 2, -1, 1, 0, 1]
      data[35] = [0, 1, 1, 1, 1, 2, 1, 3, 2, 3]
      // 7xx
      data[36] = [0, 1, 1, 1, 2, 1, 2, 2, 3, 2]
      data[37] = [-1, 2, -1, 3, 0, 1, 0, 2, 1, 0]
      data[38] = [1, 0, 1, 1, 2, 1, 3, 1, 3, 2]
      data[39] = [-2, 3, -1, 1, -1, 2, -1, 3, 0, 1]
      // 8
      data[40] = [-2, 1, -1, 1, -1, 2, 0, 1, 1, 0]
      data[41] = [-1, 1, 0, 1, 0, 2, 1, 2, 1, 3]
      data[42] = [-2, 2, -1, 1, -1, 2, 0, 1, 1, 1]
      data[43] = [0, 1, 1, 1, 1, 2, 1, 3, 2, 2]
      // 8xx
      data[44] = [-1, 1, 0, 1, 1, 1, 1, 2, 2, 2]
      data[45] = [-1, 2, -1, 3, 0, 1, 0, 2, 1, 1]
      data[46] = [1, 0, 1, 1, 2, 1, 2, 2, 3, 1]
      data[47] = [-2, 2, -1, 1, -1, 2, -1, 3, 0, 1]
      // 9
      data[48] = [-2, 1, -1, 1, 0, 1, 0, 2, 1, 0]
      data[49] = [-1, -2, 0, 1, 0, 2, 1, 2, 1, 3]
      data[50] = [-1, 2, 0, 1, 0, 2, 1, 1, 2, 1]
      data[51] = [0, 1, 1, 1, 1, 2, 1, 3, 2, 1]
      // 9xx
      data[52] = [-2, 1, -1, 1, 0, 1, 0, 2, 1, 2]
      data[53] = [-1, 2, -1, 3, 0, 1, 0, 2, 1, 2]
      data[54] = [1, 0, 1, 1, 2, 1, 1, 2, 3, 1]
      data[55] = [-2, 1, -1, 1, -1, 2, -1, 3, 0, 1]
      // 10
      data[56] = [-2, 1, -1, 1, 0, 1, 1, 0, 2, 0]
      data[57] = [0, 1, 0, 2, 1, 2, 1, 3, 1, 4]
      // 10xx
      data[58] = [1, 0, 2, 0, 2, 1, 3, 1, 4, 1]
      data[59] = [-1, 2, -1, 3, -1, 4, 0, 1, 0, 2]
      // 11
      data[60] = [1, 0, 1, 1, 2, 1, 2, 2, 3, 2]
      data[61] = [-2, 2, -2, 3, -1, 1, -1, 2, 0, 1]
      // 11re
      data[62] = [-2, 2, -1, 1, -1, 2, 0, 1, 1, 0]
      data[63] = [0, 1, 1, 1, 1, 2, 2, 2, 2, 3]
    }
  },
  components: {
    Line110,
    Button105
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
    .active {
      background-color: #ff0000;
    }
  }
  .block {
    background-color: white;
    height: 72px;
    width: 72px;
    float: left;
    cursor: pointer;
    border-right: 2px solid #b0afaf;
    border-bottom: 2px solid #b0afaf;
  }
  .activity-popup-box {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 14;
    background-color: rgba(0, 0, 0, 0.6);
    .popup-box {
      height: 240px;
      width: 520px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border-radius: 15px;
      background-color: white;
      box-shadow: 0px -2px 13px #8ba3b2 inset;
      .text-box-one-line {
        line-height: 110px;
        text-align: center;
      }
      .text-box-two-line {
        line-height: 55px;
        text-align: left;
        padding: 10px;
        width: calc(100% - 20px);
      }
      .button {
        margin-left: auto;
        margin-right: auto;
      }
    }
    .text-box {
      font-size: 2rem;
      font-weight: bold;
      height: 110px;
      width: 100%;
      background-color: #e9f6fd;
      margin: 20px 0;
      box-shadow: 0px -2px 13px #8ba3b2 inset;
    }
  }
</style>
