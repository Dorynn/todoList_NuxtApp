<template>
  <b-nav-item-dropdown class="changeLanguageBtn" left>
    <template #button-content>
      <font-awesome-icon :icon="['fas', 'globe']" class="iconLang"/>
    </template>
    <b-dropdown-item
      v-for="item in locales"
      :key="item.code"
      @click="changeLanguage(item.code)"
    >
      {{ item.name }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  computed: {
    locales() {
      return this.$i18n.locales;
    },
  },
  methods: {
    changeLanguage(lang) {
      console.log("valuaa: ", lang);
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss" scoped>
.changeLanguageBtn{
    position: relative;
}
</style>
