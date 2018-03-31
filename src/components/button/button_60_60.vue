<template lang="pug">
  .button-60-60(@click.stop="$emit('onClick')")
</template>

<style lang='less'>
  .button-60-60 {
    height: 60px;
    width: 125px;
    position: absolute;
    cursor: pointer;
    background-repeat: no-repeat;
  }
  .button-60-60:hover {
    background-position: -4px -72px;
  }
</style>
