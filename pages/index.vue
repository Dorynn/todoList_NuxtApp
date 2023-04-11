<template>
  <div id="root">
    <b-jumbotron
    :header="$t('title.homePage.header')"
    :lead="$t('title.homePage.lead')"
    class="jumbotron"
    >
    <p>{{ $t('title.homePage.navigation') }}</p>
    <nuxt-link :to="localePath('/todoPage/taskList')">
      <b-button variant="primary">{{ $t('title.homePage.button') }}</b-button>
    </nuxt-link>
    <switch-language/>
    </b-jumbotron>
  </div>
</template>

<script>
import switchLanguage from '~/components/switchLanguage.vue';
export default {
  components: { switchLanguage },
  name: "IndexPage",
};
</script>

<style lang="scss" scroped>
#root {
  list-style-type: none;
  height: 100vh;
  width: 100vw;
  position: relative;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.281),
      rgba(255, 255, 255, 0.021)
    ),
    url("../assets/image/coffee.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .jumbotron {
    position: absolute;
    width: 1200px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
}
</style>
