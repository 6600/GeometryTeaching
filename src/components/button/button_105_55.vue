<template lang="pug">
  .button_50_50(@click="$emit('onClick')") {{text}}
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
  .button_50_50 {
    height: 55px;
    line-height: 55px;
    border-radius: 25px;
    text-align: center;
    color: white;
    font-size: 1.4rem;
    text-align: center;
    width: 105px;
    cursor: pointer;
    border: 4px solid white;
    box-shadow: 2px 2px 4px #d8dede;
    background: linear-gradient(#f9d076, #915610);
  }
  .button_50_50:hover {
    transform: scale(1.1);
  }
</style>
