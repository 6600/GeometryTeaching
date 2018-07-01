<template lang="pug">
  .button_150_50(@click="$emit('onClick')") {{text}}
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
  .button_150_50 {
    background-size: 195px;
    line-height: 65px;
    border-radius: 30px;
    color: white;
    font-size: 1.3rem;
    text-align: center;
    width: 188px;
    height: 65px;
    background-repeat: no-repeat;
    font-weight: bold;
    cursor: pointer;
    background-position: -2px -2px;
    background-image: url('..\..\assets\button\scbt1x.png')
  }
  .button_150_50:hover {
    font-size: 1.4rem;
    background-position: -2px -73px;
  }
</style>
