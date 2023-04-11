<template>
  <div>
    <nuxt-child :users="users" :userID="userID" />
    <div class="otherUser">
      <h4>Other user</h4>
      <div class="listUser">
        <img
        :src="images[Math.floor(Math.random() * 9) + userID].url"
          alt=""
          class="user id1"
          @click="showProfile"
        />
        <img
        :src="images[Math.floor(Math.random() * 9) + userID].url"
          alt=""
          class="user id2"
          @click="showProfile"
        />
      </div>
      <p>{{ images[userID].url }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  head() {
    return {
      titleTemplate: "User Profile - %s",
    };
  },
  async asyncData(context) {
    let users = await context.$axios.$get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return {
      users,
    };
  },
  data() {
    return {
      userID: 0,
    };
  },
  async fetch ({store}){
    await store.dispatch('getImages');
    // await store.dispatch('getUsersInfo');
  },
  methods: {
    showProfile() {
      console.log('image...',this.images)
      this.userID = Math.floor(Math.random() * 9);
      this.$router.push(`/todoPage/userProfile/user${this.userID}`);
      console.log("active");
    },

  },
  computed: {
    ...mapGetters(['images']),
  },
};
</script>

<style lang="scss">
.otherUser {
  position: relative;
  top: 170px;
  left: 260px;
  .user {
    width: 45px;
    height: 45px;
    border-radius: 100px;
    cursor: pointer;
  }
}
</style>
