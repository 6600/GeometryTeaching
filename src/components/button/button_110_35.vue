<template lang="pug">
  .button_110_35(@click="clickButton", :class="{active: !disable}") {{text}}
</template>

<script>
export default {
  name: 'App',
  props: {
    text: String,
    disable: Boolean
  },
  methods: {
    clickButton () {
      if (!this.disable) {
        this.$emit('onClick')
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .button_110_35 {
    height: 35px;
    line-height: 35px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.2rem;
    text-align: center;
    width: 115px;
    font-weight: bold;
    cursor: pointer;
    border: 4px solid #0099ff;
    box-shadow: 2px 2px 4px #d8dede;
    background: #1a47ff;
    background-color: #666666;
    color: #999999;
    border-color: #333333;
  }
  .active {
    color: white;
    background: #1a47ff;
  }
  .active:hover {
    background-color: #e14900;
    border-color: #990000;
  }
</style>
