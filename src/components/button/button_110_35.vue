<template lang="pug">
  .button_110_35(@click="$emit('onClick')") {{text}}
</template>

<script>
export default {
  name: 'App',
  props: {
    text: String
  }
}
</script>

<style lang='less' scoped>
  .button_110_35 {
    height: 35px;
    line-height: 35px;
    border-radius: 10px;
    text-align: center;
    color: white;
    font-size: 1.2rem;
    text-align: center;
    width: 115px;
    font-weight: bold;
    cursor: pointer;
    border: 4px solid #0099ff;
    box-shadow: 2px 2px 4px #d8dede;
    background: #1a47ff;
  }
  .button_110_35:hover {
    background-color: #e14900;
    border-color: #990000;
  }
</style>
