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
</template>

<script>
import Line110 from '@/components/button/button_110_35.vue'
var arr = new Array(5)
for (var i = 0; i < 5; i++) {
  arr[i] = new Array(i)
  for (var j = 0; j < 5; j++) {
    arr[i][j] = false
  }
}
var data = { blocks: arr }
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
      var res = false
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
      for (var i1 = 0; i1 < 4; i1++) {
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
          res = true
          break
        }
      }
      alert(res)
    },
    initData (data) {
      data[0] = [0, 1, 0, 2, 1, 1, 2, 1, 3, 1]
      data[1] = [1, 0, 1, 1, 1, 2, 1, 3, 2, 0]
      data[2] = [-3, 1, -2, 1, -1, 1, 0, 1, 0, 2]
      data[3] = [-1, 3, 0, 1, 0, 2, 0, 3, 1, 3]
      // data[1] = [-3, 1, -2, 1, -2, 2, -1, 1, 0, 1]
      // data[2] = [-1, 1, 0, 1, 0, 2, 0, 3, 1, 3]
      // data[3] = [0, 1, 1, 1, 2, 1, 3, 1, 3, 2]
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
</style>
