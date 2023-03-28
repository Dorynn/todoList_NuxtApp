<template>
  <div>
    <header-default/>
    <nuxt-child/>
  </div>
</template>

<script>
import headerDefault from '~/components/headerDefault.vue'
export default {
  components: { headerDefault },

}
</script>

<style>

</style>