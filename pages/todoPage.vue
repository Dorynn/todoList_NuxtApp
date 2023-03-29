<template>
  <div class="main">
    <header-default/>
    <nuxt-child/>
  </div>
</template>

<script>
// import headerDefault from '~/components/headerDefault.vue'
export default {
  // components: { headerDefault },

}
</script>

<style >
  .main{
    box-sizing: border-box;
    position: absolute;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    background-color: #ddd;
    }
</style>