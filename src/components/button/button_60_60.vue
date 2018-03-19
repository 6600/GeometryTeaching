<template lang="pug">
  .button-60-60(@click.stop="$emit('onClick')") {{text}}
</template>

<style lang='less'>
  .button-60-60 {
    height: 60px;
    width: 60px;
    background-repeat: no-repeat;
  }
  .button-60-60:hover {
    transform: scale(1.1);
  }
</style>
