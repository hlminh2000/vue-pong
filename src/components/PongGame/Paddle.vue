<template lang="html">
  <div class="paddle top"
    v-bind:style="[{
      left: x + '%',
      top: y + '%',
      width: width,
      height: height
    }]"
  ></div>
</template>

<script>
export default {
  name: 'Paddle',
  props: ['width', 'height', 'x', 'y']
}
</script>

<style lang="css" scoped>
  .paddle {
    background: white;
    border-radius: 100px;
    position: absolute;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
</style>
