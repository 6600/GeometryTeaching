<template lang="pug">
  .button_70_50(@click="$emit('onClick')") {{text}}
</template>

<script>
export default {
  name: 'App',
  props: {
    text: String
  }
}
</script>

<style>
  .button_70_50 {
    height: 50px;
    line-height: 50px;
    border-radius: 8px;
    text-align: center;
    color: #0075c1;
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    width: 70px;
    border: 4px solid #dbe0d6;
    background-color: #d4eef8;
    box-shadow: 0px -2px 13px #8ba3b2 inset;
  }
  .button_50_50:hover {
    transform: scale(1.1);
  }
</style>
