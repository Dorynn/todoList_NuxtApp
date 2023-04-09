<template>
  <div>
    <b-nav-item-dropdown right>
      <template #button-content>
        <font-awesome-icon :icon="['fas', 'globe']" />
      </template>
      <b-dropdown-item
        v-for="item in locales"
        :key="item.code"
        @click="changeLanguage(item.code)"
        >{{ item.name }}</b-dropdown-item
      >
    </b-nav-item-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    // return locales array in file nuxt.config.js
    locales() {
      return this.$i18n.locales;
    },
  },

methods: {
      changeLanguage(value) {
        
        this.$i18n.locale = value;
      },
  },
};
</script>

<style></style>
