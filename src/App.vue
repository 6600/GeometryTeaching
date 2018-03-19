<template lang="pug">
  #app
    .home-title
    .app-box
      .home-left-bar
        Button70(@onClick="showPopup = true", text="柱體")
      router-view
    .popup-box(v-if="showPopup")
      .popup
        p.popup-title 請選擇折紙圖樣：
        .popup-panel
        centre.popup-panel-menu
          Button105.cancel-button(@onClick="showPopup = false", text="确定")
          Button105.cancel-button(@onClick="showPopup = false", text="取消")
    .logo
</template>

<script>
import Button105 from '@/components/button/button_105_55.vue'
import Button70 from '@/components/button/button_70_50.vue'
export default {
  name: 'App',
  data () {
    return {
      showPopup: false
    }
  },
  components: {
    Button105,
    Button70
  }
}
</script>

<style>
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
  }
  .app-box {
    height: calc(100% - 70px);
    width: 100%;
    display: flex;
  }
  .home-left-bar {
    width: 130px;
    box-shadow: 1px 7px 20px #5A9455;
    z-index: 1;
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
    background-image: url('./assets/cylinder-panel.png');
    overflow: hidden;
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
