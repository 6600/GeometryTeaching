<template lang="pug">
  .origami-box
    router-view.origami-show
    .origami-menu
      Button150.button(text="輸出圖形")
      Button150.button(text="輸出折紙圖樣")
</template>

<script>
import Button150 from '@/components/button/button_150_50.vue'
export default {
  components: {
    Button150
  }
}
</script>

<style lang='less' scoped>
  .origami-box {
    width: 100%;
    height: 100%;
    background-color: #e3f1e2;
    .origami-menu {
      position: fixed;
      right: 0;
      bottom: 20px;
      display: flex;
    }
    .button {
      margin: 0 10px;
    }
    .origami-show {
      height: 550px;
      width: 780px;
      border-radius: 15px;
      overflow: hidden;
      margin: 20px;
    }
  }
</style>
