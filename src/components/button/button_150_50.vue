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
    height: 50px;
    line-height: 50px;
    border-radius: 30px;
    text-align: center;
    color: white;
    font-size: 1.2rem;
    text-align: center;
    width: 150px;
    font-weight: bold;
    cursor: pointer;
    border: 3px solid #f8f5ef;
    box-shadow: 2px 2px 4px #d8dede;
    background: linear-gradient(#f6d15e, #b45700);
  }
  .button_150_50:hover {
    transform: scale(1.1);
  }
</style>
