<template>
  <div id="root">
    <b-jumbotron
      header="TODO LIST APP"
      lead="Welcome everyone come here to using our app"
      class="jumbotron"
    >
      <p>For more information visit website</p>
      <nuxt-link to="/todoPage/taskList">
        <b-button variant="primary">Click here</b-button>
      </nuxt-link>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style lang="scss" scroped>


#root {
  height: 100vh;
  width: 100vw;
  position: relative;
  background-image: linear-gradient(rgba(255, 255, 255, 0.281), rgba(255, 255, 255, 0.021)), url('../assets/image/coffee.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  .jumbotron {
    position: absolute;
    width: 1200px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    
  }
}
</style>
