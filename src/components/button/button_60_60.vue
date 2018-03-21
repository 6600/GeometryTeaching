<template lang="pug">
  .button-60-60(@click.stop="$emit('onClick')")
</template>

<style lang='less'>
  .button-60-60 {
    height: 60px;
    width: 60px;
    cursor: pointer;
    background-repeat: no-repeat;
  }
  .button-60-60:hover {
    transform: scale(1.1);
  }
</style>
