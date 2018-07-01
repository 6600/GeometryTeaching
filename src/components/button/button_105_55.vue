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
    height: 70px;
    line-height: 70px;
    color: white;
    font-size: 1.3rem;
    text-align: center;
    width: 130px;
    font-weight: 600;
    cursor: pointer;
    background-position: -10px -10px;
    background-image: url('..\..\assets\button\qdbt1x.png')
  }
  .button_50_50:hover {
    font-size: 1.4rem;
    background-position: -10px -81px;
  }
</style>
